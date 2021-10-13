import React from 'react'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { Switch, Route, Redirect } from 'react-router'
import { Col } from 'react-bootstrap'
import ContentHeader from './ContentHeader'
import Search from './Search'
import BtnGoBack from './BtnGoBack'
import NotesList from './NotesList'
import NotesItemSelect from './NotesItemSelect'
import NoteCreateForm from './NoteCreateForm'
import Authorization from './Authorization'
import NoteEditForm from './NoteEditForm'
import FixedNotesListWraper from './FixedNotesListWraper'
import ResetPassword from './ResetPassword'
import './styles/MainContentWraper.scss'
import './styles/NotesList.scss'

const MainContentWraper: React.FC = () => {
  const { user } = useTypeSelector((state) => state)

  return (
    <Col className="mainContentWraper">
    <ContentHeader />
    <BtnGoBack />
    <div className="notesList__main_container">
      {
        user.isLogin ? 
          (
            <Switch>
              <Route exact path="/">
                <Search />
                <FixedNotesListWraper />
                <NotesList />
              </Route>
              <Route path="/registration">
                <Authorization isReg />
              </Route>
              <Route path="/login">
                <Authorization />
              </Route>
              <Route path="/user/reset-password/:tokenId">
                <ResetPassword />
              </Route>
              <Route path="/note/create">
                <NoteCreateForm />
              </Route>
              <Route exact path="/note/:noteId">
                <NotesItemSelect />
              </Route>
              <Route exact path="/note/edit/:noteId">
                <NoteEditForm />
              </Route>
              <Route path="/search">
                <NotesList search />
              </Route>
            </Switch>
          ) : 
          (
            <Switch>
              <Route path="/registration">
                <Authorization isReg />
              </Route>
              <Route path="/login">
                <Authorization />
              </Route>
              <Route path="/user/reset-password/:tokenId">
                <ResetPassword />
              </Route>
              <Redirect to="/login" />
            </Switch>
          )
      }
    </div>
  </Col>
  )
}

export default MainContentWraper;