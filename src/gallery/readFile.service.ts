import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ReadFileService {
  constructor(readonly i18n: I18nService) {}

  async readFolder(sourceFolder: string) {
    // 添加位置信息， 读取该文件 path.join(__dirname,xxx)
    const filePath = sourceFolder;

    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isDirectory()) {
      //  读取并遍历文件到json数组中

      const filesArray = await fs.promises.readdir(filePath);
      // 过滤所有的 json 文件
      const jsonFiles = filesArray.filter((item) => path.extname(item) === '.json');
      const asrJsonArray = [];
      for (let index = 0; index < jsonFiles.length; index++) {
        const isValid = await this.validateJson(jsonFiles[index], filePath);
        if (isValid) {
          asrJsonArray.push(`${filePath}/${jsonFiles[index]}`);
        }
      }

      return asrJsonArray;
    } else {
      //该文件夹不存在
      const errorMessage = await this.i18n.t('error.FOLDER_NOT_EXIST');
      // Logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }
  }

  /**
   * 查看该路径上的json文件是否 符合 要求
   * @param item
   * @param filePath
   */
  async validateJson(item: string, filePath: string) {
    // const jsonPath = path.join(filePath, item);

    // const demo = require(jsonPath);

    return true;
    //
    // const validResult = Validator.validate(demo, schema);
    //
    // if (validResult.valid) {
    //   return true;
    // } else {
    //   const errorMsg = await this.i18n.t('error.FILE_FORMAT_ERROR');
    //   Logger.error(`${jsonPath} ${errorMsg}`);
    //   Logger.error(
    //     `${jsonPath} ${JSON.stringify(validResult?.errors[0]?.stack)}`,
    //   ); // 只打印一行就够
    //   return false;
    // }
  }
}
