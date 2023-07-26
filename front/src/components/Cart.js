import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { BsBagXFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "../assets/styles/Cart.css"

function Cart({ handleClose }) {
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [quantityMap, setQuantityMap] = useState({});


  const handleUpdateQuantity = (itemId, newQuantity) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [itemId]: newQuantity,
    }));
    updateItemQuantity(itemId, newQuantity);
  };

  return (
    <div>
      <div className="mini-body-offCanvas">
        <div className="container h-min-content py-initial">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="table-responsive" style={{ maxHeight: "300px", overflowY: "auto" }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="h5">
                        {t('offCanvas.shop')}
                      </th>
                      <th scope="col">{t('offCanvas.quan')}</th>
                      <th scope="col">{t('offCanvas.price')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
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
                            <button onClick={() => handleUpdateQuantity(item.id, (quantityMap[item.id] || item.quantity) - 1)}>-</button>
                            <input
                    id="form1"
                    min="0"
                    name="quantity"
                    value={quantityMap[item.id] || item.quantity}
                    type="text"
                    style={{ width: "60px", textAlign: "center", fontSize: "14px" }} 
                    className="form-control form-control-sm cart-quantity-input" 
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                  />
                            <button onClick={() => handleUpdateQuantity(item.id, (quantityMap[item.id] || item.quantity) + 1)}>+</button>
                          </div>
                        </td>
                        <td className="align-middle">
                          <p className="mb-0">TND {item.price}</p>
                          <div>
                            <BsBagXFill type="button" size="30px" color="black" 
                              onClick={() => removeItem(item.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      <div >
        <div className="subtotal">
          <div>
            <span className="label">{t('offCanvas.total')} </span>
            <span className="price-wrapper">{cartTotal}</span>
          </div>
        </div>
      </div>
      </div>



      <div className="double-btn" style={{ position: "fixed", bottom: "10px", left: "10px" }}>
        <div>
          <button onClick={() => {
            handleClose();
            navigate('/checkout');
          }} className="offCanvas-btn1">
            <span className="label-btn">{t('offCanvas.checkout')}</span>
          </button>
        </div>
        <div>
          <button onClick={() => emptyCart()} className="offCanvas-btn2">
            <span className="label-btn"> {t('offCanvas.clear')} </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
