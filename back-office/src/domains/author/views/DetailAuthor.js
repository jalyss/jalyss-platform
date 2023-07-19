import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchauthor } from '../../../store/author';
import { useEffect } from 'react';

function DetailAuthor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { authorId } = useParams();
    const authorStore = useSelector((state) => state.author);
    const { authors, author } = authorStore;

    useEffect(() => {
        dispatch(fetchauthor(authorId));
      }, [authorId,dispatch]);
    

    return (
        <div className='container'>
            <div className='card'>
                <div className='container'>
                    <div className='row mt-3'>
                        <div className='col-3'>
                            <h6>Name AR :</h6>
                        </div>
                        <div className='col-6'>
                            <p>{author?.nameAr}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <h6>biography AR :</h6>
                        </div>
                        <div className='col-6'>
                            <p>{author?.biographyAr}</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'>
                            <h6>Name EN :</h6>
                        </div>
                        <div className='col-6'>
                            <p>{author?.nameEn}</p>
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col-3'>
                            <h6>biography EN:</h6>
                        </div>
                        <div className='col-6'>
                            <p>{author?.biographyEn}</p>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default DetailAuthor
