import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { Class } from '../types';
import { Plus, Trash2 } from 'lucide-react';

export default function Classes() {
  const { classes, addClass, deleteClass, enrollInClass } = useGym();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '',
    instructor: '',
    time: '',
    duration: 60,
    capacity: 20,
    enrolled: 0,
    price: 1500
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClass(newClass);
    setNewClass({
      name: '',
      instructor: '',
      time: '',
      duration: 60,
      capacity: 20,
      enrolled: 0,
      price: 1500
    });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      deleteClass(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Classes</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Class</span>
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Class</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Class Name</label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={e => setNewClass(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instructor</label>
                <input
                  type="text"
                  value={newClass.instructor}
                  onChange={e => setNewClass(prev => ({ ...prev, instructor: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="text"
                  value={newClass.time}
                  onChange={e => setNewClass(prev => ({ ...prev, time: e.target.value }))}
                  placeholder="e.g., 10:00 AM"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                  type="number"
                  value={newClass.duration}
                  onChange={e => setNewClass(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  value={newClass.capacity}
                  onChange={e => setNewClass(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  value={newClass.price}
                  onChange={e => setNewClass(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map(classItem => (
          <div key={classItem.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold mb-2">{classItem.name}</h3>
              <button
                onClick={() => handleDelete(classItem.id)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Instructor: {classItem.instructor}</p>
              <p>Time: {classItem.time}</p>
              <p>Duration: {classItem.duration} minutes</p>
              <p>Price: ₹{classItem.price}</p>
              <p>
                Capacity: {classItem.enrolled}/{classItem.capacity}
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => enrollInClass(classItem.id, '1')}
                disabled={classItem.enrolled >= classItem.capacity}
                className={`w-full py-2 px-4 rounded-md ${
                  classItem.enrolled >= classItem.capacity
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {classItem.enrolled >= classItem.capacity ? 'Class Full' : 'Enroll Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}