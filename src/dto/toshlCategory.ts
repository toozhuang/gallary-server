import { ApiProperty } from '@nestjs/swagger';

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
 */
export class ToshlCategory {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  name_override: boolean;
  @ApiProperty()
  modified: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  deleted: boolean;
  @ApiProperty()
  meta_tag: boolean;
}
