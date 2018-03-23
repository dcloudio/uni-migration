const rewriter = require('../../../../util')

describe('template.tag.checkbox-group', () => {

  it('rewrite `checkbox-group`', () => {
    const fixture = `
<checkbox-group bindchange="checkboxChange" dtest="test">
  <label class="weui-cell weui-check__label" wx:for="{{items}}" wx:key="{{item.value}}">
    <view class="weui-cell__hd">
      <checkbox value="{{item.value}}" checked="{{item.checked}}"/>
    </view>
    <view class="weui-cell__bd">{{item.name}}</view>
  </label>
</checkbox-group>
`

    const expected = `<div class="u-w-checkbox-group"><div class="u-w-label weui-cell weui-check__label" for="{{(index,item) in items}}" tid="{{item.value}}"><div class="u-w-view weui-cell__hd"><input class="u-w-checkbox" value="{{item.value}}" checked="{{item.checked}}" name="test" type="checkbox"></input></div><div class="u-w-view weui-cell__bd"><text class="u-w-text">{{item.name}}</text></div></div></div>`

    rewriter.assertTemplateString(fixture, expected)
  })

})