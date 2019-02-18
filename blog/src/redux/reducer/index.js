import {
    combineReducers
} from "redux"
import * as ActionTypes from "../action/type"
import status, * as allStatus from './statusReducers'
import list from './list'
import contentList from './content'

let defaultMeta = new Map(); // 可以使用其做为默认

/* TODO AND TIP:

这里我们需要定义使用的 Reducer，这里已经给出了一个 reducer 的例子，之后可以使用 combineReducers 进行 export

 */
export default combineReducers({
    status, // status 搬了过来，但是没有用上
    list,
    contentList
    // More
})

export const getIsRequesting = (state) => allStatus.getIsRequesting(state.status)

export const sortByDate = array => array.concat().sort((a, b) => a.date >= b.date ? -1 : 1)