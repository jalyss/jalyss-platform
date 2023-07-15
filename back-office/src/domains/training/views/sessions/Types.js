import React,{useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {useDispatch,useSelector} from 'react-redux';
import { fetchsessionstypes } from '../../../../store/sessiontyps';




function Types() {
  const typeStore= useSelector((state)=>state.sessiontyps.types.items)
  const dispatch = useDispatch()
  

  useEffect(()=>{
    dispatch(fetchsessionstypes())
   },[])

  {console.log('heyy',typeStore)}
  return (



    <Table striped>
      <thead>
        <tr>
          <th>N°</th>
          <th> id   </th>
          <th> title </th>
          <th>sessions </th>
        </tr>
      </thead>
      <tbody>
        {typeStore.map((el,key)=>(
        <tr>
          <td>{key}</td>
          <td>{el.id}</td>
          <td>{el.title}</td>
          <td>{el.sessions}</td>
        </tr>))}
       
      </tbody>
    </Table>
  );
}

export default Types;
