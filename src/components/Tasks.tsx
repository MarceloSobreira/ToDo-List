import { Task } from './Task';
import styles from './Tasks.module.css';

import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Todo {
  id: string;
  title: string;
  isComplete: boolean;
}

export function Tasks() {
  const [todo, setTodo] = useState<Todo[]>([])

  const [newTitleTodo, setNewTitleTudo] = useState('')
  const [completedTodos, setCompletedTodos] = useState(Number)



  function handleCompletedTodos() {
    let count = 0;
    todo.filter(props => {
      if (props.isComplete === true) {
        count++;
      }
    })
    setCompletedTodos(count)
  }

  function handleCreateNewTodo(event: FormEvent) {
    event.preventDefault()
    setTodo([...todo, { id: uuidv4(), title: newTitleTodo, isComplete: false }])
    setNewTitleTudo('');
  }

  function handleNewTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitleTudo(event.target.value)
  }

  function deleteTodo(idToDelete: string) {
    const todosWithoutDeleteOne = todo.filter(props => {
      return props.id !== idToDelete;
    })
    todo.map(props => {
      if (props.id === idToDelete && props.isComplete === true) {
        changeIsComplete(idToDelete)
      }
    })
    setTodo(todosWithoutDeleteOne)
  }

  function changeIsComplete(idToChange: string) {
    todo.map(props => {
      if (props.id === idToChange) {
        props.isComplete = !props.isComplete
      }
    })
    handleCompletedTodos();
  }

  return (
    <div>
      <div className={styles.containerInput}>
        <form onSubmit={handleCreateNewTodo}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            name="todoTitle"
            value={newTitleTodo}
            onChange={handleNewTitleChange}
          />
          <button type="submit">
            Criar
            <img src="/src/assets/plus.svg" alt="" />
          </button>
        </form>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <p>
            Tarefas criadas
            <span>{todo.length}</span>
          </p>
          <p>
            Concluídas
            <span>{`${completedTodos} de ${todo.length}`}</span>
          </p>
        </div>

        {
          todo.length ? (
            todo.map(props => {
              return (
                <Task
                  key={props.id}
                  id={props.id}
                  title={props.title}
                  onChangeIsComplete={changeIsComplete}
                  onDeleteTodo={deleteTodo}
                />
              )
            })
          ) : (
            <div className={styles.emptyContent}>
              <img src="src/assets/clipboard.svg" alt="" />
              <p>Você ainda não tem tarefas cadastradas</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )
        }
      </div>
    </div>
  )
}