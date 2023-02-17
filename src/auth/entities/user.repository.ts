// /**
//  * date: 2023-02-17, Fri, 20:51
//  * author: Wang
//  * feature： 基于 entity 之上的 repository
//  * 扩充了 user eneity 的能力
//  */
// import { UserEntity } from './user.entity';
// import { EntityRepository } from 'typeorm';
//
// @EntityRepository(UserEntity)
// export class UserRepository extends BaseRepository<UserEntity, UserSerializer> {
//   /**
//    * store new user
//    * @param createUserDto
//    * @param token
//    */
//   async store(
//     createUserDto: DeepPartial<UserEntity>,
//     token: string,
//   ): Promise<UserSerializer> {
//     if (!createUserDto.status) {
//       createUserDto.status = UserStatusEnum.INACTIVE;
//     }
//     createUserDto.salt = await bcrypt.genSalt();
//     createUserDto.token = token;
//     const user = this.create(createUserDto);
//     await user.save();
//     return this.transform(user);
//   }
//
//   // /**
//   //  * login user
//   //  * @param userLoginDto
//   //  */
//   // async login(
//   //   userLoginDto: UserLoginDto,
//   // ): Promise<[user: UserEntity, error: string, code: number]> {
//   //   const { username, password } = userLoginDto;
//   //   const user = await this.findOne({
//   //     where: [
//   //       {
//   //         username: username,
//   //       },
//   //       {
//   //         email: username,
//   //       },
//   //     ],
//   //   });
//   //   if (user && (await user.validatePassword(password))) {
//   //     if (user.status !== UserStatusEnum.ACTIVE) {
//   //       return [
//   //         null,
//   //         ExceptionTitleList.UserInactive,
//   //         StatusCodesList.UserInactive,
//   //       ];
//   //     }
//   //     return [user, null, null];
//   //   }
//   //   return [
//   //     null,
//   //     ExceptionTitleList.InvalidCredentials,
//   //     StatusCodesList.InvalidCredentials,
//   //   ];
//   // }
//   //
//   // /**
//   //  * Get user entity for reset password
//   //  * @param resetPasswordDto
//   //  */
//   // async getUserForResetPassword(
//   //   resetPasswordDto: ResetPasswordDto,
//   // ): Promise<UserEntity> {
//   //   const { token } = resetPasswordDto;
//   //   const query = this.createQueryBuilder('user');
//   //   query.where('user.token = :token', { token });
//   //   query.andWhere('user.tokenValidityDate > :date', {
//   //     date: new Date(),
//   //   });
//   //   return query.getOne();
//   // }
//   //
//   // /**
//   //  * transform user
//   //  * @param model
//   //  * @param transformOption
//   //  */
//   // transform(model: UserEntity, transformOption = {}): UserSerializer {
//   //   return plainToClass(
//   //     UserSerializer,
//   //     classToPlain(model, transformOption),
//   //     transformOption,
//   //   );
//   // }
//   //
//   // /**
//   //  * transform users collection
//   //  * @param models
//   //  * @param transformOption
//   //  */
//   // transformMany(models: UserEntity[], transformOption = {}): UserSerializer[] {
//   //   return models.map((model) => this.transform(model, transformOption));
//   // }
// }
