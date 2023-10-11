import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import OneItem from './OneItem';
import styles from './List.module.css';

const ListTodos = () => {
  const todos = useSelector(state => state.todos);
  const [filter, setFilter] = useState(null);

  const visibleTodos = () => {
    switch (filter) {
      case 'in process':
        return todos.filter(todo => {
          return todo.isProces === false;
        });
      case 'ready':
        return todos.filter(todo => todo.isProces === true);

      default:
        return todos;
    }
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <Button
          variant={filter === null ? 'secondary' : 'outline-secondary'}
          onClick={() => setFilter(null)}
        >
          All tasks
        </Button>
        <Button
          variant={filter === 'in process' ? 'secondary' : 'outline-secondary'}
          onClick={() => setFilter('in process')}
        >
          Show task in the process
        </Button>
        <Button
          variant={filter === 'ready' ? 'secondary' : 'outline-secondary'}
          onClick={() => setFilter('ready')}
        >
          Tasks is done
        </Button>
      </div>
      <ul className={styles.listTodosStyle}>
        {visibleTodos().map(todo => (
          <li key={todo.id} className={styles.todosItem}>
            <OneItem data={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListTodos;
