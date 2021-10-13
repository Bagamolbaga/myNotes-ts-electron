import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { createAsyncNote } from '../store/asyncActions'
import './styles/NoteCreateForm.scss'

const NoteCreateForm: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { selectedGroup, selectNoteId, showCeateNoteForm } = useTypeSelector((state) => state)

  const [title, setTitle] = useState('')
  const [md, setMd] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    selectNoteId && !showCeateNoteForm && history.push(`/note/${selectNoteId}`)
  }, [history, selectNoteId, showCeateNoteForm])

  const createNotehandler = () => {
    const tagsArray = tags.trim().split(' ')
    dispatch(
      createAsyncNote({
        title,
        text: md,
        tags: tagsArray
      })
    )
  }

  const isDisableBtnSave = title.length && md.length && selectedGroup !== 'All'

  return (
    <div className="noteCreateForm__container">
      <input
        className="noteCreateForm__container-title_input"
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        {/* <MarkdownEditor
          width="100%"
          height="400px"
          value={md}
          onChange={(editor: any, data: any, value: string) => setMd(value)}
        /> */}
      </div>
      <input
        className="noteCreateForm__container-title_input"
        type="text"
        placeholder="#tags..."
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="noteCreateForm__container-btn_save-container">
        <Button disabled={!isDisableBtnSave} onClick={createNotehandler} className="noteCreateForm__container-btn_save">
          SAVE
        </Button>
      </div>
    </div>
  )
}

export default NoteCreateForm
