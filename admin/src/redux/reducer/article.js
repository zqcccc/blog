import { actionTypes } from '../action'

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLE_LIST_SUCCESS:
      return action.payload.data.map(i => ({ ...i, key: i._id }))
    // case actionTypes.NEW_TAG:
    //   return [...state, action.payload]
    // case actionTypes.TOGGLE_TAG_EDIT:
    // console.log('action.payload.key: ', action.payload.key);
    //   state.map(i => {
    //     console.log('i: ', i);
    //     if (i.key === action.payload.key) {
    //       i.editable=!i.editable
    //     }
    //   })
    //   return [...state]
    default:
      return state
  }
}
