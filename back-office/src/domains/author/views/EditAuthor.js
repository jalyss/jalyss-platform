import React from 'react'
import { useParams } from 'react-router-dom'
import { rows } from '../../../constants/authorData'
import UpdateButton from '../../../components/Commun/buttons/UpdateButton'
function EditAuthor() {
    const { authorId } = useParams()
  const author = rows[authorId]
  return (
    <div>
    <div className='container'>
        <div className='d-flex  justify-content-center'>
    <div className='card ' style={{width:600 }}>
    <div className='container'>
        <form>
            <div class="form-group mt-3">
                <label >Name AR</label>
                <input type="text" class="form-control mt-2 " style={{width:300}} value={author.nameAr}/>
            </div>
            <div class="form-group mt-3">
                <label >Biography AR</label>
                <textarea class="form-control mt-2"  rows="3">{author.biographyAr}</textarea>
            </div>
            <div class="form-group mt-3">
                <label >Name EN</label>
                <input type="text" class="form-control mt-2" style={{width:300}}  value={author.nameEn}/>
            </div>
            <div class="form-group mt-3">
                <label >biography EN</label>
                <textarea class="form-control mt-2 mb-3"  rows="3">{author.biographyEn}</textarea>
            </div>
            <div className='d-flex  justify-content-center'>
        <UpdateButton mb={15}/>
            </div>
        </form>
        </div>
    </div>
    </div>
    </div>
</div>
  )
}

export default EditAuthor
