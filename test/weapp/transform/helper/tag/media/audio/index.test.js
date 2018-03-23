const rewriter = require('../../../util')

describe('template.tag.audio', () => {

  it('rewrite `audio`', () => {
    const fixture = `
<audio id="audio" src="http://www.test.com/1.mp4" loop="false" controls="false" poster="" name="音频名字" author="作者" binderror="" bindplay="" 
 bindpause="" bindtimeupdate="" bindended="">
</audio> 
`

    const expected = `<audio class="u-w-audio" id="audio" src="http://www.test.com/1.mp4" loop="false" controls="false"></audio>`

    rewriter.assertTemplateString(fixture, expected)
  })

})