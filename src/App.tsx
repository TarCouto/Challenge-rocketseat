import { useState } from 'react';
import './Global.css';
import { Header } from './Components/Header';
import { NewTarefa } from './Components/NewTarefa';
import { Post, PostType } from './Components/Post';

import styles from './App.module.css';

interface Task {
  id: number;
  content: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, content: 'Fazer compras', completed: false },
  { id: 2, content: 'Limpar a casa', completed: false },
  { id: 3, content: 'Estudar React', completed: false },
];

const initialCompletedTasks = 0;

export function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [completedTasks, setCompletedTasks] = useState<number>(initialCompletedTasks);

  function addTask(task: string) {
    const newTask: Task = { id: tasks.length + 1, content: task, completed: false };
    setTasks([...tasks, newTask]);
  }

  function handleTaskCompletion(taskId: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const completedCount = updatedTasks.filter((task) => task.completed).length;
    setCompletedTasks(completedCount);
  }

  function handleDeleteTask(tasksToDelete: Task){
    const tasksWithoutDeleteOne = tasks.filter(task => task !== tasksToDelete);
    setTasks(tasksWithoutDeleteOne);
  }

  const countTask = tasks.length; // Contagem de tarefas deriva diretamente do array

  return (
    <div>
      <Header />
      <div>
        <div>
          <NewTarefa onAddTask={addTask} />
        </div>
        <main className={styles.divGeral}>
          <header>
            <div className={styles.contador}>
              <span>Tarefas Criadas: {countTask}</span>
            </div>
            <aside className={styles.TasksContainer}>
              <span>Concluídas: {completedTasks}</span>
            </aside>
          </header>
          {tasks.map((task) => (
            <Post
              key={task.id}
              post={{ id: task.id, content: [{ type: 'text', content: task.content }] }}
              onTaskCompletion={handleTaskCompletion}
              onDeleteTask={() => handleDeleteTask(task)}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
