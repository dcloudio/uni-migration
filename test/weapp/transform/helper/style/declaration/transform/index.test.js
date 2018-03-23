const rewriter = require('../../../util')

describe('style.declaration.transform', () => {

  it('rewrite `transform`', () => {
    const fixture = `
.test1{
  transform: rotateX(50deg);
}
.test2{
  transform: rotate(0deg);
}
.test3{
  transform: translateX(50%);
}
.test4{
  transform: scaleX(1.5);
}
.test5{
  transform: translateZ(50px);
}
`

    const expected = `.test1{transform:rotateX(50deg);}.test2{transform:rotate(0deg);}.test3{}.test4{transform:scaleX(1.5);}.test5{}`

    rewriter.assertStyleString(fixture, expected)
  })

})