import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  //  todo: 暂时只是用 user entity，
  // 后续学习的时候， 慢慢添加需要的entity
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(registerUserDto: any): Promise<any> {
    const token = await this.generateToken(12);
    return token;
  }

  /**
   * 创建一个唯一的token， 作用是后续发送邮件的时候， 用来验证用户的身份
   * 小小的使用了一下递归方法，
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
      await this.generateToken(number);
    }
    return token;
  }
}
