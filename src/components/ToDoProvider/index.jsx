import { useEffect, useState } from "react";
import ToDoContext from "./ToDoContext";

const TODOS = "todos"

export function ToDoProvider({ children }) {

    const savedTodos = localStorage.getItem(TODOS)

    const [todos, setTodos] = useState(savedTodos ? JSON.parse(savedTodos) : [])
    const [showDialog, setShowDialog] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(null)

    const openFormTodoDialog = (todo) => {
        if (todo) {
            setSelectedTodo(todo)
        }
        setShowDialog(true)
    }

    const closeFormTodoDialog = () => {
        setShowDialog(false)
        setSelectedTodo(null)
    }

    useEffect(() => {
        localStorage.setItem(TODOS, JSON.stringify(todos))
    }, [todos])

    const addTodo = (formData) => {
        const description = formData.get('description')
        setTodos((prevState) => {
            const todo = {
                id: prevState.length + 1,
                description,
                completed: false,
                createdAt: new Date().toISOString()
            }
            return [...prevState, todo]
        })
    }

    const toggleTodoCompleted = (todo) => {
        setTodos(prevState => {
            return prevState.map(t => {
                if (t.id == todo.id) {
                    return {
                        ...t,
                        completed: !t.completed
                    }
                }
                return t
            })
        })
    }

    const deleteTodo = (todo) => {
        setTodos(prevState => {
            return prevState.filter(t => {
                return t.id != todo.id
            })
        })
    }

    const openFormEditTodoDialog = (todo) => {
        openFormTodoDialog(todo)
    }

    const editTodo = (formData) => {
        setTodos(prevState => {
            return prevState.map(t => {
                if (t.id == selectedTodo.id) {
                    return {
                        ...t,
                        description: formData.get('description')
                    }
                }
                return t
            })
        })
    }

    return (
        <ToDoContext value={{
            todos,
            addTodo,
            toggleTodoCompleted,
            deleteTodo,
            showDialog,
            openFormTodoDialog,
            closeFormTodoDialog,
            openFormEditTodoDialog,
            selectedTodo,
            editTodo
        }}>{children}</ToDoContext>
    )
}