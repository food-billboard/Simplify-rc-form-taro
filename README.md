# Simplify-rc-form-taro
这是照着rc-form写的一个简化版的form组件
## rc-form地址：https://github.com/react-component/form.git
上面有一小部分功能与rc-form基本一致，由于Taro小程序的相关限制，有一些功能没有办法实现

## API

### BaseForm

表单集合父元素
#### props: 
* restProps: 额外props
* name: 表单的名称（必填，与对应的createFieldsStore参数name相同）

```javascript
  import { BaseForm, createFieldsStore } from './src'
  import Taro from '@tarojs/taro'
  import { View, Input } from '@tarojs/components'
  const fieldsStore = createFieldsStore('form')
  class Com extends Taro.Component{
    //因为Taro不支持...运算符, 所以需要自行获取相关的属性
    render() {
      <View>
        <BaseForm
          name='form'
        >
          <View>
            <Input
              onInput={fieldsStore.getFieldsProps('input', 'onChange', {
                initialValue: 'hello world'
                rules=[{
                  required: true
                }]
              })}
              onInput={fieldsStore.getFieldValue('input')}
            />
          </View>
        </BaseForm>
      </View>
    }
  }
```
### createFieldsStore
* 创建表单字段的存储store
``createFieldsStore(name, options, fields)``

* name 与表单字段对应的名称

*  options 相关配置(功能与rc-form类似)
  {validateMessages, onFieldsChange, onValuesChange, mapPropsToFields}

* fields 可先行向store中预放初始值

```javascript
let store = createFieldsStore('form')
/*
  store (功能与rc-form类似)
  {
    getFieldsValue
    getFieldValue
    setFieldsValue
    setFields
    setFieldsInitialValue
    getFieldProps
    getFieldsError
    validateFields
    resetFields
    getOnChangeValue  
    initializeFields
    setUpdate 
    setProps
  }
*/

```

### deleteFieldsStore
* 删除store
``deleteFieldsStore(name)``

### getAllFieldsStoreName
* 获取所有的store名称
``getAllFieldsStoreName(name)``

### ps
* 因为小程序端会重新处理事件对象，所以在获取相应的表单值时会有不同，用户可以通过自定义获取值得方式改变onChange

```javascript
  //单一修改
  getFieldProps('name', undefined, {
    getOnChangeValue: function(e) {
      return e
    }
  })
  //或者统一修改
  let store = createFieldsStore('form')
  store.getOnChangeValue = function(e) {
    return e
  }
```
* 关于Taro
  taro原生表单的获取value都是通过e.target.value
  taro-ui中的表单获取value的事件结果直接为value，除了textarea为e.target.value, picker为e.detail.value

## 相关依赖
  async-validator

诸多不足，见谅


