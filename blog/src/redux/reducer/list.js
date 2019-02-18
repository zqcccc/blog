import * as ActionTypes from 'action/type'

export default (state = new Map(), action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_LIST_SUCCESS:
      const newDateArray = action.list.map(item => [item.pathName, item])
      return new Map([...state, ...newDateArray])
    default:
      return state
  }
}
