import React, { FC } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Provider } from 'react-redux'
import SideBar from './components/SideBar'
import MainContentWraper from './components/MainContentWraper'
import { store } from './store/store'
import './styles.scss'

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container className="container__sidebar">
          <SideBar />
        </Container>
        <Container className="container__main App">
          <MainContentWraper />
        </Container>
      </Router>
    </Provider>
  )
}

export default App
