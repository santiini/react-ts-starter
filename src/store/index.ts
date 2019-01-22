import { RootAction, RootState, RootService } from 'MyTypes'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import rootReducer from './root-reducer'
import rootEpic from './root-epic'
import rootService from './root-service'

export const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, RootService>({
  /* 注入依赖 */
  dependencies: rootService,
})

// configure middlewares
const middlewares = [epicMiddleware]
// create store
// const store = createStore(rootReducer, initialState, enhancer)
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

epicMiddleware.run(rootEpic)

// export store singleton instance
export default store
