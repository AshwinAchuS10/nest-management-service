import * as bcrypt from 'bcrypt';
import { IsString } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const SALT_ROUNDS = 10;

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsString()
  firstName: string

  @Column()
  @IsString()
  lastName: string

  @Column()
  @IsString()
  password: string

  @Column()
  isActive: number

  @BeforeInsert()
  async userBeforeInsert() {
    this.password = await getEncryptedPassword(this.password);
  }
}

const getEncryptedPassword = (
  password: string,
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};