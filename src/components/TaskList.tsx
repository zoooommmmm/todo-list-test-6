import React from 'react';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  tags: string[];
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const priorityColors = {
  high: '#DC2626',
  medium: '#F59E0B',
  low: '#22C55E'
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <div className="grid gap-4">
      {tasks.map(task => (
        <motion.div
          key={task.id}
          className="bg-white rounded-lg p-4 shadow-sm"
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onUpdateTask({ ...task, completed: !task.completed })}
                className="w-5 h-5 rounded border-gray-300"
              />
              <div>
                <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </h3>
                <div className="flex gap-2 mt-1">
                  <span
                    className="px-2 py-1 rounded text-sm"
                    style={{ backgroundColor: priorityColors[task.priority] + '20', color: priorityColors[task.priority] }}
                  >
                    {task.priority}
                  </span>
                  {task.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;