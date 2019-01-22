import { createAsyncAction } from 'typesafe-actions'
import { IRepostParams } from '../services/user'

/* 导入时会以 * as user 导入， 单独存在时，需要特殊处理  */
export const loadUserAsync = createAsyncAction(
  'LOAD_USER_REQUEST',
  'LOAD_USER_SUCCESS',
  'LOAD_USER_FAILURE'
)<IRepostParams, { data: any }, { error: any }>()

export const saveTodosAsync = createAsyncAction(
  'SAVE_TODOS_REQUEST',
  'SAVE_TODOS_SUCCESS',
  'SAVE_TODOS_FAILURE'
)<void, void, string>()

export default {
  loadUserAsync,
  saveTodosAsync,
}
