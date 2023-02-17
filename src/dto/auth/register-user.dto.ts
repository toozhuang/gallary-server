import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

/**
 * date: 2023-02-17, Fri, 15:15
 * author: Wang
 * feature： 用户注册的时候的一个dto， 用来约束前端发过来的用户的信息是否能够符合我们的要求 BDD
 */
export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,
    {
      message:
        'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
