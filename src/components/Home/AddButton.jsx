import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FiEdit } from 'react-icons/fi';

import AddTask from './FormAddTask';

const AddButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ paddingTop: 20, paddingBottom: 30 }}>
      <Button
        onClick={handleShow}
        variant="secondary"
        style={{ display: 'flex', gap: 5, alignItems: 'center' }}
      >
        <FiEdit />
        <p style={{ margin: 0 }}>Add new task</p>
      </Button>

      <AddTask handleClose={handleClose} show={show} />
    </div>
  );
};

export default AddButton;
