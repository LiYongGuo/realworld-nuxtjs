const cookieparser = process.server ? require('cookieparser') : undefined
// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
const state = () => {
  return {
    user: null // 当前登录用户信息
  }
}

const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 会在服务端渲染期间自动调用
  // 作用： 初始化容器数据，传递给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    console.log('nuxtServerInit')
    let user = null
    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        
      }
    }
    // 提交 mutationsr, 修改 state 状态
    commit('setUser', user)
  }
}

export {
  state,
  mutations,
  actions
}