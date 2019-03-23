import {actionTypes} from '../action'

/**
 * 在这个reducer里，我们只负责处理app的加载状况
 * 具体的数据我们在具体处理数据的reducer中处理
 */
export default (
  state = {
    isLoading: false,
    isSuccess: false,
    isFail: false,
    msg: '',
  },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLE_LIST:
    case actionTypes.DELETE_TAG:
    case actionTypes.EDIT_TAG:
    case actionTypes.POST_TAG:
    case actionTypes.GET_TAG_LIST: {
      return Object.assign({}, state, {
        isLoading: true,
        isSuccess: false,
        isFail: false
      })
    }
    case actionTypes.POST_ARTICLE_SUCCESS:
    case actionTypes.EDIT_ARTICLE_SUCCESS:
    case actionTypes.DELETE_ARTICLE_SUCCESS:
    case actionTypes.GET_ARTICLE_LIST_SUCCESS:
    case actionTypes.GET_TAG_LIST_SUCCESS:
    case actionTypes.DELETE_TAG_SUCCESS:
    case actionTypes.EDIT_TAG_SUCCESS:
    case actionTypes.POST_TAG_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: true,
        isFail: false,
        msg: action.payload.msg || ''
      })
    }
    case actionTypes.GET_TAG_LIST_FAIL:
    case actionTypes.REQUEST_FAIL: {
      // 在控制台输出错误
      console.error('error in action.payload: ',action.payload)
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: false,
        isFail: true,
        msg: action.payload.msg || ''
      })
    }
    default:
      return state
  }
}

export const getIsRequesting = state => state.isLoading
