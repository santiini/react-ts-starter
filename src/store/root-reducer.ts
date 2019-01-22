import { combineReducers } from 'redux-immutable'

import userReducer from '../containers/reducer'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer
