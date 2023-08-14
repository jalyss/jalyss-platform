import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRole } from '../../../store/role';

function EditRole() {
  const [renderEditView, setRenderEditView] = useState(false);
  const role = useSelector((state) => state.role.role)
  const [editRoleData, seteditRoleData] = useState(null);
  const [basicModalDelete, setBasicModalDelete] = useState(false);

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRole(id));
  }, []);

  useEffect(() => {
    seteditRoleData({ ...role });
  }, [role]);

  const toggleShow = () => {
    setRenderEditView(!renderEditView);
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




    </div>
  )
}

export default EditRole
