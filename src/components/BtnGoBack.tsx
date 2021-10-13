import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { goBack } from '../store/actions'

const BtnGoBack: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useTypeSelector((state) => state)

  const goBackHandler = () => {
    dispatch(goBack())
    history.push('/')
  }  

  return (
    <>
      { user.isLogin && (location.pathname !== '/')
            && (
            <button
              type="button"
              className="notesList__back"
              onClick={goBackHandler}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            )}
    </>
  )
}

export default BtnGoBack