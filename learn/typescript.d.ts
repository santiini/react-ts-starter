declare module 'LearnTypes' {
  /* 1. ['type']: 这里注意 type 字符串的使用 */
  export type StringType = string

  export interface TypeMeta<T extends StringType> {
    getType?: () => T
  }

  export type AC<T extends { type: string }> = ((...args: any[]) => T) & TypeMeta<T['type']>
}
