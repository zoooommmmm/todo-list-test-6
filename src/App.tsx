import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import TaskList from './components/TaskList';
import { addTask, updateTask, deleteTask } from './store/todoSlice';
import { RootState } from './store';

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  tags: string[];
  dueDate: string;
}

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todos.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({});

  const handleAddTask = () => {
    if (!newTask.title) return;
    dispatch(addTask({
      id: crypto.randomUUID(),
      title: newTask.title,
      priority: newTask.priority || 'medium',
      completed: false,
      tags: newTask.tags || [],
      dueDate: newTask.dueDate || new Date().toISOString()
    }));
    setIsModalOpen(false);
    setNewTask({});
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    return (tasks.filter(t => t.completed).length / tasks.length) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#1E293B]">Task Manager</h1>
        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
          <div className="h-4 bg-[#FEE2E2] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#22C55E]"
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </header>

      <TaskList tasks={tasks} onUpdateTask={(task) => dispatch(updateTask(task))} onDeleteTask={(id) => dispatch(deleteTask(id))} />

      <motion.button
        className="fixed bottom-8 right-8 bg-[#2563EB] text-white rounded-full p-4 shadow-lg"
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsModalOpen(true)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
              <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Task title"
                value={newTask.title || ''}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded mb-4"
                value={newTask.priority || 'medium'}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#2563EB] text-white rounded"
                  onClick={handleAddTask}
                >
                  Add Task
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;