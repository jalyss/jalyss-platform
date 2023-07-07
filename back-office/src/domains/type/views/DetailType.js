import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleType } from '../../../store/articleType';

function DetailType() {

  // const type = rows[typeId]
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { typeId } = useParams();
  const articleType = useSelector((state) => state.articleType?.articleType)

  const articles = useSelector((state) => state.articleType?.articleType?.articles)
  console.log('type', articleType)
  console.log('arti', articles)



  useEffect(() => {
    dispatch(fetchArticleType(typeId));
  }, [typeId, dispatch]);

  return (
    <div>
      <div class="container" >
        <div class="card" style={{ width: '500px' }}>
          <div class="container" >
            <div className='row mt-3'>
              <div className='col-4 '>
                <h6>Name AR :</h6>
              </div>
              <div className='col-4'>
                <p class="card-text"><small class="text-muted">
                  {articleType?.nameAr}
                </small></p>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-4 '>
                <h6>Name EN :</h6>
              </div>
              <div className='col-4'>
                <p class="card-text"><small class="text-muted">
                  {articleType?.nameEn}</small></p>
              </div>
            </div>

            <div className='row mt-3 mb-3'>
              <div className='col-4 '><h6>Article :</h6></div>
              

                {articleType?.articles?.map((article, i) =>
                  <div className='col-4'>
                    <p class="card-text">
                    <small class="text-muted"> {article.title}</small>
                    </p>
                  </div>
                )}

             
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default DetailType

