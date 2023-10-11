import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import * as formik from 'formik';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { schema } from '../../helpers/shema';
import { addNewTask } from 'app/redux/todosSlice';

const AddTask = ({ handleClose, show }) => {
  const { Formik } = formik;
  const dispatch = useDispatch();

  const handleEnter = useCallback(
    event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEnter);
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [handleEnter]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add task</Modal.Title>
      </Modal.Header>
      <Formik
        id="form"
        validationSchema={schema}
        onSubmit={(values, actions) => {
          const newTask = { ...values, id: nanoid() };

          actions.resetForm({
            values: {
              description: '',
              title: '',
            },
          });
          dispatch(addNewTask(newTask));
          handleClose();
          return newTask;
        }}
        initialValues={{
          title: '',
          description: '',
          isProces: false,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    value={values.title}
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="Title..."
                    autoFocus
                  />
                  {errors.title && (
                    <div
                      id="title"
                      style={{
                        color: 'red',
                        textAlign: 'right',
                        paddingTop: 5,
                      }}
                    >
                      &times;{errors.title}
                    </div>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Add description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={values.description}
                    onChange={handleChange}
                    name="description"
                    type="text"
                  />
                </Form.Group>
                <Form.Label>
                  <Form.Check
                    aria-label="is this task in proces"
                    style={{ display: 'inline-block', marginRight: 10 }}
                    name="isProces"
                    value={values.isProces}
                    onChange={handleChange}
                  />
                  Is this task in proces?
                </Form.Label>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="success"
                type="submit"
                onClick={handleSubmit}
                id="submit"
              >
                Add task
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default AddTask;
