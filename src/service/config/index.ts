export const TIME_OUT = 5000

let BASE_URL = ''
//判断是否为开发环境
if (import.meta.env.PROD) {
  BASE_URL = 'http://123.207.32.32:5000'
} else {
  BASE_URL = 'http://123.207.32.32:5000'
}

export { BASE_URL }
