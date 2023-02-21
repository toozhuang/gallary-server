import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UAParser } from 'ua-parser-js';

// import internal from project
import { RegisterUserDto } from '../dto/auth/register-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../dto/auth/login-user.dto';

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
  async register(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto,
  ): Promise<any> {
    return this.authService.create(registerUserDto);
  }

  /**
   * 这么来看， 这部分我们会试用一下 refresh token 是如何实现的
   * 知识盲区啊， 之前没没弄过这个东西
   * 思路就是通过传入的登录信息 body 加上用户浏览器的信息
   * 一起生成一份token
   * 这个token 存放到 cookie 中去
   * 而后前端所有的访问都会自动tg的带上这个token
   * 这样就能进行校验了
   * @param req
   * @param response
   * @param userLoginDto
   */
  @Post('/login')
  async login(
    @Req()
    req: Request,
    @Res()
    response: Response,
    @Body(ValidationPipe) userLoginDto: LoginUserDto,
  ) {
    const ua = UAParser(req.headers['user-agent']);
    const refreshTokenPayload: Partial<any> = {
      ip: req.ip,
      userAgent: JSON.stringify(ua),
      browser: ua.browser.name,
      os: ua.os.name,
    };
    const cookiePayload = await this.authService.login(
      userLoginDto,
      refreshTokenPayload,
    );
    response.setHeader('Set-Cookie', cookiePayload);
    return response.status(HttpStatus.NO_CONTENT).json({});
  }
}
