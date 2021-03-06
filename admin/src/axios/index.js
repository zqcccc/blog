import axios from 'axios'

axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

const instance = axios.create();

// request拦截器
instance.interceptors.request.use(
  config => {
    // 每次发送请求，检查 sessionStorage 中是否有 token,如果有放在headers中
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {};
    const token =  userInfo.token || '';
    if( token !== '' ){
      config.headers.Authorization =  'Bearer ' + token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)
// respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let { response } = error;
    if(response.status === 401) {
      // 清楚缓存
      window.sessionStorage.removeItem('userInfo');
      window.location.href = "/login";
      return Promise.reject(error.response);
    }
  }
)

export default {
  // 登录
  api_post_login(data) {
    return instance.post('/api/login', data);
  },
  // 获取文章列表
  api_get_article({ keyword = '', tag = ''}) {
    return instance.get(`/api/article?tag=${tag}&keyword=${keyword}`);
  },
  // 添加文章
  api_post_article(data) {
    return instance.post('/api/article', data);
  },
  // 获取文章详情
  api_get_article_detail(_id) {
    return instance.get(`/api/article/${_id}`);
  },
  // 修改文章
  api_put_article(data) {
    return instance.put(`/api/article/${data._id}`, data);
  },
  // 删除文章
  api_delete_article(_id) {
    return instance.delete(`/api/article/${_id}`);
  },
  // 获取标签列表
  api_get_tag() {
    return instance.get('/api/tag');
  },
  // 添加标签
  api_post_tag(data) {
    return instance.post('/api/tag', data);
  },
  // 删除标签
  api_delete_tag(_id) {
    return instance.delete('/api/tag/' + _id);
  },
  // 修改标签
  api_put_tag(data) {
    return instance.put(`/api/tag/${data._id}`, data);
  },
  // 获取所有评论
  api_get_comment() {
    return instance.get('/api/comment')
  },
  // 删除评论
  api_delete_comment(_id) {
    return instance.delete(`/api/comment/${_id}`)
  }

}
