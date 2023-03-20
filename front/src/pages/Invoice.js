import React from 'react'




function Invoice() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <div className="invoice">

        <div className="invoice-header">

          <div>
            <ul>
              <li>
                <button onClick={handlePrint}>
                  Print
                </button>
              </li>
            </ul>

          </div>

          <h2>Invoice #12345</h2>
          <p>Date: 15 March 2023</p>
        </div>
        <div className="invoice-body">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Product 1</td>
                <td>2</td>
                <td>$10</td>
                <td>$20</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>1</td>
                <td>$15</td>
                <td>$15</td>
              </tr>
              <tr>
                <td>Product 3</td>
                <td>3</td>
                <td>$20</td>
                <td>$60</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="invoice-footer">
          <p>Total: $95</p>
          <p>Thank you for your business!</p>
        </div>
      </div>
    </>


  );
};
export default Invoice