import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTypeSelector } from '../hooks/useTypeSelector'
import './styles/NotesItemSelect.scss'

interface IParams {
  noteId: string
}

const NotesItemSelect: React.FC = () => {
  const history = useHistory()
  const { noteId } = useParams<IParams>()
  const { notes } = useTypeSelector((state) => state)
  const note = notes.filter((item) => item.id === Number(noteId))[0]
console.log(history)
  return (
    <div className="notesItemSelect__container">
      <div>
        <div className="notesItemSelect__container-title-container">
          <h2 className="notesItemSelect__container-title">{notes.length && note.title}</h2>
          <button
            type="button"
            className="notesItemSelect__container-title_btn-edit"
            onClick={() => history.push(`/note/edit/${note.id}`)}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <div className="notesItemSelect__container-md-container">
          <MarkdownPreview source={note.text} />
        </div>
      </div>
      <div className="notesItemSelect__container_tags">
        {notes.length &&
          note.tags &&
          note.tags.map((tag) => (
            <p key={tag + note.title} className="notesItemSelect__container_tags-tag">{`#${tag}`}</p>
          ))}
      </div>
    </div>
  )
}

export default NotesItemSelect
