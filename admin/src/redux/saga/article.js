import { takeEvery, takeLatest, call, put, all } from 'redux-saga/effects'
import {
  actionTypes,
  getArtList,
  getArtListSuccess,
  getTagList,
  requestFail,
  editArticleSuccess,
  deleteArticleSuccess,
  postArticleSuccess
} from '../action'
import axios from '../../axios'

function* getArticleList({ payload = {} }) {
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
function* postArt({ payload }) {
  try {
    const { data } = yield call(axios.api_post_article, payload.article)
    if (data.code) {
      yield put(postArticleSuccess())
    } else {
      yield put(requestFail(data.msg))
    }
    yield put(getArtList({}))
  } catch (e) {
    yield put(requestFail(e))
  }
}
function* editArt({ payload }) {
  try {
    const { data } = yield call(axios.api_put_article, payload.article)
    if (data.code) {
      yield put(editArticleSuccess())
    } else {
      yield put(requestFail(data.msg))
    }
    yield put(getArtList({}))
  } catch (e) {
    yield put(requestFail(e))
  }
}
function* deleteArt({ payload }) {
  try {
    const { data } = yield call(axios.api_delete_article, payload.id)
    if (data.code) {
      yield put(deleteArticleSuccess())
    } else {
      yield put(requestFail(data.msg))
    }
    yield put(getArtList({}))
  } catch (e) {
    yield put(requestFail(e))
  }
}

export default function* tagSaga() {
  yield all([
    takeEvery(actionTypes.GET_ARTICLE_LIST, getArticleList),
    takeLatest(actionTypes.POST_ARTICLE, postArt),
    takeLatest(actionTypes.EDIT_ARTICLE, editArt),
    takeLatest(actionTypes.DELETE_ARTICLE, deleteArt),
  ])
}
