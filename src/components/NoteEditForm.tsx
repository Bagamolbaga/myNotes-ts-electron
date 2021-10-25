import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { editAsyncNotes } from '../store/asyncActions/asyncNoteActions'
import QuillEditor from './QuillEditor'
import './styles/NoteCreateForm.scss'

interface IParams {
    noteId: string
}

const NoteEditForm: React.FC = () => {
  const { noteId } = useParams<IParams>()
  const history = useHistory()
  const dispatch = useDispatch()

  const { notes } = useTypeSelector((state) => state)
  const note = notes.filter((item) => item.id === Number(noteId))[0]

  const [title, setTitle] = useState(note ? note.title : '')
  const [editorValue, setEditorValue] = useState(note ? note.text : '')
  const [tags, setTags] = useState((note && note.tags) ? note.tags.join(' ') : '')

  const isDisableBtnSave = title && editorValue && tags

  const changeEditorHandler = (
    value: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setEditorValue(value);
  };

  const editHandler = () => {
    const tagsArray = tags && tags.trim().split(' ')
    dispatch(editAsyncNotes({ title, text: editorValue, tags: tagsArray }))
    history.push(`/note/${noteId}`)
  }

  return (
    <div className="noteCreateForm__container">
      <input
        className="noteCreateForm__container-title_input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
      <QuillEditor
          className="noteCreateForm__container-quillEditor"
          value={editorValue}
          onChangeHandler={changeEditorHandler}
        />
      </div>
      <input
        className="noteCreateForm__container-title_input"
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="noteCreateForm__container-btn_save-container">
        <Button
          disabled={!isDisableBtnSave}
          onClick={editHandler}
          className="noteCreateForm__container-btn_save"
        >
          EDIT
        </Button>
      </div>
    </div>
  )
}

export default NoteEditForm