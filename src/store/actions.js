import * as types from './mutation-types'

const actions = {
  addToCart({state, commit}, info){
    return new Promise(resolve => {
      const oldInfo = state.cartList.find(item => item.iid === info.iid)
      if (oldInfo){
        const index = state.cartList.indexOf(oldInfo)
        commit(types.INCREMENT_COUNT, index)
        resolve('该商品数量+1')

      }else {
        info.count = 1
        commit(types.ADD_TO_CART, info)
        resolve('加入购物车成功')
      }

    })
  }
}

export default actions
