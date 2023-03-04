import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import '@nutui/nutui-react/dist/style.css'
import configStore from './store'
import 'taro-ui/dist/style/index.scss'
import './app.scss'
import './assets/css/global.scss'

const store = configStore()

class App extends Component<PropsWithChildren> {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
