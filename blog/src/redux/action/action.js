import * as ActionTypes from './type'
import { preURL } from '../../config'
import axios from 'axios/index'
import { getIsRequesting } from 'reducer'
/*
 * 将异步请求抽离到 action 的好处：
 * 一方面可以抽离组件代码，并且组件之间更方便地共享数据
 * 另外一方面可以让请求发送不再被组件生命周期影响，也可以有效节流
 * */

/* TODO AND TIP:

这里我们需要定义异步 action，请求 list 接口来读取数据（可以通过 `${preURL}/list` 的方式来构造链接）

另外对于具体的数据存储方式，建议采用 javascript 的 map 数据结构，这会给我们之后带来方便，这里给出一些提示代码（不一定完全要采用）：

    let articleMeta = new Map();
    for(let item of response.data){
        articleMeta.set(item.pathName, item)
    }
*/
const requestStart = () => ({
  type: ActionTypes.REQUEST_START
})
const receiveList = list => ({
  type: ActionTypes.REQUEST_LIST_SUCCESS,
  list
})
const receiveContent = content => ({
  type: ActionTypes.REQUEST_CONTENT_SUCCESS,
  content
})
const requestFail = err => ({
  type: ActionTypes.REQUEST_FAILURE,
  err
})

export const getList = () => async (dispatch, getState) => {
  dispatch(requestStart())
  try {
    const res = await axios.get(`${preURL}/list`)
    const data = res.data
    return dispatch(receiveList(data))
  } catch (err) {
    console.log('fetchList fail', err)
    alert('拉取数据失败，请检查网络或者联系管理员！')
    return dispatch(requestFail(err))
  }
}
export const getContent = pathname => async (dispatch, getState) => {
  dispatch(requestStart())
  try {
    const res = await axios.get(`${preURL}/post?pathName=${pathname}`)
    const data = res.data
    return dispatch(receiveContent(data))
  } catch (err) {
    console.log('fetchContent fail', err)
    alert('拉取数据失败，请检查网络或者联系管理员！')
    return dispatch(requestFail(err))
  }
}

