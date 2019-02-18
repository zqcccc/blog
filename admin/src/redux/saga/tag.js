import { takeEvery, takeLatest, call, put, all } from 'redux-saga/effects'
import {
  actionTypes,
  getTagListSuccess,
  getTagListFail,
  requestFail,
  postTagSuccess,
  deleteTagSuccess,
  editTagSuccess
} from '../action'
import axios from '../../axios'

function* getTagList() {
  try {
    const { data } = yield call(axios.api_get_tag)
    yield put(getTagListSuccess(data.data))
  } catch (e) {
    yield put(getTagListFail(e))
  }
}
function* postTag({ payload }) {
  try {
    const { data } = yield call(axios.api_post_tag, payload.data)
    if (data.code) {
      yield put(postTagSuccess())
    } else {
      yield put(requestFail(data.msg))
    }
    yield getTagList()
  } catch (e) {
    yield put(requestFail(e))
  }
}
function* editTag({ payload }) {
  try {
    const { data } = yield call(axios.api_put_tag, payload.data)
    if (data.code) {
      yield put(editTagSuccess())
    } else {
      yield put(requestFail(data.msg))
    }
    yield getTagList()
  } catch (e) {
    yield put(requestFail(e))
  }
}
function* deleteTag({ payload }) {
  try {
    const { data } = yield call(axios.api_delete_tag, payload.id)
    if (data.code) {
      yield put(deleteTagSuccess())
    } else {
      yield put(requestFail(data.msg))
    }
    yield getTagList()
  } catch (e) {
    yield put(requestFail(e))
  }
}

export default function* tagSaga() {
  yield all([
    takeEvery(actionTypes.GET_TAG_LIST, getTagList),
    takeLatest(actionTypes.POST_TAG, postTag),
    takeLatest(actionTypes.DELETE_TAG, deleteTag),
    takeLatest(actionTypes.EDIT_TAG, editTag)
  ])
}
