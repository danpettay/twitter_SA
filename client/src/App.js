import React, { PureComponent } from 'react'
import './App.css'
import AppNavbar from './components/AppNavbar'
import TweetLoader from './components/TweetLoader'
import TweetProcessor from './components/TweetProcessor'
import TweetViewer from './components/TweetViewer'
import { Container } from 'reactstrap'
import { Provider } from 'react-redux'
import store from './store'
//StopWords

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <TweetLoader />
            <TweetProcessor />
            <TweetViewer />
          </Container>
        </div>
      </Provider>
    )
  }
}

export default App
