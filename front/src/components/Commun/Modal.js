import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import CloseButton from './buttons/CloseButton';
import SaveButton from './buttons/SaveButton';


export default function App({toggleShow,basicModal,setBasicModal,title,body}) {
  

  return (
    <>
     
      <MDBModal show={basicModal} setShow={setBasicModal} toggle={toggleShow} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{title}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{body}</MDBModalBody>

            <MDBModalFooter>
             
              <CloseButton onClick={toggleShow}/>
             <SaveButton/>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}