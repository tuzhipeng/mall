import {request} from "./request";

export function getHomeMutidata() {
  // request需要一个包含URL的对象
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url : '/home/data',
    params:{
      type,
      page
    }
  })
}
