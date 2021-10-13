import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { logout } from '../store/asyncActions'
import './styles/Avatar.scss'

const Avatar: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { user } = useTypeSelector((state) => state)
  const [showLogout, setShowLogout] = useState(false)

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    user.isLogin
      ? (
        <Row className="avatar__container">
          <div className="avatar__container__img_container">
            <img src={user.avatar} alt="avatar" />
          </div>
          <h2 onClick={() => setShowLogout(!showLogout)}>{user.name}</h2>
          <button
            type="button"
            className={`avatar__logout ${showLogout ? 'hidden' : ''}`}
            onClick={logoutHandler}
          >
            Logout
          </button>
        </Row>
      )
      : (
        <Row className="avatar__container">
          <div className="avatar__container__img_container">
            <img src="https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png" alt="avatar" />
          </div>
          <h2>You not login</h2>
        </Row>
      )
  )
}

export default Avatar