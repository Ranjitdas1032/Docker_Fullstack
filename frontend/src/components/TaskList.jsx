import { useSelector, useDispatch } from 'react-redux'
import { deletetask,updatetask } from '../../store/tasksSlice'
function TaskList() {
  const { items, loading, error } = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  if (loading) return <p>Loading tasks...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
  if (items.length === 0) return <p>No tasks yet. Add one above!</p>

  const cycleStatus = (current) => {
  const order = ['pending', 'completed']   // ← match your model exactly
  return order[(order.indexOf(current) + 1) % order.length]
}

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map(task => (
        <li
          key={task.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            marginBottom: 8,
            border: '1px solid #ddd',
            borderRadius: 6,
          }}
        >
          <span style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <div>
            <button
              onClick={() => dispatch(updatetask({ id: task.id, status: cycleStatus(task.status) }))}
              style={{ marginRight: 8, padding: '4px 10px', fontSize: 12 }}
            >
              {task.status}
            </button>
            <button
              onClick={() => dispatch(deletetask(task.id))}
              style={{ padding: '4px 10px', fontSize: 12, color: 'red' }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList