const rewriteTabbar = (itemOptions, tabBarOptions, selected) => {
  let iconCode = ''
  let textCode = ''
  if (selected) {
    if (itemOptions.selectedIconPath) {
      iconCode = `<image class="u-w-tabbar-icon" src="/${itemOptions.selectedIconPath}"></image>`
    }
    if (itemOptions.text) {
      textCode = `<text class="u-w-tabbar-text" style="color:${tabBarOptions.selectedColor}">${itemOptions.text}</text>`
    }
  } else {
    if (itemOptions.iconPath) {
      iconCode = `<image class="u-w-tabbar-icon" src="/${itemOptions.iconPath}"></image>`
    }
    if (itemOptions.text) {
      textCode = `<text class="u-w-tabbar-text" style="color:${tabBarOptions.color}">${itemOptions.text}</text>`
    }
  }
  return `<div class="u-w-view u-w-tabbar-item" onclick="$handleRouterEvent('switchTab')" data-url="${itemOptions.pagePath}">
        ${iconCode}
        ${textCode}
      </div>`
}
export default function rewriteTabs (code, tabBarOptions, pageIndex) {
  if (tabBarOptions.position === 'top') {
    return `<div class="u-w-view u-w-tabs">
    <div class="u-w-view u-w-tabbar-placeholder">
      <div class="u-w-view u-w-tabbar u-w-tabbar-top" style="border-bottom-color:${tabBarOptions.borderStyle};background-color:${tabBarOptions.backgroundColor}">
        ${tabBarOptions.list.map((itemOptions, index) => rewriteTabbar(itemOptions, tabBarOptions, index === pageIndex)).join('')}
      </div>
    </div>
    ${code}
</div>`
  }
  return `<div class="u-w-view u-w-tabs">
    ${code}
    <div class="u-w-view u-w-tabbar-placeholder">
      <div class="u-w-view u-w-tabbar u-w-tabbar-bottom" style="border-top-color:${tabBarOptions.borderStyle};background-color:${tabBarOptions.backgroundColor}">
        ${tabBarOptions.list.map((itemOptions, index) => rewriteTabbar(itemOptions, tabBarOptions, index === pageIndex)).join('')}
      </div>
    </div>
</div>`
}
