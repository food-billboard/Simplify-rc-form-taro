import Taro, { Component } from '@tarojs/taro'
import { Block } from '@tarojs/components'
import { createFieldsStore, getAllFieldsStoreName, deleteFieldsStore } from './fieldsStore'

export default class extends Component {

  fieldsStore

  constructor() {
    super(...arguments)
    this.init()
  }

  componentWillReceiveProps(props) {
    const { options={} } = this.fieldsStore
    if(options.mapPropsToFields) {
      this.fieldsStore.setFields(options.mapPropsToFields(props))
    }
  }

  init() {
    if(!this.props.name) return
    this.fieldsStore = createFieldsStore(this.props.name)
    this.fieldsStore.setProps(this.props)
  }

  render() {

    return (
      <Block>
        {
          this.props.children
        }
      </Block>
    )
  }

}

export {
  createFieldsStore, 
  getAllFieldsStoreName, 
  deleteFieldsStore
}