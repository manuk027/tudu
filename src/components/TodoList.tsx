import type { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

type Props = {
    todos: Todo[];
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

function TodoList(props: Props): React.ReactElement {
    return (
        <div className="space-y-4">{props.todos.map((todo) => (<TodoItem key={todo.id} todo={todo} {...props} />))}</div>
    );
}

export default TodoList;