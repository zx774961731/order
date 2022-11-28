import axios from 'axios'
const service = axios.create({
  baseURL: '/zx', // 配置开发环境的baseApi
  timeout: 5000, // 超时时间
})
import { getToken } from '@/utils'

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    config.headers['token'] = token
    return config // config必须返回
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, data, msg } = response.data
    //   根据成功与否 执行操作
    if (code === 0) {
      return data
    } else {
      $message.error(msg)
      return response.data.code
    }
  },
  (error) => {
    console.log(error.msg)
    return Promise.reject(error) // 返回执行错误的错误的promise对象 进入catch
  }
)

export function login(data) {
  return service({
    url: `/sys/login`,
    method: 'post',
    data,
  })
}

export function getRecordList(data) {
  return service({
    url: `/customer/ticket/query`,
    method: 'post',
    data,
  })
}

export function getToDoList(data) {
  return service({
    url: `/staff/ticket/undo`,
    method: 'post',
    data,
  })
}

export function getDoneList(data) {
  return service({
    url: `/staff/ticket/done`,
    method: 'post',
    data,
  })
}

export function deleteTicket(ticketId) {
  return service({
    url: `/customer/ticket/deleteTicket`,
    method: 'post',
    data: {
      ticketId,
    },
  })
}
/**====================运营人员项目接口===================== */
// 创建提交工单
export function submitOrder(data) {
  return service({
    url: `/staff/ticket/submit`,
    method: 'post',
    data,
  })
}
// 查询工单详情
export function queryOrderDetail(data) {
  return service({
    url: `/staff/ticket/queryDetails`,
    method: 'post',
    data,
  })
}
// 结单
export function finishOrder(data) {
  return service({
    url: `/staff/ticket/finish`,
    method: 'post',
    data,
  })
}
// 转派
export function deliverOrder(data) {
  return service({
    url: `/staff/ticket/deliver`,
    method: 'post',
    data,
  })
}
// 评论
export function commentOrder(data) {
  return service({
    url: `/staff/ticket/comment`,
    method: 'post',
    data,
  })
}

/**====================运营人员项目接口===================== */
