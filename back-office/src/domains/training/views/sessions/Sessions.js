import { red } from '@mui/material/colors';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { deletsessions, fetchsessions } from '../../../../store/sessions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../../../utils/toast';
import Pagination from '@mui/material/Pagination';
import AddButton from '../../../../components/buttons/AddButton';
import UpdateButton from "../../../../components/Commun/buttons/UpdateButton"
import DeleteButton from "../../../../components/Commun/buttons/DeleteButton"
import CreateButton from "../../../../components/Commun/buttons/CreateButton"
function Sessions() {
  const sessionStore = useSelector((state) => state.sessions?.sessions?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const handleChange = (event, value) => {
    setSkip((value - 1) * take);
  };
  const take = 6;

  useEffect(() => {
    dispatch(fetchsessions({ take, skip }));
  }, [dispatch, take, skip]);

  const handleDeletesessionsClick = (id) => {
    dispatch(deletsessions(id)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast('Session has been deleted');
      }
    });
  };

  if (sessionStore.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ border: 20}}>
 <div style={{marginLeft:600, position: 'sticky', top: 70, zIndex: 999, marginTop: 20 }}>
  <CreateButton
    title={'add new session'}
    onClick={() => navigate('newsession')}
    style={{ display: 'flex', alignItems: 'center' }}
  />
</div>
      {Array.isArray(sessionStore.items) &&
        sessionStore.items.map((el, i) => (
      


          <Card key={i} style={{ marginBottom: 20, border: '1px solid purple', borderRadius: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
            <Card.Body>
            
            
              <Card.Title style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Title:{el?.title}</Card.Title>
              <Card.Text style={{ fontSize: '16px' }}>Description:{el.description}</Card.Text>
              <img src={el?.cover?.path} alt="Session" style={{ width: '100%', marginBottom: '10px' }} /> 
            </Card.Body>
            <ListGroup className="list-group-flush" style={{ backgroundColor: '#AA00FF' }}>
              <ListGroup.Item>Start sessions: {el.startDate}</ListGroup.Item>
              <ListGroup.Item>End sessions: {el.endDate}</ListGroup.Item>
              <ListGroup.Item>Category: {el.category.nameEn}</ListGroup.Item>
              <ListGroup.Item>Category: {el.category.nameAr}</ListGroup.Item>
            </ListGroup>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
              <DeleteButton size="small" content={'Delete'} onClick={() => handleDeletesessionsClick(el.id)} />
              <UpdateButton size="small" content={'Update'} onClick={() => navigate(`${el.id}`)} />
            </div>
          </Card>
        ))}
      <div className="d-flex justify-content-center my-5">
        <Pagination
          count={Math.ceil(sessionStore.count / take)}
          color="secondary"
          variant="outlined"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Sessions;
