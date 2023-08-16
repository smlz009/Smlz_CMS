import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc) //扩展

export function formatUTC(utcData: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.utc(utcData).utcOffset(8).format(format)
}
