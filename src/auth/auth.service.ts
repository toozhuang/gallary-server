import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, ObjectLiteral, Repository } from 'typeorm';
import { UserEntity, UserStatusEnum } from './entities/user.entity';

import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  //  todo: 暂时只是用 user entity，
  // 后续学习的时候， 慢慢添加需要的entity
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(registerUserDto: DeepPartial<UserEntity>): Promise<any> {
    const token = await this.generateToken(12);

    // 我们默认创建的user都是普通用户
    registerUserDto.roleId = 2;
    const currentDateTIme = new Date();
    // currentDateTIme.setHours(currentDateTIme.getHours() + 2); // 该用户两小时内有效（ validate
    // registerUserDto.tokenValidityDate = currentDateTIme;
    // todo: 暂时还不启用 email 激活的功能， 手动赋予该用户两年内有效（ validate
    currentDateTIme.setFullYear(currentDateTIme.getFullYear() + 2);
    registerUserDto.tokenValidityDate = currentDateTIme;

    // const registerProcess = !registerUserDto.status;
    //
    // if (!registerUserDto.status) {
    //   registerUserDto.status = UserStatusEnum.INACTIVE;
    // }
    registerUserDto.status = UserStatusEnum.ACTIVE;
    registerUserDto.salt = await bcrypt.genSalt();
    registerUserDto.token = token;
    const user = this.userRepository.create(registerUserDto);
    const result = await user.save();
    console.log(result);
    return user;
  }

  /**
   * 用户登录， 传入 login 信息 和 前端的 req 等信息（浏览器之类的）
   * 加一起创建一个cookie
   * @param loginUserDto
   * @param refreshTokenPayload
   */
  async login(
    loginUserDto: DeepPartial<UserEntity>,
    refreshTokenPayload: any,
  ): Promise<any> {
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: [
        {
          username: username,
        },
        {
          email: username,
        },
      ],
    });
    if (user && (await user.validatePassword(password))) {
      if (user.status !== UserStatusEnum.ACTIVE) {
        return [null, 'UserInactive', 400];
      }
      return [user, null, null];
    }
    return [null, 'InvalidCredentials', 400];
  }

  /**
   * 创建一个唯一的token， 由于有可能会在之前已经具有了相同的token了
   * 所以采用了递归的方法，来创建一个完全不存在的token 小小的使用了一下递归方法，
   * @param number
   * @private
   */
  private async generateToken(number: number) {
    const token = await Math.random().toString(36).substr(2, number);
    const condition: ObjectLiteral = { token };
    const tokenCount = await this.userRepository.find({
      where: {
        token,
      },
    });
    if (tokenCount.length > 0) {
      this.logger.info('token already exist, generate again');
      await this.generateToken(number);
    }
    return token;
  }
}
