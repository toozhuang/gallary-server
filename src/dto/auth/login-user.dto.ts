/**
 * date: 2023-02-20, Mon, 17:16
 * author: Wang
 * feature： 用户登录的时候的一个dto， 用来约束前端发过来的用户的信息是否能够符合我们的要求 BDD
 */
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  remember: boolean;
}
