import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiEdit2 } from 'react-icons/fi';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';

import { changeStatus, deleteById } from 'app/redux/todosSlice';
import UpdateTask from './UpdateForm';

const OneItem = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id, title, description, isProces } = data;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteById(id));
  };
  return (
    <Card>
      <Card.Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            textOverflow: 'clip',
            overflow: 'auto',
            whiteSpace: 'nowrap',
            width: '80%',
          }}
        >
          {title}
        </span>
        <span
          id={id}
          style={{ paddingLeft: 5, paddingRight: 5, cursor: 'pointer' }}
          onClick={handleShow}
        >
          <FiEdit2 />
        </span>
        <UpdateTask handleClose={handleClose} show={show} id={id} />
      </Card.Header>
      <Card.Body
        style={{
          display: 'flex',
          alignItems: 'center',
          columnGap: 20,
        }}
      >
        <Form.Check
          style={{ cursor: 'pointer' }}
          aria-label="is this task in process"
          checked={isProces}
          onChange={() => dispatch(changeStatus(id))}
        />
        <div style={{ flexGrow: 1 }}>
          <Card.Text
            style={isProces ? { textDecorationLine: 'line-through' } : null}
          >
            {description}
          </Card.Text>
        </div>
        <CloseButton onClick={handleDelete} />
      </Card.Body>
    </Card>
  );
};

export default OneItem;
