import { combineReducers } from 'redux'
import { actionTypes } from '../action'
import tag from './tag'
import status from './status'
import article from './article'


export default combineReducers({
  article,
  tag,
  status
})