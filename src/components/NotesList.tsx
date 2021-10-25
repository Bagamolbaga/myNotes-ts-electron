import React from 'react'
import { useLocation } from 'react-router-dom'
import { useTypeSelector } from '../hooks/useTypeSelector'
import Loader from './Loader'
import NotesItem from './NotesItem'
import './styles/NotesList.scss'

interface NotesListProps {
    search?: boolean
    isFixedList?: boolean
}

const NotesList: React.FC<NotesListProps> = ({ search, isFixedList }) => {
  const { notes, selectedGroup, loading} = useTypeSelector((state) => state)

  const query = new URLSearchParams(useLocation().search)

  let filteredNotes
  if (search) {
    filteredNotes = notes.filter((note) => {
        const q = query.get('term')
        return note.title && note.text && note.tags && q !== null ? (note.title.toLowerCase().includes(q) || note.text.toLowerCase().includes(q) || note.tags.join(' ').toLowerCase().includes(q)) : false
    })
  } else if (isFixedList) {
    filteredNotes = notes.filter((note) => note.fixed)
  } else {
    filteredNotes = notes.filter((item) => (selectedGroup !== 'All' && selectedGroup === item.group_id ? item : selectedGroup === 'All' ? item : null))
  }

  return (
    
      !loading ? 
        (
          <div className={isFixedList ? 'notesList__container-fixed' : 'notesList__container'}>
            { filteredNotes.map((note) => <NotesItem key={note.id} data={note} />) }
          </div>
        )
        :
        <div className="notesList__container-loader">
          <Loader />
        </div>
    
  )
}

export default NotesList