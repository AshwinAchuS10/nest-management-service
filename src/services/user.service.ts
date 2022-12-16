import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<any>,
  ) { }

  public async createUser(user: any): Promise<any> {
    try {
      const userModel = new this.userModel(user);
      return await userModel.save();
    } catch (error: any) {
      throw error;
    }
  }
}
