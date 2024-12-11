export interface Option<A> {
  kind: 'Some' | 'Nothing'
  isSome: () => boolean
  isNothing: () => boolean
  value: () => A
  getOrElse(arg0: A): A
  map: <B>(arg0: (arg0: A) => B | undefined | null) => Option<B>
  andThen: <B>(f: (arg1: A) => Option<B>) => Option<B>
  mapOr: <B>(f: (arg2: A) => B, def: B) => B
  mapOrElse: <B>(defFn: () => B, fn: (arg3: A) => B) => B
  filter: (filterFn: (arg3: A) => boolean) => Option<A>
  match: <B>(arg0: { isSome: (value: A) => B; isNothing: () => B }) => B
}

const Some = <T>(arg: T): Option<T> => ({
  kind: 'Some',
  isSome: () => true,
  isNothing: () => false,
  value() {
    return arg
  },
  getOrElse() {
    return arg
  },
  map: fn => option(fn(arg)),
  andThen(fn) {
    return fn(arg)
  },
  mapOr(fn, def) {
    try {
      return fn(arg)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return def
    }
  },
  mapOrElse(defFn, fn) {
    try {
      return fn(arg)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return defFn()
    }
  },
  filter(filterFn) {
    return filterFn(arg) ? this : Nothing
  },
  match(conditions) {
    return conditions.isSome(arg)
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Nothing: Option<any> = {
  kind: 'Nothing',
  isSome: () => false,
  isNothing: () => true,
  value: () => undefined,
  getOrElse: defaultValue => defaultValue,
  map: () => Nothing,
  andThen: () => Nothing,
  mapOr: (_fn, def) => def,
  mapOrElse: defFn => defFn(),
  filter: () => Nothing,
  match: conditions => conditions.isNothing(),
}

export function option<T>(value: T | null | undefined): Option<T> {
  if (value !== null && value !== undefined && !Number.isNaN(value)) {
    return Some(value)
  }
  return Nothing
}

export function optionRun<T, Y>(optionValue: Option<T>, fnApply: (arg: T) => Y | undefined | null): Option<Y> {
  return optionValue.map(fnApply)
}
