import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME =
  process.env.NODE_ENV === 'dev' ? 'development.yaml' : 'config.yaml';
console.log('我是 yaml 的配置文件', YAML_CONFIG_FILENAME);
/**
 * 在导出 config 的时候 决定当前的 config
 * 内部的内容究竟是属于 dev 还是属于 prod
 */
export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
