import { all } from 'redux-saga/effects'
import tagSagas from './tag'
import articleSagas from './article'

export default function* rootSagas() {
  yield all([articleSagas(), tagSagas()])
}
