import * as ActionTypes from 'action/type'

/**
 * 在这个reducer里，我们只负责处理app的加载状况
 * 具体的数据我们在具体处理数据的reducer中处理
 */
export default (
  state = {
    isLoading: false,
    isSuccess: false,
    isFail: false
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.REQUEST_START: {
      return Object.assign({}, state, {
        isLoading: true,
        isSuccess: false,
        isFail: false
      })
    }
    case ActionTypes.REQUEST_CONTENT_SUCCESS:
    case ActionTypes.REQUEST_LIST_SUCCESS:
    case ActionTypes.REQUEST_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: true,
        isFail: false
      })
    }
    case ActionTypes.REQUEST_FAILURE: {
      // 在控制台输出错误
      console.error(action.err)
      return Object.assign({}, state, {
        isLoading: false,
        isSuccess: false,
        isFail: true
      })
    }
    default:
      return state
  }
}

export const getIsRequesting = state => state.isLoading
