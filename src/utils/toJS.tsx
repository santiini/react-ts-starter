import React from 'react'
import { isImmutable } from 'immutable'

export function getJS(data: Record<string, any>) {
  const KEY = 0
  const VALUE = 1
  const propsJS = Object.entries(data).reduce(
    (newProps, itek) => {
      newProps[itek[KEY]] = isImmutable(itek[VALUE]) ? itek[VALUE].toJS() : itek[VALUE]
      return newProps
    },
    {} as Record<keyof typeof data, any>
  )
  return propsJS
}

const toJS = (WrappedComponent: React.ComponentType<any>) => (
  wrappedComponentProps: Record<string, any>
) => {
  const KEY = 0
  const VALUE = 1

  const propsJS = Object.entries(wrappedComponentProps).reduce(
    (newProps, wrappedComponentProp) => {
      newProps[wrappedComponentProp[KEY]] = isImmutable(wrappedComponentProp[VALUE])
        ? wrappedComponentProp[VALUE].toJS()
        : wrappedComponentProp[VALUE]
      return newProps
    },
    {} as Record<string, any>
  )

  return <WrappedComponent {...propsJS} />
}

export default toJS
