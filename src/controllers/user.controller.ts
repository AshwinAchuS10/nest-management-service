import { HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

import { HealthIndicatorResult, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { firstValueFrom } from 'rxjs';
import { USER_CREATE_FAILED, USER_CREATE_SUCCESS } from '../constants/user.messages';
import { IUserCreateResponse } from '../interfaces/user-create-response.interface';
import { UserService } from '../services/user.service';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private db: TypeOrmHealthIndicator,
    @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy,
  ) { }

  @MessagePattern('ping_user_service')
  public async ping(): Promise<any> {
    let DATABASE_NAME = 'hq';
    let databasePingResponse: Promise<HealthIndicatorResult> = await this.db.pingCheck(DATABASE_NAME).catch(error => error);
    return {
      database: {
        status: `${DATABASE_NAME}-${databasePingResponse[DATABASE_NAME]?.status == 'up' ? 'IS_ALIVE' : 'IS_DOWN'}`
      },
      service: {
        status: `USER_SERVICE-IS_ALIVE`
      }
    };
  }

  @MessagePattern('user_create')
  public async createUser(userRequest: any): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse;
    try {
      const user = await this.userService.createUser(userRequest);
      result = {
        status: HttpStatus.CREATED,
        message: USER_CREATE_SUCCESS,
        user: user,
        errors: null,
      };
      await firstValueFrom(this.mailerServiceClient
        .send('mail_send', {
          to: userRequest.firstName,
          subject: 'Email confirmation',
          html: `<center>
              <b>Hi there, please confirm your email to use Smoothday.</b><br>
              </center>`,
        }));
    } catch (e) {

      result = {
        status: HttpStatus.PRECONDITION_FAILED,
        message: USER_CREATE_FAILED,
        user: null,
        errors: [e.message],
      };
    }
    return result;

  }
}


