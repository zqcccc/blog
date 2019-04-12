import * as ActionTypes from 'action/type'

export default (state = new Map(), action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_LIST_SUCCESS:
      const newDateArray = action.list.map(item => {
        item.date = item.updata_at || item.create_at
        return [item._id, item]
      })
      return new Map([...state, ...newDateArray])
    default:
      return state
  }
}
