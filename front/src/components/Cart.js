import React from "react";
import { useCart } from "react-use-cart";

function Cart() {
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  return (
    <div>
      <div className="mini-body-offCanvas">
        <div className="container h-min-content py-initial">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="h5">
                        Shopping Bag
                      </th>

                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
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
                            <button onClick={()=> updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                            <input
                              id="form1"
                              min="0"
                              name="quantity"
                              value={item.quantity}
                              type="number"
                              className="form-control form-control-sm"
                            />
                            <button onClick={()=> updateItemQuantity(item.id, item.quantity + 1)}>+</button>
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
      </div>
      <div>
        <div className="subtotal">
          <div>
            <span className="label">Cart subtotal</span>

            <span className="price-wrapper">{cartTotal}</span>
          </div>
        </div>
      </div>

      <div className="double-btn">
        <div>
          <button className="offCanvas-btn1">
            <span className="label-btn">VIEW CART</span>
          </button>
        </div>
        <div>
          <button className="offCanvas-btn2"  onClick={()=> emptyCart()} disabled={items.length===0?true:false}>
            <span className="label-btn"> CHECKOUT </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
