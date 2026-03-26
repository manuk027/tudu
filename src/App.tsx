import { useState, useRef, useEffect } from "react";
import type { Todo } from "./types/Todo";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Toast from "./components/Toast";

function App(): React.ReactElement {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");
    const [editDeadline, setEditDeadline] = useState("");
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const textRef = useRef<HTMLInputElement | null>(null);
    const deadlineRef = useRef<HTMLInputElement | null>(null);

    function handleAddTodo() {
        if (!textRef.current || !deadlineRef.current) return;
        const text = textRef.current.value;
        const deadlineValue = deadlineRef.current.value;
        if (text.trim() === "" || !deadlineValue) return;
        setTodos((prev) => [...prev, { id: Date.now().toString(), text, completed: false, deadline: new Date(deadlineValue), },]);
        textRef.current.value = "";
        deadlineRef.current.value = "";
    }

    function handleToggleTodo(id: string) {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    }

    function handleDeleteTodo(id: string) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }

    function handleUpdateTodo(id: string) {
        if (editText.trim() === "" || !editDeadline) return;
        setTodos((prev) => prev.map((t) => t.id === id ? { ...t, text: editText, deadline: new Date(editDeadline), } : t));
        setEditingId(null);
        setEditText("");
        setEditDeadline("");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const overdue = todos.find((t) => !t.completed && t.deadline < now);
            if (overdue) {
                setToastMessage(`Task "${overdue.text}" is overdue!`);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [todos]);
    return (
        <>
            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage(null)} />)}
            <TodoInput textRef={textRef} deadlineRef={deadlineRef} onAdd={handleAddTodo} />
            <TodoList todos={todos} editingId={editingId} editText={editText} editDeadline={editDeadline} setEditText={setEditText} setEditDeadline={setEditDeadline} setEditingId={setEditingId} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
        </>
    );
}

export default App;