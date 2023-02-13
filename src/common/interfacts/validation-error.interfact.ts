export interface ValidationErrorInterface {
  name: string;
  errors: Array<string>;
}

/**
 * 专门用来记录错误内容的interface
 * 其中的 property 是用来显示哪里错误的
 */
export interface ValidationPayloadInterface {
  property: string;
  message: Array<string>;
}
