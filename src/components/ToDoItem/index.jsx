import './todo-item.style.css'
import { IconPencil, IconTrash } from "../icons";
import { use, useContext } from 'react';
import ToDoContext from '../ToDoProvider/ToDoContext';

export function ToDoItem({ item }) {

    const { toggleTodoCompleted, deleteTodo, openFormEditTodoDialog } = useContext(ToDoContext)

    const styles = ['todo-item']

    if (item.completed) {
        styles.push('completed')
    }

    return (
        <li className={styles.join(' ')}>
            <p className="date">
                {new Date(item.createdAt).toLocaleDateString('pt-BR')}
            </p>
            <div className="details">
                <input type="checkbox"
                    className="checkbox"
                    onClick={() => toggleTodoCompleted(item)}
                    defaultChecked={item.completed} />
                <p className="description">
                    {item.description}
                </p>
                <div className="actions">
                    <button className="btn" onClick={() => deleteTodo(item)}>
                        <IconTrash />
                    </button>
                    <button className="btn" onClick={() => openFormEditTodoDialog(item)}>
                        <IconPencil />
                    </button>
                </div>
            </div>
        </li>
    )
}