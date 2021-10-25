import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { Col } from 'react-bootstrap'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createAsyncGroup } from '../store/asyncActions/asyncGroupActions'
import { showAllNote, showCreateNoteForm } from '../store/actions/noteActions'
import { selectActiveGroup } from '../store/actions/groupActions'
import Avatar from './Avatar'
import Loader from './Loader'
import './styles/SideBar.scss'

const SideBar: React.FC = () => {
  const dispatch = useDispatch()
  const [showAddGroupForm, setShowAddGroupForm] = useState(false)
  const [groupVal, setGroupVal] = useState('')

  const { showCeateNoteForm, groups, selectedGroup, loading } = useTypeSelector((state) => state)

  const inputRef = useRef<HTMLInputElement>(null)

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

  const showAllNotesHandler = () => {
    dispatch(showAllNote())
    // dispatch(selectActiveGroup('All'))
  }

  const groupList = groups.map((g) => <button type="button" onClick={() => dispatch(selectActiveGroup(g.id))} key={g.id} className={selectedGroup === g.id ? 'sideBar__btn_group-cheked' : 'sideBar__btn_group'}>{g.title}</button>)

  const groupAddForm = showAddGroupForm? (
      <>
        <input ref={inputRef} value={groupVal} onChange={(e) => setGroupVal(e.target.value)} type="text" className="sideBar__input_add" />
        <button type="button" disabled={isDisabled} onClick={addNewGroup} className="sideBar__btn_group_add">ADD</button>
        <button type="button" onClick={() => setShowAddGroupForm(false)} className="sideBar__btn_group_add sideBar__btn_group_add-back">back</button>
      </>
    )
    : <button type="button" onClick={showGroupFormHandler} className="sideBar__btn_group">Add Group</button>

  return (
    <Col className="sideBar__container">
      <Avatar />

      <Link to="/note/create" className={`sideBar__btn_notes ${showCeateNoteForm && 'sideBar__btn_notes-all-cheked'}`} onClick={() => dispatch(showCreateNoteForm())}>
        <FontAwesomeIcon icon={faPlus} />
        add Note
      </Link>

      <Link to="/" className={`sideBar__btn_notes sideBar__btn_notes-all ${selectedGroup === 'All' && 'sideBar__btn_notes-all-cheked'}`} onClick={showAllNotesHandler}>
        My notes
      </Link>

      {
        !loading ? 
          <>
            {groupList}
            {groupAddForm}
          </> 
        :
          <Loader />
      }

    </Col>
  )
}

export default SideBar