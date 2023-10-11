import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as formik from 'formik';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { updateTaskById } from 'app/redux/todosSlice';
import { schema } from 'helpers/shema';

const UpdateTask = ({ id, show, handleClose }) => {
  const { Formik } = formik;

  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

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

  const { title, description, isProces } = todos.find(todo => todo.id === id);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update task</Modal.Title>
      </Modal.Header>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          const updatedTask = { ...values, id, isProces };

          actions.resetForm({
            values: {
              description: '',
              title: '',
            },
          });
          dispatch(updateTaskById({ updatedTask, id }));
          handleClose();
          return updatedTask;
        }}
        initialValues={{
          title,
          description,
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
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                type="submit"
                onClick={handleSubmit}
                id="submit"
              >
                Update
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateTask;
