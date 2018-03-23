import { getCurrentPage } from '../App'
import { isFn } from '../../../utils/type'

export const startPullDownRefresh = ({
  success,
  complete
}) => {
  const currentPage = getCurrentPage()
  currentPage && (currentPage.pageIsRefreshing = true)
  isFn(success) && success({
    errMsg: 'startPullDownRefresh:ok'
  })
  isFn(complete) && complete({
    errMsg: 'startPullDownRefresh:ok'
  })
}
export const stopPullDownRefresh = ({
  success,
  complete
}) => {
  const currentPage = getCurrentPage()
  currentPage && (currentPage.pageIsRefreshing = false)
  isFn(success) && success({
    errMsg: 'stopPullDownRefresh:ok'
  })
  isFn(complete) && complete({
    errMsg: 'stopPullDownRefresh:ok'
  })
}
