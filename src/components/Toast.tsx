type Props = {
    message: string;
    onClose: () => void;
};

function Toast({ message, onClose }: Props): React.ReactElement {
    return (
        <div className="mb-6 flex items-center justify-between bg-red-50 border border-red-100 p-4 rounded-xl">
            <p className="text-sm text-red-700 font-medium">{message}</p>
            <button
                onClick={onClose}
                className="text-red-400 hover:text-red-600 text-xs font-bold"
            >
                Dismiss
            </button>
        </div>
    );
}

export default Toast;