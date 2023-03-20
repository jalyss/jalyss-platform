import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DocumentMeta from 'react-document-meta'
import { useTranslation } from 'react-i18next'
import useMeta from '../hooks/useMeta'
import '../assets/styles/checkout.css'
import { useCart } from 'react-use-cart'
import { createCommand, fetchCommands } from '../store/command'
import { useDispatch, useSelector } from 'react-redux'
import { showErrorToast, showSuccessToast } from '../utils/toast'
import { FormControlLabel, Radio } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { fetchCountries } from '../store/country'
import { fetchCities } from '../store/city'


function Checkout({ }) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {invoiceId}=useParams()
  const countryStore = useSelector((state) => state.country)
  const cityStore = useSelector((state) => state.city)
  const commandStore = useSelector((state) => state.command)
  const { items, cartTotal, updateItemQuantity } = useCart()

  const [command, setCommand] = useState({ hasDelivery: true })

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])
  useEffect(() => {
    if (command.countryId)
      dispatch(fetchCities(command?.countryId))
  }, [command?.countryId])

  useEffect(() => {
    const commandLine = items.map((item, i) => ({
      articleByBranchId: item.id,
      quantity: item.quantity
    }))
    setCommand({ ...command, commandLine })
  }, [items])
  const handleChange = (e) => {
    const { name, value } = e.target
    setCommand((Command) => ({ ...Command, [name]: value }))
  }
  const handleChecked = (e) => {
    const { checked } = e.target
    setCommand((Command) => ({ ...Command, hasDelivery: checked }))
  }

  const submitCommand = async (event) => {
    event.preventDefault();
    dispatch(createCommand(command))
      .then(res => {
        if (!res.error) {
          showSuccessToast(t('command.created'))
          navigate(`invoice/${invoiceId}`)
          // must show the facture navigate to other page to see the command

        } else {
          console.log(res);
          showErrorToast(res.error.message)
        }
      }
      )
  };

  useEffect(() => {
    if (commandStore.command) {
      navigate(`/command/${commandStore.command.id}`)
    }
  }, [commandStore.command])
  console.log(commandStore.command);
  return (
    <div className="d-flex p-4">
      <form className="checkout-form" onSubmit={submitCommand}>
        <div class="row">
          <div class="col mb-3 ">
            <label for="clientName" >الاسم <span style={{ color: 'red' }}>*</span></label>

            <input
              class="form-control mt-2"
              required
              id="clientName"
              value={command?.className}
              name='clientName'
              onChange={handleChange}

            />

          </div>

        </div>

        <div class="row">
          <div class="col mb-3 ">
            <label for="clientEmail" >بريد إلكتروني <span style={{ color: 'red' }}>*</span></label>

            <input
              class="form-control mt-2"
              required
              id="clientEmail"
              value={command?.clientEmail}
              name='clientEmail'
              onChange={handleChange}

            />

          </div>

        </div>


        <div class="row">
          <div class="col mb-3 ">
            <label for="clientTel">الهاتف<span style={{ color: 'red' }}>*</span></label>
            <input
              required
              type="tel"
              class="form-control mt-2"
              id="clientTel"
              value={command?.clientTel}
              name='clientTel'
              onChange={handleChange}
            />
          </div>
          <div class="col mb-3 ">
            <label for="clientAddress">العنوان<span style={{ color: 'red' }}>*</span></label>
            <input
              required
              name='clientAddress'
              class="form-control mt-2"
              id="clientAddress"
              value={command?.clientAddress}
              onChange={handleChange}
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3 ">
            <label for="country">البلد</label>
            <select
              name='countryId'
              class="form-control mt-2"
              id="country"
              value={command?.countryId}
              onChange={handleChange}>
              <option value={null} >--حدد الدولة--</option>
              {countryStore.countries.items.map(item => (

                <option value={item.id} >{item.nameAr}</option>

              ))}

            </select>
          </div>

          <div class="col mb-3 ">
            <label for="city">المدينة</label>
            <select
              name='cityId'
              class="form-control mt-2"
              id="city"
              value={command?.cityId}
              onChange={handleChange}
            >
              <option value={null}>--حدد الدولة--</option>
              {cityStore.cities.items.map(item => (
                <option value={item.id}>{item.nameAr}</option>
              ))}


            </select>
          </div>
        </div>
        <label for="delivery">{t('checkout.delivery.label')}</label>
        <input type='checkbox' id='delivery' checked={command?.hasDelivery} onChange={handleChecked} />

        <div className="w-100 d-flex justify-content-center">

          <button

            type='submit'
            className="confirm-button mt-3"
            onSubmit={submitCommand}

            disabled={items.length === 0 ? true : false}
          >

            <span className="label-btn">اتمام الطلب</span>
          </button>

        </div>
      </form>

      <div className="cart-container">
        <div className="container h-min-content py-initial">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="h5">
                        سلة الشراء
                      </th>

                      <th scope="col">الكمية</th>
                      <th scope="col">الثمن</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr>
                        <th scope="row">
                          <div className="flex-column ms-4">
                            <p className="mb-2">{item.article.title}</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.article.cover.path}
                              className="img-fluid rounded-3"
                              alt={item.article.cover.alt}
                            />
                          </div>
                        </th>

                        <td className="align-middle">
                          <div className="d-flex flex-row">
                            <button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>
                            <input
                              id="form1"
                              min="0"
                              name="quantity"
                              value={item.quantity}
                              type="number"
                              className="form-control form-control-sm"
                            />
                            <button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="mb-0">TND {item.price}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between w-100">
            <span className="label">الإجمالي</span>
            <span className="price-wrapper">{cartTotal}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
