import { Container } from 'react-bootstrap';

const Loading = () => {
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black',
        }}
      >
        Loading...
      </div>
    </Container>
  );
};

export default Loading;
