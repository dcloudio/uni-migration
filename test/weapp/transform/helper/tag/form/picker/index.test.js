const rewriter = require('../../../util')

describe('template.tag.picker', () => {

  it('rewrite `picker`', () => {
//  const fixture = `
//<picker mode="time" value="{{time}}" start="09:01" end="21:01" bindchange="bindTimeChange">
//	<view class="weui-input">{{time}}</view>
//</picker>
//`
    const fixture = `
<picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
  <view class="weui-input">{{date}}</view>
</picker>
`

//  const expected = `<picker class="u-w-picker" type="time" value="{{time}}" start="09:01" end="21:01" onchange="$handlePageEvent('bindTimeChange','change',false,false)"></picker>`
    const expected = `<picker class="u-w-picker" onchange="$handlePageEvent('bindPickerChange',false,false)" value="{{array[index]}}" range="{{array}}" type="text"></picker>`

    rewriter.assertTemplateString(fixture, expected)
  })

})