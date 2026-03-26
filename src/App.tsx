import { useState, useRef } from "react";
import type { Todo } from "./types/Todo";

function App(): React.ReactElement {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>("");
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const textRef = useRef<HTMLInputElement | null>(null);
    const deadlineRef = useRef<HTMLInputElement | null>(null);

    function handleAddTodo() {
        if (!textRef.current || !deadlineRef.current) return;

        const text = textRef.current.value;
        const deadlineValue = deadlineRef.current.value;

        if (text.trim() === "" || !deadlineValue) return;

        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
            deadline: new Date(deadlineValue),
        };

        setTodos((prev) => [...prev, newTodo]);

        textRef.current.value = "";
        deadlineRef.current.value = "";
    }

    function handleToggleTodo(id: string) {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }

    function handleDeleteTodo(id: string) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    return (
        <>
            <input
                type="text"
                placeholder="Add a new task..."
                ref={textRef}
            />

            <input
                type="datetime-local"
                ref={deadlineRef}
            />

            <button onClick={handleAddTodo}>Add</button>

            {todos.map((todo) => (
                <div key={todo.id}>
                    <p
                        onClick={() => handleToggleTodo(todo.id)}
                        style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                            cursor: "pointer",
                        }}
                    >
                        {todo.text}
                    </p>

                    <p>{todo.deadline.toLocaleString()}</p>

                    <p>{todo.completed ? "Completed" : "Pending"}</p>

                    <button onClick={() => handleDeleteTodo(todo.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </>
    );
}

export default App;