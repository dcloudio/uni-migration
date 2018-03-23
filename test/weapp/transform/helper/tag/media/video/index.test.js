const rewriter = require('../../../util')

describe('template.tag.video', () => {

  it('rewrite `video`', () => {
    const fixture = `
<video src="http://www.test.com/1.RM" initial-time="10" duration="100" controls="true" danmu-list="[]" danmu-btn="false" enable-danmu="false" autoplay="false" loop="false"
 muted="false" page-gesture="false" direction="30" show-progress="true" show-fullscreen-btn="true" show-play-btn="true" show-center-play-btn="true" enable-progress-gesture="true" 
   objectFit="contain" poster="http://www.test.com/1.jpg" bindplay="play" bindpause="pause" bindended="end" bindtimeupdate="update" 
   bindfullscreenchange="screenchange" bindwaiting="" binderror="error">
</video> 
`

    const expected = `<video class="u-w-video" src="http://www.test.com/1.RM" autoplay="false" poster="http://www.test.com/1.jpg" onstart="$handlePageEvent('play',false,false)" onpause="$handlePageEvent('pause',false,false)" onfinish="$handlePageEvent('end',false,false)" ontimeupdate="$handlePageEvent('update',false,false)" onfullscreenchange="$handlePageEvent('screenchange',false,false)" onerror="$handlePageEvent('error',false,false)"></video>`

    rewriter.assertTemplateString(fixture, expected)
  })

})