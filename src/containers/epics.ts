import { RootAction, RootState, RootService } from 'MyTypes'
import { isActionOf } from 'typesafe-actions'
import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { filter, switchMap, map, catchError } from 'rxjs/operators'

import { loadUserAsync } from './actions'

export const loadTodosEpic: Epic<RootAction, RootAction, RootState, RootService> = (
  action$,
  state$,
  { api }
) =>
  action$.pipe(
    filter(isActionOf(loadUserAsync.request)),
    switchMap(action => {
      console.log(action.payload)
      // return from(fetchRepost(action.payload)).pipe(
      return from(api.user.fetchRepost(action.payload)).pipe(
        map(loadUserAsync.success),
        catchError((message: string) => of(loadUserAsync.failure({ error: message })))
      )
    })
  )
