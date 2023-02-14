/**
 * date: 2023-02-13, Mon, 14:28
 * author: Wang
 * feature： 前端传输创建 category 的 dto
 *   {
 *        "id": "72191304",
 *        "name": "菜场",
 *        "name_override": false,
 *        "modified": "2023-02-02 12:22:32.311",
 *        "type": "expense",
 *        "category": "69876114",
 *        "deleted": false,
 *        "meta_tag": false
 *    }
 *    同时为每一个字段添加class validator
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ToshlCategory {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsBoolean()
  name_override: boolean;

  @ApiProperty()
  @IsDateString()
  modified: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsBoolean()
  deleted: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  meta_tag: boolean;
}
