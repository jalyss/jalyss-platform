import React from 'react'
import { useParams } from 'react-router-dom'
import { rows } from '../../../constants/authorData'

function DetailAuthor() {
    const { authorId } = useParams()
    const author = rows[authorId]
    return (
        <div className='container'>
            <div className='card'>
                <div className='container'>
                    <div className='row mt-3'>
                        <div className='col-3'>
                            <h6>Name AR :</h6>
                        </div>
                        <div className='col-6'>
                            <p>{author.nameAr}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <h6>biography AR :</h6>
                        </div>
                        <div className='col-6'>
                            <p>{author.biographyAr}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <h6>Name EN :</h6>
                        </div>
                        <div className='col-6'>
                            <p>{author.nameEn}</p>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col-3'>
                            <h6>biography EN:</h6>
                        </div>
                        <div className='col-6'>
                            <p>{author.biographyEn}</p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default DetailAuthor
