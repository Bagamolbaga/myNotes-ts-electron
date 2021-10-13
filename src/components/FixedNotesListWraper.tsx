import React, { useState } from 'react'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NotesList from './NotesList'

const FixedNotesListWraper: React.FC = () => {
  const { notes } = useTypeSelector((state) => state)

  const [showFixedList, setShowFixedList] = useState(true)

  const fixedNotesLength = notes.filter((note) => note.fixed).length

  const btnShowFixRotate = showFixedList ? 'rotateBtnShowList' : ''

  return (
    <>
      <div className="notesList__fixed_container-stats" onClick={() => setShowFixedList(!showFixedList)}>
        <p className="notesList__fixed_title">{`Fixed notes ${fixedNotesLength} / 4`}</p>
        <button
          type="button"
          className={`notesList__fixed_btn-showFixedList ${btnShowFixRotate}`}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </div>
      { showFixedList && <NotesList isFixedList /> }
      { showFixedList && <div className="notesList__fixed_bottom-line" /> }
    </>
  )
}

export default FixedNotesListWraper