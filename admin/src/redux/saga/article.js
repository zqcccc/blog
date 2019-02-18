import { takeEvery, takeLatest, call, put, all } from 'redux-saga/effects'
import {
  actionTypes,
  getArtListSuccess,
  getTagList,
  requestFail,
} from '../action'
import axios from '../../axios'

function* getArticleList({ payload }) {
  try {
    const { data } = yield call(axios.api_get_article, payload)
    if (data.code) {
      yield put(getArtListSuccess(data.data))
      yield put(getTagList())
    } else {
      yield put(requestFail(data.msg))
    }
  } catch (e) {
    yield put(requestFail(e))
  }
}

export default function* tagSaga() {
  yield all([
    takeEvery(actionTypes.GET_ARTICLE_LIST, getArticleList),
    // takeLatest(actionTypes.POST_TAG, postArticle),
    // takeLatest(actionTypes.DELETE_TAG, deleteArticle),
    // takeLatest(actionTypes.EDIT_TAG, editArticle)
  ])
}