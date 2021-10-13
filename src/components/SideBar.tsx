import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Col } from 'react-bootstrap'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { getAsyncGroup, getAsyncNotes, createAsyncGroup, authCheck } from '../store/asyncActions'
import { showAllNote, showCreateNoteForm, selectActiveGroup } from '../store/actions'
import Avatar from './Avatar'
import Loader from './Loader'
import './styles/SideBar.scss'
import { socketRef } from '../http/socket-io'

const SideBar: React.FC = () => {
  const dispatch = useDispatch()
  const [showAddGroupForm, setShowAddGroupForm] = useState(false)
  const [groupVal, setGroupVal] = useState('')

  const { groups, selectedGroup, user, showCeateNoteForm, loading } = useTypeSelector((state) => state)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    dispatch(authCheck())
  }, [dispatch])

  useEffect(() => {
    if (user.isLogin) {
      dispatch(getAsyncGroup())
      dispatch(getAsyncNotes())

      socketRef.emit('joinRoom', user.id?.toString())
      // console.log(socketRef)
    }
  }, [user.isLogin])

  const isDisabled = !groupVal.length

  const addNewGroup = () => {
    setShowAddGroupForm(false)
    setGroupVal('')
    dispatch(createAsyncGroup(groupVal))
  }

  const showGroupFormHandler = () => {
    inputRef.current?.focus()
    setShowAddGroupForm(true)
  }

  const groupList = groups.map((g) => (
    <button
      type="button"
      onClick={() => dispatch(selectActiveGroup(g.id))}
      key={g.id}
      className={selectedGroup === g.id ? 'sideBar__btn_group-cheked' : 'sideBar__btn_group'}
    >
      {g.title}
    </button>
  ))

  const groupAddForm = showAddGroupForm ? (
    <>
      <input
        ref={inputRef}
        value={groupVal}
        onChange={(e) => setGroupVal(e.target.value)}
        type="text"
        className="sideBar__input_add"
      />
      <button type="button" disabled={isDisabled} onClick={addNewGroup} className="sideBar__btn_group_add">
        ADD
      </button>
      <button
        type="button"
        onClick={() => setShowAddGroupForm(false)}
        className="sideBar__btn_group_add sideBar__btn_group_add-back"
      >
        back
      </button>
    </>
  ) : (
    <button type="button" onClick={showGroupFormHandler} className="sideBar__btn_group">
      Add Group
    </button>
  )

  return (
    <Col className="sideBar__container">
      <Avatar />

      <Link
        to="/note/create"
        className={`sideBar__btn_notes ${showCeateNoteForm && 'sideBar__btn_notes-all-cheked'}`}
        onClick={() => dispatch(showCreateNoteForm())}
      >
        <FontAwesomeIcon icon={faPlus} />
        add Note
      </Link>

      <Link
        to="/"
        className={`sideBar__btn_notes sideBar__btn_notes-all ${
          selectedGroup === 'All' && 'sideBar__btn_notes-all-cheked'
        }`}
        onClick={() => dispatch(showAllNote())}
      >
        My notes
      </Link>

      {!loading ? (
        <>
          {groupList}
          {groupAddForm}
        </>
      ) : (
        <Loader />
      )}
    </Col>
  )
}

export default SideBar
