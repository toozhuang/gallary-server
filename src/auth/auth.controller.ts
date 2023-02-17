import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from '../dto/auth/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 一个 register的接口， 首先用来创建用户
   * 使用的是 post 方法， 且传入的用户注册信息
   * todo: 按照学习项目的逻辑， 这个返回的也要序列化一下，
   * 这个时候就要学习一下什么是序列化， 和序列化的作用了
   */
  @Post('/register')
  register(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto,
  ): Promise<any> {
    return this.authService.create(registerUserDto);
  }
}
