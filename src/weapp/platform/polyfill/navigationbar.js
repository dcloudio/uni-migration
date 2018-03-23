import { getCurrentPage } from '../App'
import { isFn } from '../../../utils/type'

export const setNavigationBarTitle = ({
  title,
  success,
  complete
}) => {
  const currentPage = getCurrentPage()
  currentPage && (currentPage.$page.setTitleBar({
    text: title || ''
  }))
  isFn(success) && success({
    errMsg: 'startPullDownRefresh:ok'
  })
  isFn(complete) && complete({
    errMsg: 'startPullDownRefresh:ok'
  })
}
export const setNavigationBarColor = ({
  frontColor,
  backgroundColor,
  success,
  complete
}) => {
  const currentPage = getCurrentPage()
  currentPage && (currentPage.$page.setTitleBar({
    textColor: frontColor || '',
    backgroundColor: backgroundColor || ''
  }))
  isFn(success) && success({
    errMsg: 'stopPullDownRefresh:ok'
  })
  isFn(complete) && complete({
    errMsg: 'stopPullDownRefresh:ok'
  })
}
