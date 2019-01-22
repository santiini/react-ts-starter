/* immutable 中 Record 的定义 */

export module Record {
  /**
   * True if `maybeRecord` is an instance of a Record.
   */
  export function isRecord(maybeRecord: any): maybeRecord is Record<any>

  export function getDescriptiveName(record: Record<any>): string

  export module Factory {}

  export interface Factory<TProps extends Object> {
    (values?: Partial<TProps> | Iterable<[string, any]>): Record<TProps> & Readonly<TProps>
    new (values?: Partial<TProps> | Iterable<[string, any]>): Record<TProps> & Readonly<TProps>

    /**
     * The name provided to `Record(values, name)` can be accessed with
     * `displayName`.
     */
    displayName: string
  }

  export function Factory<TProps extends Object>(
    values?: Partial<TProps> | Iterable<[string, any]>,
  ): Record<TProps> & Readonly<TProps>
}

/**
 * Unlike other types in Immutable.js, the `Record()` function creates a new
 * Record Factory, which is a function that creates Record instances.
 *
 * See above for examples of using `Record()`.
 *
 * Note: `Record` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 */
export function Record<TProps>(defaultValues: TProps, name?: string): Record.Factory<TProps>

export interface Record<TProps extends Object> {
  // Reading values

  has(key: string): key is keyof TProps & string

  /**
   * Returns the value associated with the provided key, which may be the
   * default value defined when creating the Record factory function.
   *
   * If the requested key is not defined by this Record type, then
   * notSetValue will be returned if provided. Note that this scenario would
   * produce an error when using Flow or TypeScript.
   */
  get<K extends keyof TProps>(key: K, notSetValue?: any): TProps[K]
  get<T>(key: string, notSetValue: T): T

  // Reading deep values

  hasIn(keyPath: Iterable<any>): boolean
  getIn(keyPath: Iterable<any>): any

  // Value equality

  equals(other: any): boolean
  hashCode(): number

  // Persistent changes

  set<K extends keyof TProps>(key: K, value: TProps[K]): this
  update<K extends keyof TProps>(key: K, updater: (value: TProps[K]) => TProps[K]): this
  merge(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this
  mergeDeep(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this

  mergeWith(
    merger: (oldVal: any, newVal: any, key: keyof TProps) => any,
    ...collections: Array<Partial<TProps> | Iterable<[string, any]>>
  ): this
  mergeDeepWith(
    merger: (oldVal: any, newVal: any, key: any) => any,
    ...collections: Array<Partial<TProps> | Iterable<[string, any]>>
  ): this

  /**
   * Returns a new instance of this Record type with the value for the
   * specific key set to its default value.
   *
   * @alias remove
   */
  delete<K extends keyof TProps>(key: K): this
  remove<K extends keyof TProps>(key: K): this

  /**
   * Returns a new instance of this Record type with all values set
   * to their default values.
   */
  clear(): this

  // Deep persistent changes

  setIn(keyPath: Iterable<any>, value: any): this
  updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this
  mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this
  mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this

  /**
   * @alias removeIn
   */
  deleteIn(keyPath: Iterable<any>): this
  removeIn(keyPath: Iterable<any>): this

  // Conversion to JavaScript types

  /**
   * Deeply converts this Record to equivalent native JavaScript Object.
   *
   * Note: This method may not be overridden. Objects with custom
   * serialization to plain JS may override toJSON() instead.
   */
  toJS(): { [K in keyof TProps]: any }

  /**
   * Shallowly converts this Record to equivalent native JavaScript Object.
   */
  toJSON(): TProps

  /**
   * Shallowly converts this Record to equivalent JavaScript Object.
   */
  toObject(): TProps

  // Transient changes

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Only `set` may be used mutatively.
   *
   * @see `Map#withMutations`
   */
  withMutations(mutator: (mutable: this) => any): this

  /**
   * @see `Map#asMutable`
   */
  asMutable(): this

  /**
   * @see `Map#wasAltered`
   */
  wasAltered(): boolean

  /**
   * @see `Map#asImmutable`
   */
  asImmutable(): this

  // Sequence algorithms

  // toSeq(): Seq.Keyed<keyof TProps, TProps[keyof TProps]>

  [Symbol.iterator](): IterableIterator<[keyof TProps, TProps[keyof TProps]]>
}

/**
 * RecordOf<T> is used in TypeScript to define interfaces expecting an
 * instance of record with type T.
 *
 * This is equivalent to an instance of a record created by a Record Factory.
 */
export type RecordOf<TProps extends Object> = Record<TProps> & Readonly<TProps>
