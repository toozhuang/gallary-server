/**
 * date: 2023-02-8, Wed, 15:30
 * author: Wang
 * feature： toshl record with api doc and swagger
 */

import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

class ToshlCurrency {
  @ApiProperty()
  code: string;
  @ApiProperty()
  main_rate: number;
  @ApiProperty()
  fixed: boolean;
  @ApiProperty()
  ref: string;
  @ApiProperty()
  rate: number;
}

/**
 * class will be like
 * {
 *   amount: -176,
 *   date: '2023-02-08',
 *   currency: {
 *     code: 'HKD',
 *     main_rate: null,
 *     fixed: false,
 *     ref: 'HKD',
 *     rate: null,
 *   },
 *   account: '4175911',
 *   reminders: [],
 *   tags: ['72191323'],
 *   category: '69876116',
 * }
 */
export class ToshlRecord {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: string;

  @ApiProperty({ type: ToshlCurrency })
  currency: ToshlCurrency;

  @ApiProperty()
  account: string;

  @ApiProperty()
  reminders: string[];

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  category: string;
}
