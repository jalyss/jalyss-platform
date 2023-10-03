import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommand } from "../store/command";

function Invoice() {
  const componentRef = useRef();
  const commandStore = useSelector((state) => state.command);
  const { invoiceId } = useParams();
  const dispatch = useDispatch();
  const [Total, setTotal] = useState([])
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(fetchCommand(invoiceId));
  }, []);

  useEffect(() => {
    if (commandStore.command) {
      const newTotal = commandStore.command.commandLine.map(
        (item) => item?.quantity * item?.articleByBranch?.price
      );
      setTotal(newTotal);
    }
  }, [commandStore.command]);

  const sum = () => {
    let res = 0
    Total.map((e, i) => {
      res += e
    })
    return res
  }

  return (
    <>

      <div class="page-tools">
        <div class="action-buttons">
          <button
            onClick={handlePrint}
            class="btn bg-white btn-light mx-1px text-95"
          >
            <i class="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
            Print
          </button>
        </div>
      </div>
      <div ref={componentRef}>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div class="page-content container">
        
          <div class="container px-0">
            <div class="row mt-4">
              <div class="col-12 col-lg-12">
                <div class="row">
                  <div class="col-12">
                    <div class="text-center text-150 bg-purple">
                      <i>
                        <img src="https://jalyss.com/img/prestashop-logo-1610973135.jpg" />
                      </i>
                    </div>
                  </div>
                </div>
                <hr class="row brc-default-l1 mx-n1 mb-4" />
                <div class="row">
                  <div class="col-sm-6">
                    <div>
                      <span class="text-sm text-grey-m2 align-middle">To:</span>
                      <span class="text-600 text-110 text-blue align-middle">
                        {commandStore.command?.clientName}
                      </span>
                    </div>
                    <div class="text-grey-m2">
                      <div class="my-1">
                        Street, {commandStore.command?.city?.nameAr}
                      </div>
                      <div class="my-1">
                        State, {commandStore.command?.country?.nameAr}
                      </div>
                      <div class="my-1">
                        <i class="fa fa-phone fa-flip-horizontal text-secondary"></i>{" "}
                        <b class="text-600">
                          {commandStore.command?.clientTel}
                        </b>
                      </div>
                    </div>
                  </div>

                  <div class="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                    <hr class="d-sm-none" />
                    <div class="text-grey-m2">
                      <div class="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                        Invoice
                      </div>

                      <div class="my-2">
                        <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                        <span class="text-600 text-90">ID:</span>
                        #111-222
                      </div>

                      <div class="my-2">
                        <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                        <span class="text-600 text-90">Issue Date:</span>
                        {commandStore.command?.createdAt.slice(0, 10)}{" "}
                        {commandStore.command?.createdAt.slice(11, 18)}
                      </div>

                      <div class="my-2">
                        <i class="fa fa-circle text-blue-m2 text-xs mr-1"></i>{" "}
                        <span class="text-600 text-90">Has Delivery:</span>
                        {commandStore.command?.hasDelivery ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="row text-600 text-white bgc-default-tp1 py-25">
                    <div class="d-none d-sm-block col-1">#</div>
                    <div class="col-9 col-sm-5">Description</div>
                    <div class="d-none d-sm-block col-4 col-sm-2">Qty</div>
                    <div class="d-none d-sm-block col-sm-2">Unit Price</div>
                    <div class="col-2">Amount</div>
                  </div>
                  {commandStore.command?.commandLine.map((item, index) => (
                    <div className="text-95 text-secondary-d3" key={index}>
                      <div className="row mb-2 mb-sm-0 py-25">
                        <div className="d-none d-sm-block col-1">{index + 1}</div>
                        <div className="col-9 col-sm-5">{item?.articleByBranch?.article?.title}</div>
                        <div className="d-none d-sm-block col-2">{item?.quantity}</div>
                        <div className="d-none d-sm-block col-2 text-95">{item?.articleByBranch?.price}</div>
                        <div className="col-2 text-secondary-d2">{item?.quantity * item?.articleByBranch?.price}</div>
                      </div>
                    </div>
                  ))}

                  <div class="row border-b-2 brc-default-l2"></div>

                  <div class="row mt-3">
                    <div class="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
                      Extra note such as company or payment information...
                    </div>

                    <div class="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
                      <div class="row my-2">
                        <div class="col-7 text-right">SubTotal</div>
                        <div class="col-5">
                          <span class="text-120 text-secondary-d1">
                            {sum()} TND

                          </span>
                        </div>
                      </div>

                      <div class="row my-2">
                        <div class="col-7 text-right">Shipping Cost:</div>
                        <div class="col-5">
                          <span class="text-110 text-secondary-d1">{commandStore.command?.hasDelivery?7:0}  TND</span>
                        </div>
                      </div>

                      <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                        <div class="col-7 text-right">Total Amount</div>
                        <div class="col-5">
                          <span class="text-150 text-success-d3 opacity-2">
                          {sum() + (commandStore.command?.hasDelivery?7:0)}{" "}
                            TND
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <span class="text-secondary-d1 text-105">
                      Jalyss thanks you for your business
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Invoice;
