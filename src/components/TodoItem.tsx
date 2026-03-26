import type { Todo } from "../types/Todo";

type Props = {
    todo: Todo;
    editingId: string | null;
    editText: string;
    setEditText: (v: string) => void;
    setEditingId: (id: string | null) => void;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string) => void;
};

function TodoItem({
    todo,
    editingId,
    editText,
    setEditText,
    setEditingId,
    onToggle,
    onDelete,
    onUpdate,
}: Props): React.ReactElement {
    const isEditing = editingId === todo.id;

    return (
        <div className={`flex items-center justify-between p-5 rounded-2xl border ${
            todo.completed
                ? "bg-white/60 border-dashed opacity-60"
                : "bg-white border-gray-100"
        }`}>
            <div className="flex items-center gap-4 w-full">
                <div
                    onClick={() => onToggle(todo.id)}
                    className="w-6 h-6 rounded-full border-2 cursor-pointer"
                ></div>

                <div className="flex-1">
                    {isEditing ? (
                        <input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="border p-1 w-full"
                        />
                    ) : (
                        <p
                            className={`${
                                todo.completed ? "line-through" : ""
                            }`}
                        >
                            {todo.text}
                        </p>
                    )}

                    <p className="text-xs text-gray-400">
                        {todo.deadline.toLocaleString()}
                    </p>
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
                        <button
                            onClick={() => {
                                setEditingId(todo.id);
                                setEditText(todo.text);
                            }}
                        >
                            Edit
                        </button>
                        <button onClick={() => onDelete(todo.id)}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TodoItem;