// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSpaceById, editSpace } from "../../../store/space";
// import axios from "axios";
import AddButton from "../../../components/buttons/AddButton";
import { AiFillDelete } from "react-icons/ai";
// import { BsUpload } from "react-icons/bs";


import "../../../assets/styles/WorkSpaceDetails.css";

// export default function SpaceDetails() {
//   const [files, setFiles] = useState([]);

//   const dispatch = useDispatch();
//   const { spaceId } = useParams();

//   const space = useSelector((state) => state.space.space);
//   const [refresh, setRefresh] = useState(false);

//   console.log(space)

//   useEffect(() => {
//     dispatch(fetchSpaceById(spaceId));
//   }, [dispatch, spaceId, refresh]);

//   const navigate = useNavigate();

//   const onChange = (e) => {
//     const fileList = Array.from(e.target.files);
//     setFiles(fileList);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const galleryData = new FormData();

//     for (let i = 0; i < files.length; i++) {
//       galleryData.append("files", files[i]);
//     }

//     let auxMedia = [];
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_ENDPOINT}/uploads`,
//         galleryData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       auxMedia = res.data.map((elem) => elem.id);
//     } catch (err) {
//       console.log(err);
//     }
//     await axios
//       .post(
//         `${process.env.REACT_APP_API_ENDPOINT}/work-spaces/images/${spaceId}`,
//         auxMedia
//       )
//       .then((res) => setRefresh(!refresh));
//   };

//   const deleteImg = async (path) => {
//     const pathElements = path.split('/');
//     const name = pathElements[pathElements.length - 1];
  
//       await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/work-spaces/delete-images/${name}`)
//       .then((res) => {
//         dispatch(fetchSpaceById(spaceId));
//         setRefresh(!refresh);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className="view">
//       <div className="card mb-3">
//         {space?.image ? (
//           <img
//             className="card-img-top"
//             src={space?.image?.path}
//             alt={space?.image?.alt}
//           />
//         ) : (
//           <img
//             className="spaceImage"
//             src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
//             alt="cover"
//           />
//         )}
//       </div>

//       <div className="spaceDetails">
//         <h5 className="spaceName">{space?.name}</h5>
//         <p className="spaceDescription">{space?.description}</p>
//         <p className="spaceAmenities">{space?.amenities}</p>
//         <div className="spaceFooter">
//           <div className="spacePrice">
//             <h5>Price: {space?.price}</h5>
//             <p className="capacity">Capacity: {space?.capacity}</p>
//           </div>
//         </div>

//         <form onSubmit={onSubmit}>
   
         
//              <AddButton
//               type="file"
//               id="file"
//               content="uploadImages"
//               multiple
//               onClick={(e)=>{ onChange(e)}}
//               startIcon
//               Icon={<BsUpload />}
//             />
         
//           <AddButton type="submit" content="Upload" />
//         </form>
//       </div>

//       {space?.MediaWorkSpace?.map((elem, i) => (
//         <div className="grid" key={i}>
//           <img alt="" src={elem.media.path} style={{ height: 100 }} />
//           <div className="deleteButton">
//             <AddButton 
//               onClick={() => deleteImg(elem.media.path)}
//               content={<AiFillDelete />}
//               startIcon
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpaceById, editSpace } from "../../../store/space";
import axios from "axios";

export default function SpaceDetails() {
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const { spaceId } = useParams();

  const space = useSelector((state) => state.space.space);
  const [refresh, setRefresh] = useState(false);

  console.log(space)

  useEffect(() => {
    dispatch(fetchSpaceById(spaceId));
  }, [dispatch, spaceId, refresh]);

  const navigate = useNavigate();

  const onChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const galleryData = new FormData();

    for (let i = 0; i < files.length; i++) {
      galleryData.append("files", files[i]);
    }

    let auxMedia = [];
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/uploads`,
        galleryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      auxMedia = res.data.map((elem) => elem.id);
    } catch (err) {
      console.log(err);
    }
    await axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/work-spaces/images/${spaceId}`,
        auxMedia
      )
      .then((res) => {
        setRefresh(!refresh)
        if (!res.error) {
          showSuccessToast("image added");
          navigate(-1);
        } else {
          showErrorToast(res.error.message);
        }
      });
    };



  const deleteImg = async (path) => {
    const pathElements = path.split('/');
    const name = pathElements[pathElements.length - 1];
  
      await axios.delete(`${process.env.REACT_APP_API_ENDPOINT}/work-spaces/delete-images/${name}`)
      .then((res) => setRefresh(!refresh))
  
  };

  return (
    <div className="view">
      <div className="card mb-3">
        {space?.image? (
          <img
            className="card-img-top"
            src={space?.image?.path}
            alt={space?.image?.alt}
          />
        ) : (
          <img
            className="spaceImage"
            src="https://www.ultimatesource.toys/wp-content/uploads/2013/11/dummy-image-landscape-1-1024x800.jpg"
            alt="cover"
          />
        )}
      </div>

      <div className="spaceDetails">
        <h5 className="spaceName">{space?.name}</h5>
        <p className="spaceDescription">{space?.description}</p>
        <p className="spaceAmenities">{space?.amenities}</p>
        <div className="spaceFooter">
          <div className="spacePrice">
            <h5>Price: {space?.price}</h5>
            <p className="capacity">Capacity: {space?.capacity}</p>
          </div>
        </div>
  
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="file"
              id="file"
              name="uploadImages"
              multiple
              onChange={onChange}
            />
          </div>
          <input type="submit" value="Upload" />
        </form>
      </div>
    {space?.MediaWorkSpace?.map((elem, i) => (
        <div className="grid" key={i}>
          <img alt="" src={elem.media.path} style={{ height: 100 }} />
          <div className="deleteButton">
            <AddButton 
              onClick={() => deleteImg(elem.media.path)}
              content={<AiFillDelete />}
              startIcon
            />
          </div>
        </div>
      ))}
    </div>
  );
}