import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';
import { USER_CREATE_FAILED, USER_CREATE_SUCCESS } from '../constants/user.messages';
import { User } from '../entities/user.entity';
import { IUserCreateResponse } from '../interfaces/user-create-response.interface';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy,
  ) { }

  @MessagePattern('user_create')
  public async createUser(userRequest: User): Promise<IUserCreateResponse> {
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
      console.log('e: ', e);
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
