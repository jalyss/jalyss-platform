 import React from 'react'
import { useParams } from 'react-router-dom'
import { rows } from "../../../constants/blogData"

 function DetailBlog() {
    const {blogId}=useParams()
    console.log(blogId,'test')
  const blog=rows[blogId]
  console.log('blo',blog);
     return (
         <div>
             <div className='container'>
                 <h5> {blog.name}</h5>
                 <div class="card mb-3 mt-5">
                     <img class="card-img-top" src={blog.cover} alt="Card image cap" />
                     <div class="card-body">
                         <h5 class="card-title"> {blog.blogTitle}</h5>
                         <p class="card-text">discription.</p>
                         <p class="card-text"><small class="text-muted">{blog.articleCategory}</small></p>
                     </div>
                     <div className='form-group' >
                     <button type="button" class="btn btn-success mb-2"style={{marginLeft: '10px'}}>Accept</button>
              <button type="button" class="btn btn-danger mb-2" style={{marginLeft: '20px'}}>Refuse </button>
                         </div>

                 </div>
             </div>
         </div>

     )
 }

 export default DetailBlog

