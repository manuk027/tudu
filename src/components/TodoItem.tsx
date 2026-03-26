import type { Todo } from "../types/Todo";

type Props = {
    todo: Todo;
    editingId: string | null;
    editText: string;
    editDeadline: string;
    setEditText: (v: string) => void;
    setEditDeadline: (v: string) => void;
    setEditingId: (id: string | null) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string) => void;
};

function TodoItem({ todo, editingId, editText, editDeadline, setEditText, setEditDeadline, setEditingId, onToggle, onDelete, onUpdate, }: Props): React.ReactElement {
    const isEditing = editingId === todo.id;
    return (
        <div className="flex items-center justify-between p-5 rounded-2xl border bg-white border-gray-100">
            <div className="flex items-center gap-4 w-full">
                <div onClick={() => onToggle(todo.id)} className="w-6 h-6 rounded-full border-2 cursor-pointer"></div>
                <div className="flex-1">
                    {isEditing ? (
                        <>
                            <input value={editText} onChange={(e) => setEditText(e.target.value)} className="border p-1 w-full mb-2" />
                            <input type="datetime-local" value={editDeadline} onChange={(e) => setEditDeadline(e.target.value)} className="border p-1 w-full" />
                        </>
                    ) : (
                        <>
                            <p className={`${todo.completed ? "line-through" : ""}`}>{todo.text}</p>
                            <p className="text-xs text-gray-400">{todo.deadline.toLocaleString()}</p>
                        </>
                    )}
                </div>
            </div>
            <div className="flex gap-2">
                {isEditing ? (
                    <>
                        <button onClick={() => onUpdate(todo.id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => { setEditingId(todo.id); setEditText(todo.text); setEditDeadline(todo.deadline.toISOString().slice(0, 16)); }}>Edit</button>
                        <button onClick={() => onDelete(todo.id)}>Delete</button>
                    </>
                )}
            </div>
        </div >
    );
}

export default TodoItem;