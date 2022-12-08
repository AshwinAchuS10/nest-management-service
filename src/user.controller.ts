import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

import { IUserCreateResponse } from './interfaces/user-create-response.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy,
  ) { }

  @MessagePattern('user_create')
  public async createUser(userParams: IUser): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse;
    try {
      userParams.is_confirmed = false;
      const createdUser = await this.userService.createUser(userParams);
      console.log('createdUser: ', createdUser);
      this.mailerServiceClient
        .send('mail_send', {
          to: createdUser.email,
          subject: 'Email confirmation',
          html: `<center>
              <b>Hi there, please confirm your email to use Smoothday.</b><br>
              </center>`,
        })
        .toPromise();
      return {
        status: HttpStatus.CREATED,
        message: 'user_created',
        user: createdUser,
        errors: null
      };
    } catch (e) {
      console.log('e: ', e);
      result = {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'user_create_precondition_failed',
        user: null,
        errors: e.errors,
      };
    }
    return result;
  }
}
