import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { editTarif, fetchOneTarif } from "../../../../store/tarifss";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useTranslation } from "react-i18next";
import { fetchsessions } from "../../../../store/sessions";
const UpdateFeatures = () => {
  const tarifStore = useSelector((state) => state.tarif);
  const sessionstore = useSelector((state) => state.sessions.sessions.items);
  console.log(sessionstore);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setprice] = useState("");
  const [tarif, setTarif] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [skip, setSkip] = useState(0);

  const take = 6;

  useEffect(() => {
    dispatch(fetchsessions({ take, skip }));
  }, [dispatch, take, skip]);

  const { tarifId } = useParams();

  useEffect(() => {
    dispatch(fetchOneTarif(tarifId));
    setTarif(tarifStore.tarif);
  }, [tarifId]);

  useEffect(() => {
    dispatch(fetchsessions());
  }, []);

 

  return (
    <div>
      {" "}
      <Modal
        toggleShow={toggleShow}
        basicModal={basicModal}
        setBasicModal={setBasicModal}
        normal={true}
        title="Add new feature"
        body={
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ marginRight: "50px" }}
          >
            <StyledInput
              label="Label"
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            />
          </div>
        }
        fn={handleSave}
      />
    </div>
  );
};

export default UpdateFeatures;
