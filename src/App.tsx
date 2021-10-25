import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import SideBar from './components/SideBar'
import MainContentWraper from './components/MainContentWraper'
import { useTypeSelector } from './hooks/useTypeSelector'
import { authCheck } from './store/asyncActions/asyncUserActions'
import { getAsyncGroup } from './store/asyncActions/asyncGroupActions'
import { getAsyncNotes } from './store/asyncActions/asyncNoteActions'
import { useDispatch } from 'react-redux'
import { socketRef } from './http/socket-io'
import './styles.scss'

function App() {
  const { user } = useTypeSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authCheck())
  }, [])

  useEffect(() => {
    if (user.isLogin) {
      dispatch(getAsyncGroup())
      dispatch(getAsyncNotes())

      socketRef.emit('joinRoom', user.id!.toString())
    }
  }, [user.isLogin])

  return (
    <>
      <Container className="container__sidebar">
        <SideBar />
      </Container>
      <Container className="container__main App">
        <MainContentWraper />
      </Container>
    </>
  )
}

export default App
