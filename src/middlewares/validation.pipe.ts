import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException({ message: 'Input data validation failed', errors: this.buildError(errors) }, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private buildError(errors: any) {
    const result: any = [];
    errors.forEach((el: any) => {
      let prop: any = el.property;
      let error: any = [];
      Object.entries(el.constraints).forEach((constraint: any) => {
        error.push(`${constraint[1]}`);
      });
      result.push({
        [prop]: error,
      });
    });
    return result;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
