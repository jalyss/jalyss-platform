import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editType, fetchArticleType } from '../../../store/articleType';
import { showErrorToast, showSuccessToast } from '../../../utils/toast';
import UpdateButton from '../../../components/Commun/buttons/UpdateButton';
import EditModal from "../../../components/Commun/Modal";


function DetailType() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [renderEditView, setRenderEditView] = useState(false);

  const { typeId } = useParams();
  const articleType = useSelector((state) => state.articleType?.articleType)

  const articles = useSelector((state) => state.articleType?.articleType?.articles)
  console.log('type', articleType)
  console.log('arti', articles)
  const [nameEn, setNameEn] = useState("")
  const [nameAr, setNameAr] = useState("")
  const [basicModalDelete, setBasicModalDelete] = useState(false);

  const toggleShow = () => {
    setRenderEditView(!renderEditView);
  };

  useEffect(() => {
    dispatch(fetchArticleType(typeId));
  }, [typeId, dispatch]);


  useEffect(() => {
    if (articleType)
      setNameAr(articleType?.nameAr)
    setNameEn(articleType?.nameEn)
  }, [articleType])


  const submitType = async (event) => {
    
    dispatch(editType({ id: typeId, nameAr, nameEn })).then((res) => {
      if (!res.error) {
        showSuccessToast("Type updated successfuly");
        navigate(-1)
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };

  const toggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
  };
  const onCanceltoggleShowDelete = (id) => {
    setBasicModalDelete(!basicModalDelete);
    setRenderEditView(false);
  };

  return (
    <div>
      <div class="container" >
      <div className="d-flex justify-content-center" >
        <div class="card" style={{ width: '500px' }}>
          {!renderEditView ? (
            <>
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
                <div className="w-100 d-flex justify-content-center">
                  <button
                    type="submit"
                    onClick={() => toggleShow()}
                    className="confirm-button mt-5   mb-3"
                  >
                    <span className="label-btn"> Edit Type </span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>

              <div className='container'>
                <div className="d-flex justify-content-center" >
                  <div className='card' style={{ width: '500px' }}>
                    <div className='container' >
                      <div>

                        <div class="form-group  mt-3">
                          <label >Name AR</label>
                          <input type="text" class="form-control" placeholder={nameAr}

                            onChange={(e) => { setNameAr(e.target.value) }}
                            value={nameAr}
                          />
                        </div>
                        <div class="form-group  mt-3 " style={{ marginRight: '30 px' }}>
                          <label >Name EN</label>
                          <input type="text" class="form-control" placeholder={nameEn}

                            onChange={(e) => { setNameEn(e.target.value) }}

                            value={nameEn}

                          />
                        </div>
                        <div className="d-flex justify-content-center">

                          <UpdateButton mb={15} mt={20} onClick={() => toggleShowDelete()} />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
      <EditModal
        toggleShow={onCanceltoggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={true}
        ofDelete={!true}
        title={
          <div style={{width:"200%",marginLeft:"100%"}} className="d-flex justify-content-center align-items-center">
            Are you sure !
          </div>
        }
        body={
          <div className="d-flex justify-content-center align-items-center">
            You want to edit this type ?
          </div>
        }
        fn={() => {
          submitType();
        }}
      />
</div>
    </div>



  )
}

export default DetailType

