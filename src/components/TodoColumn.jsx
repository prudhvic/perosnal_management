export default function TodoColumn({ status, todos, onDragStart, onDragOver, onDrop, dispatch }) {
    return (
      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
        className="border dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors"
      >
        <h3 className="text-lg font-semibold mb-4 capitalize text-gray-900 dark:text-white">
          {status}
        </h3>
        {todos.map((todo) => (
          <div
            key={todo.id}
            draggable
            onDragStart={(e) => onDragStart(e, todo.id)}
            className="bg-gray-50 dark:bg-gray-700 p-3 rounded shadow mb-2 cursor-move transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-900 dark:text-gray-100">{todo.text}</span>
              <button
                onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }