import { GridActionsCellItem } from '@mui/x-data-grid'
import React from 'react'
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function BlogsList() {
    return (
        <div>
    
      <h2>List of people who create blogs </h2>
      <hr></hr>

<table class="table mt-5 ">
  <thead>
    <tr>
      <th scope="col">N</th>
      <th scope="col">name</th>
      <th scope="col">blog title </th>
      <th>Date</th>
      <th>Actions</th>
      <th scope="col">situation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>jalyss6</td>
      <td>My Blog Post 30</td>
      <td>2023-06-17</td>
      <td>{<AiOutlineEye />}{<AiFillDelete />}</td>
      <td style={{color:"green"}}>Accept</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>jalyss3</td>
      <td>My Blog Post 28</td>
      <td>2023-06-17</td>
      <td>{<AiOutlineEye />}{<AiFillDelete />}</td>
      <td style={{color:"red"}}>Refuse  </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>jalyss9</td>
      <td>My Blog Post 16</td>
      <td>2023-06-17</td>
      <td ><Link to={"detail"}>{<AiOutlineEye />}</Link>{<AiFillDelete />}</td>
      <td style={{color:"orange"}}>Waiting</td>
    </tr>
  </tbody>
</table>

  


        </div>
    )
}

export default BlogsList