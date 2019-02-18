import * as ActionTypes from 'action/type'

export default (state = new Map(), action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_CONTENT_SUCCESS:
    const { content } = action
      return new Map([...state, [content.pathName, content]])
    default:
      return state
  }
}
