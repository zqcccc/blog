let index = 0
export const actionTypes = {
  GET_TAG_LIST: 'GET_TAG_LIST',
  GET_TAG_LIST_SUCCESS: 'GET_TAG_LIST_SUCCESS',
  GET_TAG_LIST_FAIL: 'GET_TAG_LIST_FAIL',
  NEW_TAG: 'NEW_TAG',
  POST_TAG: 'POST_TAG',
  POST_TAG_SUCCESS: 'POST_TAG_SUCCESS',
  EDIT_TAG: 'EDIT_TAG',
  EDIT_TAG_SUCCESS: 'EDIT_TAG_SUCCESS',
  DELETE_TAG: 'DELETE_TAG',
  DELETE_TAG_SUCCESS: 'DELETE_TAG_SUCCESS',
  REQUEST_FAIL: 'REQUEST_FAIL',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  GET_ARTICLE_LIST: 'GET_ARTICLE_LIST',
  GET_ARTICLE_LIST_SUCCESS: 'GET_ARTICLE_LIST_SUCCESS',
  POST_ARTICLE: 'POST_ARTICLE',
  POST_ARTICLE_SUCCESS: 'POST_ARTICLE_SUCCESS',
  EDIT_ARTICLE: 'EDIT_ARTICLE',
  EDIT_ARTICLE_SUCCESS: 'EDIT_ARTICLE_SUCCESS',
  DELETE_ARTICLE: 'DELETE_ARTICLE',
  DELETE_ARTICLE_SUCCESS: 'DELETE_ARTICLE_SUCCESS',
}
export const editArticle = article => ({
  type: actionTypes.EDIT_ARTICLE,
  payload : {
    article
  }
})
export const editArticleSuccess = () => ({
  type: actionTypes.EDIT_ARTICLE_SUCCESS,
  payload : {
    msg: '修改文章成功'
  }
})
export const deleteArticle = id => ({
  type: actionTypes.DELETE_ARTICLE,
  payload : {
    id
  }
})
export const deleteArticleSuccess = () => ({
  type: actionTypes.DELETE_ARTICLE_SUCCESS,
  payload : {
    msg: '删除文章成功'
  }
})
export const postArticle = article => ({
  type: actionTypes.POST_ARTICLE,
  payload : {
    article
  }
})
export const postArticleSuccess = () => ({
  type: actionTypes.POST_ARTICLE_SUCCESS,
  payload : {
    msg: '添加文章成功'
  }
})
export const getArtList = payload => ({
  type: actionTypes.GET_ARTICLE_LIST,
  payload
})
export const getArtListSuccess = list => ({
  type: actionTypes.GET_ARTICLE_LIST_SUCCESS,
  payload: {
    data: list
  }
})
export const editTagSuccess = () => ({
  type: actionTypes.EDIT_TAG_SUCCESS,
  payload: {
    msg: '修改标签成功'
  }
})
export const editTag = data => ({
  type: actionTypes.EDIT_TAG,
  payload: {
    data
  }
})
export const deleteTagSuccess = () => ({
  type: actionTypes.DELETE_TAG_SUCCESS,
  payload: {
    msg: '删除标签成功'
  }
})
export const deleteTag = id => ({
  type: actionTypes.DELETE_TAG,
  payload: {
    id
  }
})
export const postTagSuccess = () => ({
  type: actionTypes.POST_TAG_SUCCESS,
  payload: {
    msg: '添加标签成功'
  }
})
export const postTag = data => ({
  type: actionTypes.POST_TAG,
  payload: {
    data
  }
})
// export const toggleEditable = key => ({
//   type: actionTypes.TOGGLE_TAG_EDIT,
//   payload: {
//     key
//   }
// })
// export const newTag = () => ({
//   type: actionTypes.NEW_TAG,
//   payload: {
//     key: `NEW_TEMP_ID_${index++}`,
//     workId: '',
//     name: '',
//     department: '',
//     editable: true,
//     isNew: true
//   }
// })
export const getTagList = () => ({
  type: actionTypes.GET_TAG_LIST
})
export const getTagListSuccess = list => ({
  type: actionTypes.GET_TAG_LIST_SUCCESS,
  payload: {
    data: list
  }
})
export const getTagListFail = err => ({
  type: actionTypes.GET_TAG_LIST_FAIL,
  payload: {
    msg: err
  }
})
export const requestFail = err => ({
  type: actionTypes.REQUEST_FAIL,
  payload: {
    msg: err
  }
})
