import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { resetPassword } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { showErrorToast } from '../utils/toast'
import { useTranslation } from 'react-i18next'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

function ResetPassword() {
  const [email, setEmail] = useState('')
  const [confirmCode, setConfirmCode] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t,i18n } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  const submitResetPassword = async (event) => {
    event.preventDefault()
    dispatch(resetPassword({ email })).then((res) => {
      if (!res.error) {
        setShowModal(true)
      } else {
        showErrorToast(res.error.message)
      }
    })
  }

  const submitConfirmCode = async (event) => {
    console.log(confirmCode)
    navigate('/new-password')
  }

  return (
    <>
      <div className="w-100 d-flex justify-content-center align-items-center flex-column my-3">
        <h2>{t('reset')}</h2>
        <form className="checkout-form" onSubmit={submitResetPassword}>
          <div class="row">
            <div class="col mb-3 ">
              <label for="email">
                {t('address')}
                <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                required
                class="form-control mt-2"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              className="confirm-button mt-3"
              onSubmit={submitResetPassword}
            >
              <span className="label-btn">{t('send')}</span>
            </button>
          </div>
        </form>
      </div>

      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body style={{
          direction:  i18n.languages[0] === 'ar' ? 'rtl' : 'ltr'
        }}>
          <Form onSubmit={submitConfirmCode}>
            <Form.Group>
              <Form.Label>Code</Form.Label>
              <Form.Control
                required
                autoFocus
                className="form-control mt-2"
                value={confirmCode}
                onChange={(event) => setConfirmCode(event.target.value)}
              />
            </Form.Group>
            <button
              type="submit"
              className="confirm-button mt-3"
              onSubmit={submitConfirmCode}
            >
              <span className="label-btn">{'Next'}</span>
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ResetPassword
