/**
 * 验证是否登录的中间件
 * @export
 * @param {*} { store, route }
 */
export default function({ store, redirect }) {
	if (!store.state.user) {
    return redirect('/login')
  }
}
