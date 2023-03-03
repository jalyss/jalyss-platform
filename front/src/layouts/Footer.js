import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import { useTranslation } from 'react-i18next'

import { RiCustomerService2Line } from 'react-icons/ri'
import { MdPayment } from 'react-icons/md'
import { CiDiscount1 } from 'react-icons/ci'
import { TbDiscount2 } from 'react-icons/tb'
import { BsTruck } from 'react-icons/bs'

function Footer() {
  const { t } = useTranslation()

  return (
    <MDBFooter className="bg-darkPurple pt-3">
      <MDBContainer>
        <MDBRow className="text-center mb-5">
          <MDBCol>
            <RiCustomerService2Line size="50px" fill="white" className="mb-2" />
            <p className="text-color-grey">{t('footer.support')}</p>
          </MDBCol>
          <MDBCol>
            <MdPayment size="50px" fill="white" className="mb-2" />
            <p className="text-color-grey">{t('footer.secure')}</p>
          </MDBCol>
          <MDBCol>
            <CiDiscount1 size="50px"
             color="white"
              // className="mb-2"
             />
            <p className="text-color-grey">{t('footer.shipping')}</p>
          </MDBCol>
          <MDBCol>

          </MDBCol>
        </MDBRow>

        <MDBRow className="mt-3 mb-4">
          <MDBCol>
            <h5 className="mb-3 text-color-white">
              {t('account.myAccount')}
            </h5>
            <ul className="p-0 text-color-grey" id="footer_account_list">
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="المعلومات الشخصية"
                >
                  {t('account.personalInfo')}


                </a>
              </li>
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="الطلبات"
                >
                  {t('account.order')}
                </a>
              </li>

              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="العناوين"
                >
                  {t('account.headline')}
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="القسائم"
                >
                  {t('account.coup')}
                </a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol>
            <h5 className="mb-3 text-color-white">
              {t('products.product')}</h5>
            <ul className="p-0 text-color-grey" id="footer_account_list">
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="التخفيضات"
                >
                  {t('products.reduction')}
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="وصل حديثاً"
                >
                  {t('products.recentlyArrived')}
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="الأكثر مبيعاً"
                >
                  {t('products.bestSeller')}
                </a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol>
            <h5 className="mb-3 text-color-white">
              {t('ourcompany.ourCompany')}
            </h5>
            <ul className="p-0 text-color-grey" id="footer_account_list">
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="خدمه توصيل"
                >
                  {t('ourcompany.deliv')}
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="من نحن"
                >
                  {t('ourcompany.whoWeAre')}
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="اتصل بنا"
                >
                  {t('ourcompany.callUs')}
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="خريطة الموقع"
                >
                  {t('ourcompany.map')}
                </a>
              </li>
              <li className="mb-2">
                <a
                  className="text-decoration-none text-color-grey"
                  href="/"
                  title="المتاجر"
                >
                  {t('ourcompany.stor')}
                </a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol>
            <h5 className="mb-3 text-color-white">
              {t('storeInfo.infoStore')}
            </h5>
            <ul className="p-0 text-color-grey" id="footer_account_list">
              <li className="mb-2">
                <p className="text-decoration-none text-color-grey  m-0">
                  {t('storeInfo.jalyss')}
                </p>
              </li>
              <li className="mb-2">
                <p className="text-decoration-none text-color-grey  m-0">
                  {t('storeInfo.adress')}
                </p>
              </li>
              <li className="mb-2">
                <p className="text-decoration-none text-color-grey m-0">
                  الجموسي
                </p>
              </li>
              <li className="mb-2">
                <p className="text-decoration-none text-color-grey  m-0">
                  3000 صفاقس
                </p>
              </li>
              <li className="mb-2">
                <p className="text-decoration-none text-color-grey  m-0">
                  Tunisia
                </p>
              </li>
              <li className="mb-2">
                <p className="text-decoration-none text-color-grey  m-0" style={{direction:'ltr'}}>
                  {'+216 51 165 003'}
                </p>
              </li>
              <li className="mb-2">
                <p className="text-decoration-none text-color-grey  m-0">
                  jalysscom.book@gmail.com
                </p>
              </li>
            </ul>
          </MDBCol>
          <MDBCol>
            <h5 className="mb-3 text-color-white">إنضم إلى القائمة البريدية</h5>
            <ul className="p-0 text-color-grey" id="footer_account_list">
              <li className="mb-2">
                <p className="text-decoration-none text-color-grey">
                  {t('joinMailingList')}
                </p>
              </li>
            </ul>
            <input
              className="w-100 p-2 border-0 "
              placeholder='بريدك الإلكتروني'
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="text-center p-4 text-color-white">
          <MDBCol className="text-reset fw-bold" href="https://jalyss.com/">
            © 2023 Copyright: JALYSS.COM
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  )
}

export default Footer
