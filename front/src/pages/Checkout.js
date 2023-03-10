import React, { useState } from 'react'
import DocumentMeta from 'react-document-meta'
import { useTranslation } from 'react-i18next'
import useMeta from '../hooks/useMeta'
import '../assets/styles/checkout.css'
import { useCart } from 'react-use-cart'

function Checkout() {
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')

  const { items, cartTotal, updateItemQuantity } = useCart()

  return (
    <div className="d-flex p-4">
      <form className="checkout-form">
        <div class="row">
          <div class="col mb-3 ">
            <label for="firstname">الاسم </label>
            <input
              class="form-control mt-2"
              required
              id="firstname"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
          </div>

        </div>

        <div class="row">
          <div class="col mb-3 ">
            <label for="phone">الهاتف</label>
            <input
              required
              type="tel"
              class="form-control mt-2"
              id="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
          <div class="col mb-3 ">
            <label for="city">المدينة</label>
            <input
              class="form-control mt-2"
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label for="email">عنوان البريد</label>
            <input
              required
              type="email"
              class="form-control mt-2"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <button
            className="confirm-button mt-3"
            onClick={() => null}
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
