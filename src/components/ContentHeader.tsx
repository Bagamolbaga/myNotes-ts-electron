import React from 'react'
import { Row } from 'react-bootstrap'
import { useTypeSelector } from '../hooks/useTypeSelector'
import './styles/ContentHeader.scss'

const ContentHeader: React.FC = () => {
  const allNotes = useTypeSelector((state) => state.notes).length
  return (
    <Row className="contentHeader__container">
      <h1 className="contentHeader__container-title">My Notes</h1>
      <p className="contentHeader__container-stats">
        All notes |
        {' '}
        {allNotes}
      </p>
    </Row>
  )
}

export default ContentHeader