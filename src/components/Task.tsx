import { Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TodoListProps {
  id: string;
  title: string;
  onChangeIsComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function Task({ id, title, onChangeIsComplete, onDeleteTodo }: TodoListProps) {

  function handleDeleteTodo() {
    onDeleteTodo(id);
  }

  function handleChangeIsComplete() {
    onChangeIsComplete(id);
  }

  return (
    <div className={styles.content}>
      <li>
        <section>
          <input type="checkbox" id={id} onClick={handleChangeIsComplete} />
          <label htmlFor={id} className={styles.checkboxLabel}>
            <p className={styles.textContent}>
              {title}
            </p>
          </label>
        </section>
        <button onClick={handleDeleteTodo}>
          <Trash size={14} />
        </button>
      </li>
    </div>
  )
}