import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToshlEntity } from './toshl.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToshlService {
  constructor(
    @InjectRepository(ToshlEntity)
    private usersRepository: Repository<ToshlEntity>,
  ) {
    console.log('toshl controller constructor');
  }

  getAll() {
    return this.usersRepository.find();
  }

  insertOne() {
    return this.usersRepository.save({
      date: '2019-01-01',
      account: 'account',
      category: 'category',
    });
  }
}
