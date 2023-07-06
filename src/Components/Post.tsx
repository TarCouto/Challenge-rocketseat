import styles from './Post.module.css';
import { ThumbsUp, Trash } from 'phosphor-react'

interface Content {
  type: 'text';
  content: string;
}

export interface PostType {
  id: number;
  content: Content[];
}

interface PostProps {
  post: PostType;
  onTaskCompletion?: (taskId: number) => void;
  onDeleteTask?: (taskId: number) => void;
}

export function Post({ post, onTaskCompletion, onDeleteTask }: PostProps) {
  return (
    <article className={styles.taskBox}>
      <ul className={styles.content}>
        {post.content.map((line, index) => {
          if (line.type === 'text') {
            return (
              <li key={index} className={styles.checkbox}>
                <input
                  type="checkbox"
                  id={`checkbox-${post.id}`}
                  onChange={() => onTaskCompletion?.(post.id)}
                />
                <label htmlFor={`checkbox-${post.id}`}>
                  <span>{line.content}</span>
                </label>
              </li>
            );
          }
          return null;
        })}
        <aside>
          <button onClick={() => onDeleteTask?.(post.id)}>
            <Trash size={21}/>
          </button>
        </aside>
      </ul>
    </article>
  );
}
