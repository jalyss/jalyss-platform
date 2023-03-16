import React, { useState } from 'react'
import DocumentMeta from 'react-document-meta'
import { useTranslation } from 'react-i18next'
import useMeta from '../hooks/useMeta'
import '../assets/styles/checkout.css'
import { useCart } from 'react-use-cart'
import { createCommand, fetchCommands } from '../store/command'
import { useDispatch } from 'react-redux'
import { showErrorToast, showSuccessToast } from '../utils/toast'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

function Checkout({ }) {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const [clientAddress, setClientAddress] = useState('')
  const [clientName, setClientName] = useState('')
  const [country, setCountry] = useState('')
  const [clientTel, setClientTel] = useState('')
  const [city, setCity] = useState('')
  const [delivered, setDelivered] = useState('')

  const { items, cartTotal, updateItemQuantity } = useCart()
  console.log('items', items);
  const submitCommand = async (event) => {
    event.preventDefault();
    const commandLine = items.map((item, i) => ({
      articleByBranchId: item.id,
      quantity: item.quantity
    })) 
    dispatch(createCommand({
      clientName,
      clientTel,
      clientAddress,
      commandLine
      //plz add the check box of hasDelivery
      //country,  // this must be Id
      //city // this must be Id
    }))
      .then(res => {
        if (!res.error) {
          showSuccessToast(t('command.created'))
          // must show the facture navigate to other page to see the command
        } else {
          console.log(res);
          showErrorToast(res.error.message)
        }
      }
      )
  };

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
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}

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
              value={clientTel}
              onChange={(event) => setClientTel(event.target.value)}
            />
          </div>
          <div class="col mb-3 ">
            <label for="clientAddress">العنوان<span style={{ color: 'red' }}>*</span></label>
            <input
              required
              class="form-control mt-2"
              id="clientAddress"
              value={clientAddress}
              onChange={(event) => setClientAddress(event.target.value)}
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3 ">
            <label for="country">البلد</label>
            <input
              // this must be autocomplete or select from array of country fetched from database
              type="tel"
              class="form-control mt-2"
              id="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
          </div>
          <div class="col mb-3 ">
            <label for="city">المدينة</label>
            <input
              // this must be autocomplete or select from array of country fetched from database
              class="form-control mt-2"
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
        </div>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="delivered" control={<Radio />} label="Delivery" />
          <FormControlLabel value="notDelivered" control={<Radio />} label="Not Delivery" />

        </RadioGroup>


        <div className="w-100 d-flex justify-content-center">
          <button
            type='submit'
            className="confirm-button mt-3"
            onClick={submitCommand}
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
