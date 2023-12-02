export const TIME_OUT = 5000

let BASE_URL = ''
//判断是否为开发环境
if (import.meta.env.PROD) {
  BASE_URL = 'http://47.107.128.145:8000'
} else {
  BASE_URL = 'http://127.0.0.1:8000'
}

export { BASE_URL }
