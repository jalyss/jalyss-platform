
import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { SiInstagram } from 'react-icons/si'
import { CiFacebook } from 'react-icons/ci'
import { AiFillLinkedin } from 'react-icons/ai'

function Footer() {
    return (




        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href="https://www.facebook.com/Jalysscom/" className='me-4 text-reset'>
                        <CiFacebook />
                    </a>


                    <a href="https://www.instagram.com/jalysscom/" className='me-4 text-reset'>
                        <SiInstagram />
                    </a>
                    <a href='https://www.linkedin.com/company/jalysscom/' className='me-4 text-reset'>
                        <AiFillLinkedin />

                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="Jalysscom" />
                                Jalysscom
                            </h6>
                            <p>
                                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit.
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                            <p>
                                <a href='/' className='Discounts'>
                                    Discounts
                                </a>
                            </p>
                            <p>
                                <a href='/' className='Newly arrived'>
                                    Newly arrived
                                </a>
                            </p>
                            <p>
                                <a href='/' className='Bestsellers'>
                                    Bestsellers
                                </a>
                            </p>
                            <p>
                                <a href='/' className='Books'>
                                    Books
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>

                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <MDBIcon icon="home" className="address" />

                                Anbara building, Next to Mohamed jamousi cultural Complex, Sfax 3000
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="email" />
                                jalysscom.book@gmail.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="phone" /> +216 51 165 003


                                <MDBIcon icon="print" className="fax" /> +216 51 165 003
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright:
                <a className='text-reset fw-bold' href='https://jalyss.com/'>
                    JALYSS.COM
                </a>
            </div>
        </MDBFooter>
    );
}


export default Footer