import type { RefObject } from "react";

type Props = {
    textRef: RefObject<HTMLInputElement | null>;
    deadlineRef: RefObject<HTMLInputElement | null>;
    onAdd: () => void;
};

function TodoInput({ textRef, deadlineRef, onAdd }: Props): React.ReactElement {
    return (
        <section className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-10 flex items-center gap-2">
            <input
                ref={textRef}
                type="text"
                placeholder="Add a new task..."
                className="flex-1 p-3 outline-none text-gray-600 bg-transparent placeholder-gray-300"
            />

            <input
                ref={deadlineRef}
                type="datetime-local"
                className="text-xs text-gray-400 p-2 bg-gray-50 rounded-lg outline-none"
            />

            <button
                onClick={onAdd}
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700"
            >
                Add
            </button>
        </section>
    );
}

export default TodoInput;