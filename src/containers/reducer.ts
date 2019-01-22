import { RootAction } from 'MyTypes'
import { Reducer } from 'redux'
import { fromJS, Record } from 'immutable'

import { Todo } from './models'
import { getType } from 'typesafe-actions'

import { loadUserAsync } from './actions'

export type ITodoStateData = {
  data: Todo[]
  isLoadingTodos: boolean
}

const stateData = Record<ITodoStateData>({
  data: [],
  isLoadingTodos: false,
})

export const initialState = new stateData()

export type ITodoState = typeof initialState

const todoReducer: Reducer<typeof initialState, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case getType(loadUserAsync.request):
      return state.set('data', fromJS([])).set('isLoadingTodos', true)
    case getType(loadUserAsync.success):
      return state.set('data', fromJS(action.payload.data.items)).set('isLoadingTodos', false)
    case getType(loadUserAsync.failure):
      return state.set('data', fromJS(action.payload.error)).set('isLoadingTodos', false)
    default:
      return state
  }
}

export default todoReducer
