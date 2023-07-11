import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { rows } from '../../../constants/typeData'
import UpdateButton from '../../../components/Commun/buttons/UpdateButton'
import { useDispatch, useSelector } from 'react-redux'
import { editType, fetchArticleType } from '../../../store/articleType'
import { showErrorToast, showSuccessToast } from '../../../utils/toast'
import { useState } from 'react'

function EditType() {

  const articleTypeStore = useSelector((state) => state.articleType.articleType)
  const { typeId } = useParams()  
  const dispatch = useDispatch();
  const [type,setType ] = useState({})

  // const type = rows[typeId]
  useEffect(() => {
    dispatch(fetchArticleType(typeId));
  }, [typeId,dispatch]);

  useEffect(()=>{
    if(articleTypeStore)
    setType(articleTypeStore)
  },[articleTypeStore])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setType((type) => ({ ...type, [name]: value }));
  };

  const submitType = async (event) => {
    event.preventDefault();
    let ty = { ...type };
    dispatch(editType(type)).then((res) => {
      if (!res.error) {
        showSuccessToast(t('type.created'));
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  }; 


  return (
    <div>


      <div className='container'>
      <div className="d-flex justify-content-center" >
        <div className='card' style={{width: '500px'}}>
          <div className='container' >
            <div>

              <div class="form-group  mt-3">
                <label >Name AR</label>
                <input type="text" class="form-control" placeholder="Name"
                 name='nameAr'
                 onChange={handleChange}
                 value={type?.nameAr } />
              </div>
              <div class="form-group  mt-3 " style={{ marginRight: '30 px' }}>
                <label >Name EN</label>
                <input type="text" class="form-control" placeholder="Name"
                 name='nameEn'
                 onChange={handleChange}
                 value={type?.nameEn } />
              </div>
              <div className="   d-flex justify-content-center">
                
                <UpdateButton mb={15} mt={20} onClick={submitType}/>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default EditType

