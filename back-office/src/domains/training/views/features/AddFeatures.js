import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { showErrorToast,showSuccessToast } from '../../../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import CreateTarif from '../../../service/views/CreateTarif';
import { CreateNeswTarif } from '../../../../store/tarifss';
import Title from 'antd/es/skeleton/Title';
import { useEffect } from 'react';
import { fetchsessions } from '../../../../store/sessions';
import CreateButton from '../../../../components/Commun/buttons/CreateButton';







const AddFeatures = () => {
const sessionstore=useSelector((state)=>state.sessions.sessions.items)

console.log(sessionstore)


    const [sessionId,setSessionId]=useState('')
    const [title,setTitle]=useState('')
    // const [description,setDescription]=useState('')   
    const [skip, setSkip] = useState(0);
    const [price,setPrice]=useState('')

    const dispatch = useDispatch()

    const take = 6;
    useEffect(()=>{
      dispatch(fetchsessions({ take, skip }));
    }, [dispatch, take, skip])

    // const handleAddTarifChange = (e) => {
    //     const { name, value } = e.target
    //     setAddtarif((addtarif => ({ ...addtarif, [name]: value ? parseFloat(value) : null })
    //     ))}



        const submitTarif = async (event) => {
            event.preventDefault();
           
            dispatch(CreateNeswTarif({price:parseFloat(price),
              title,
              sessionId}))
              .then(res => {
                if (!res.error) {
                  showSuccessToast('tarif.created')
                } else {
                  console.log(res);
                  showErrorToast(res.error.message)
                }
              }
              )
          };
        

  return (
//     <div className="d-flex align-items-center justify-content-center vh-100 card-container">
//       <Card style={{ width: '18rem' }} className="text-center custom-card">
//         <Card.Body>
//           <Form.Group controlId="tariffName">
//             <Form.Label>title</Form.Label>
//             <Form.Control
//              type="text" 
//              placeholder="Enter name" 
//              name='name' 
//              value={title}
//              onChange={(e)=>{setTitle(e.target.value)} } />
//           </Form.Group>
         
        
//           <Form.Group controlId="tariffPrice">
//             <Form.Label>Price</Form.Label>
//             <Form.Control
//              type="number"
//              name='number'
//              placeholder="Enter price"
//              value={price}
//             onChange={(e) => { setPrice(parseFloat(+e.target.value)) }}/>
//           </Form.Group>
//           <Form.Group controlId="tariffPrice">

//  <select
//            value={sessionId}
//             className="form-select mt-3"
//               aria-label="Default select example"
//              onChange={(e) => { setSessionId(e.target.value) }}
//                required
//   style={{ marginLeft: "10px" }}
// >
//   <option value="" disabled selected>
//     Choose your sessionid
//   </option>
//   { sessionstore?.items?.map((el, index) => (
//       <option key={index} value={el.id}>
//         {el.description}
//       </option>
//     ))}
// </select></Form.Group>
//           <Button variant="primary"  onClick={submitTarif}>Confirm</Button>
//         </Card.Body>
//       </Card>
//     </div>
<div className='d-flex '>
  <div className='w-50'>
  <div>
        <CreateButton
          title={"add new feature"}
          // onClick={() => navigate("addtarif")}
          mt={20}
          mb={20}
        />
        {/* {addNewFeat && <div>
        Label:  <input />
       isAvailble: <
          </div>} */}
      </div>
      <Features/>
  </div>
  <div className='w-50'>hiiiiii</div>
</div>
  );
};

export default AddFeatures;
