declare module 'MyTypes' {
  import { StateType, ActionType } from 'typesafe-actions'
  import { Record } from 'immutable'
  export type Store = StateType<typeof import('.').default>
  export type RootAction = ActionType<typeof import('./root-action').default>
  // export type RootState = StateType<typeof import('./root-reducer').default>
  export type RootService = typeof import('./root-service').default

  type RootData = StateType<typeof import('./root-reducer').default>

  export type RootState = Record<RootData>
}
