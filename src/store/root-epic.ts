import * as userEpics from '../containers/epics'
import { combineEpics } from 'redux-observable'

export default combineEpics(...Object.values(userEpics))
