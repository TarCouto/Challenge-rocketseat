import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './NewTarefa.module.css';
import plus from '../assets/plus.svg';

export interface NewTarefaProps {
  onAddTask: (task: string) => void;
}

export function NewTarefa({ onAddTask }: NewTarefaProps) {
  const [newTask, setNewTask] = useState<string>('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    onAddTask(newTask);
    setNewTask(''); 
  }
  
  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
}

  const isNewTaskEmpty = newTask.length === 0;

  return (
    <article>
      <form className={styles.commentForm} onSubmit={handleCreateNewTask}>
        <div>
          <textarea
            name='comment'
            placeholder='Adicione uma nova tarefa'
            value={newTask}
            onChange={handleNewTaskChange}
            required
          />
          <button type='submit' disabled={isNewTaskEmpty}>
            Criar <img src={plus} alt='+' />
          </button>
        </div>
      </form>
    </article>
  );
}
