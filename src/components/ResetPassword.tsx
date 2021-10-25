import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypeSelector';
import { resetPassword } from '../store/asyncActions/asyncUserActions'
import { Link } from 'react-router-dom' 
import { Row } from 'react-bootstrap';
import './styles/Authorization.scss'

interface IParams {
    tokenId: string
}

const ResetPassword: FC = () => {
    const dispatch = useDispatch()
    const { tokenId } = useParams<IParams>()
    const { authError } = useTypeSelector((state) => state)

    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')


    return (
        <Row className="authorization__container">
        <h2 className="authorization__container-title">Reset password</h2>
        <label className="authorization__container-label" htmlFor="login">New password</label>
        <input
          className="authorization__container-input"
          type="text"
          id="login"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="authorization__container-label" htmlFor="password">Repeat Password</label>
        <input
          className="authorization__container-input"
          type="password"
          id="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <p className="authorization__container-label-error">{authError}</p>
        <button
          type="button"
          className="authorization__container-btn"
          onClick={() => dispatch(resetPassword(tokenId, password))}
        >
          Reset
        </button>
        <p>
          Dont have account?
          <Link to="/registration"><span className="authorization__container-span"> Create account</span></Link>
        </p>
      </Row>
    )
}

export default ResetPassword;