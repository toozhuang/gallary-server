import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToshlEntity } from './toshl.entity';
import { Repository } from 'typeorm';
import { ToshlRecord } from '../dto/toshlRecord';
import { ToshlCategory } from '../dto/toshlCategory';
import { CategoryEntity } from './entities/toshlCategory.entity';
import * as console from 'console';
import { ValidationPayloadInterface } from '../common/interfacts/validation-error.interfact';
import { isEmpty } from 'lodash';

const short = require('short-uuid');

@Injectable()
export class ToshlService {
  constructor(
    @InjectRepository(ToshlEntity)
    private usersRepository: Repository<ToshlEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {
    console.log('toshl controller constructor');
  }

  getAll() {
    return this.usersRepository.find();
  }

  insertOne(toshl: ToshlRecord) {
    const cost = toshl.amount;
    return this.usersRepository.save({
      date: toshl.date,
      spendingAmount: cost > 0 ? 0 : cost,
      incomeAmount: cost > 0 ? cost : 0,
      account: toshl.account,
      category: toshl.category,
      tag: toshl.tags.join(','),
    });
  }

  async insertCategory(toshlCategory: ToshlCategory) {
    const category = await this.categoryRepository.find({
      where: {
        name: toshlCategory.name,
      },
    });
    const errorPayload: ValidationPayloadInterface[] = [];
    if (!isEmpty(category)) {
      errorPayload.push({
        property: 'name',
        message: ['alreadyExist'],
      });
      throw new UnprocessableEntityException(errorPayload);
    } else {
      return this.categoryRepository.save({
        ...toshlCategory,
        id: short().new(),
      });
    }
  }
}
