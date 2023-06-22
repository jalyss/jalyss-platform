import React from 'react'
import { useParams } from 'react-router-dom'
import { rows } from "../../../constants/blogData"

function DetailBlog() {
    const { blogId } = useParams()
    const blog = rows[blogId]
    return (

<div class="container" >
<h5> {blog.name}</h5>
        <div class="card mb-3" style={{ width: 1000 }}>
            <div class="row g-0">
                <div class="col-md-4">
                    
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                            <img class="img-fluid rounded-start" src={blog.cover} alt="Card image cap" style={{ height: 300, width: 500 }} />
                        </div>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title"> {blog.blogTitle}</h5>
                        <p class="card-text">{blog.content}.</p>
                        <p class="card-text"><small class="text-muted">{blog.articleCategory}</small></p>
                    </div>
                    <div
      className="form-group"
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
      }}
    >
                        <button type="button" class="btn btn-success mb-2" style={{ marginLeft: '10px' }}>Accept</button>
                        <button type="button" class="btn btn-danger mb-2" style={{ marginLeft: '20px' }}>Refuse </button>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}

export default DetailBlog

