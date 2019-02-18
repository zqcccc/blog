// store 的样例代码 可直接使用
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import reducer from "./redux/reducer/index"
import { createLogger } from 'redux-logger'

// redux 注入操作
const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(reducer, applyMiddleware(...middleware))

export default store