import { Container } from 'react-bootstrap';
import ListTodos from './Home/ListTodos';
import AddButton from './Home/AddButton';

export const App = () => {
  return (
    <Container style={{ padding: 10 }}>
      <AddButton />
      <ListTodos />
    </Container>
  );
};
