import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UpdateButton from '../../../components/Commun/buttons/UpdateButton'
import { useDispatch, useSelector } from 'react-redux'
import { editType, fetchArticleType } from '../../../store/articleType'
import { showErrorToast, showSuccessToast } from '../../../utils/toast'
import { useState } from 'react'

function EditType() {

  const articleTypeStore = useSelector((state) => state.articleType.articleType)
  const { typeId } = useParams()  
  const dispatch = useDispatch();
  const navigate =useNavigate()
 const [nameEn,setNameEn]=useState("")
 const [nameAr,setNameAr]=useState("")

console.log("articleTypeStore",articleTypeStore);
   
  useEffect(() => {
    dispatch(fetchArticleType(typeId));
   
  }, [typeId]);
    console.log("nameEn",nameAr);
   useEffect(()=>{
        if(articleTypeStore)
     setNameAr(articleTypeStore?.nameAr)
    setNameEn(articleTypeStore?.nameEn)
   },[articleTypeStore])



  const submitType = async (event) => {
    event.preventDefault();
   
    dispatch(editType({id:typeId,nameAr,nameEn})).then((res) => {
      if (!res.error) {
        showSuccessToast("Type updated successfuly");
        navigate(-1)
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
                <input type="text" class="form-control" placeholder={nameAr}
                
                 onChange={(e)=>{setNameAr(e.target.value)}}
                 value={nameAr}
                  />
              </div>
              <div class="form-group  mt-3 " style={{ marginRight: '30 px' }}>
                <label >Name EN</label>
                <input type="text" class="form-control" placeholder={nameEn}
                
                onChange={(e)=>{setNameEn(e.target.value)}}

                 value={nameEn}

                 />
              </div>
              <div className="d-flex justify-content-center">
                
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

