import { Component, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import Taro from '@tarojs/taro';
import '@nutui/nutui-react/dist/style.css';
import configStore from './store';
import 'taro-ui/dist/style/index.scss';
import './app.scss';
import './assets/css/global.scss';
import LanguageContext from './context/language-context';
import LanguageList from './language/load_language';
const store = configStore();

class App extends Component<PropsWithChildren> {
  constructor(props) {
    super(props);
    this.state = {
      language: 'cn',
      messages: LanguageList['cn'],
    };
  }
  setLanguage(language) {
    this.setState({
      language,
      messages: LanguageList[language],
    });
  }

  componentDidMount() {
    Taro.setStorage({
      key: 'isShowGetPhone',
      data: 0,
    });
  }

  componentDidShow() {}

  componentDidHide() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <LanguageContext.Provider
          value={{ language: this.state.language, setLanguage: (language) => this.setLanguage(language), messages: this.state.messages }}
        >
          {this.props.children}
        </LanguageContext.Provider>
      </Provider>
    );
  }
}

export default App;
