const chai = require('chai')
const expect = chai.expect

require('./util')

describe('platform', () => {

  it('`Behavior`', () => {
    const b1 = Behavior({
      properties: {
        myBehaviorProperty: {
          type: Number
        }
      },
      data: {
        myBehaviorData: {
          test: 2
        },
        myBehaviorData1: {
          test: 2
        }
      },
      attached: function () {
        console.log('b1 attached')
      },
      methods: {
        myBehaviorMethod: function () {}
      }
    })
    const b2 = Behavior({
      properties: {
        myBehaviorProperty: {
          type: String
        },
        myBehaviorProperty1: {
          type: Number
        }
      },
      data: {
        myBehaviorData: {
          test: 1
        }
      },
      created: function () {
        console.log('b2 created')
      },
      attached: function () {
        console.log('b2 attached')
      },
      methods: {
        myBehaviorMethod2: function () {}
      }
    })

    const module = {
      exports: {}
    }
    const c1 = Component({
      behaviors: [b1, b2],
      properties: {
        myProperty: { // 属性名
          type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
          value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
          observer: function (newVal, oldVal) {} // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        },
        myProperty2: String // 简化的定义方式
      },
      data: {}, // 私有数据，可用于模版渲染

      // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
      attached: function () {
        console.log('c1 attached')
      },
      moved: function () {},
      detached: function () {
        console.log('c1 detached')
      },

      methods: {
        onMyButtonTap: function () {
          this.setData({
            // 更新属性和数据的方法与更新页面数据的方法类似
          })
        },
        _myPrivateMethod: function () {
          // 内部方法建议以下划线开头
          this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
          this.applyDataUpdates()
        },
        _propertyChange: function (newVal, oldVal) {

        }
      }
    }, {
      path: 'page/common/component/test',
      module: module,
      exports: exports,
      $app_require$: {},
      wxs: typeof _$wxs$_ === 'undefined' ? {} : _$wxs$_
    })
    expect(b2.properties.myBehaviorProperty.type).eql(String)
    expect(b2.data.myBehaviorData.test).eql(1)
    expect(module.exports.attached.length).eql(3)
  })

})