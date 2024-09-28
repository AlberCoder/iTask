import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    savetoLS();
    showSuccessAnimation();
  };

  const handleEdit = (id) => {
    const currentTodo = todos.find(i => i.id === id);
    setTodo(currentTodo.todo);
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    savetoLS();
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    savetoLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS();
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const showSuccessAnimation = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container bg-gradient-to-br from-gray-100 to-indigo-100  md:mt-[100px] md:mb-[49px] mb-3 mt-[80px] rounded-xl p-5 md:mx-auto  min-h-[92vh] md:min-h-[80vh] md:w-1/2 shadow-2xl">
        <div className="addTodo my-5 relative">
          <h1 className='font-bold text-center text-3xl text-indigo-900 mb-5'>iTask - Manage Your Todos</h1>
          <h2 className='text-lg mt-3 my-2 font-bold text-indigo-700'>Add Todo</h2>
          <input 
            onChange={handleChange} 
            value={todo} 
            type="text" 
            className='w-full rounded-lg py-3 px-5 border border-indigo-300 focus:border-indigo-500 transition-all duration-300 shadow-md focus:shadow-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-3' 
            placeholder="Enter your task" 
          />
          <button 
            onClick={handleAdd} 
            disabled={todo.length <= 3} 
            className={`bg-indigo-900 hover:bg-indigo-700 text-white font-semibold w-full py-2 px-4 rounded-lg text-lg transition duration-500 ease-in-out transform hover:scale-105 shadow-lg ${todo.length <= 3 ? 'bg-opacity-75 cursor-not-allowed' : ''}`}
          >
            {showSuccess && <FaCheckCircle className="absolute text-green-500 left-[90%] top-1 animate-ping" />}
            Save
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <input type="checkbox" onChange={toggleFinished} checked={showFinished} className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"/>
          <span className="text-indigo-700">Show Finished</span>
        </div>

        <h2 className='text-lg font-bold my-4 text-indigo-800'>Your Todos</h2>
        <div className="todos space-y-4">
          {todos.length === 0 && <div className='m-5 text-center text-gray-500 animate-pulse'>No Todos To Display</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div 
                key={item.id} 
                className={`todo flex justify-between items-center bg-white rounded-lg p-4 shadow-md transition-all duration-500 hover:shadow-lg transform hover:scale-105 ${item.isCompleted ? 'opacity-70' : ''}`}
              >
                <div className="flex gap-5 items-center">
                  <input 
                    onChange={handleCheckbox} 
                    type="checkbox" 
                    name={item.id} 
                    checked={item.isCompleted} 
                    className="h-5 w-5 rounded-full text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className={`${item.isCompleted ? 'line-through text-gray-500' : 'text-indigo-900'} text-lg font-medium`}>
                    {item.todo}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(item.id)} 
                    className='bg-indigo-800 hover:bg-indigo-600 text-white p-2 rounded-full transition duration-300 transform hover:scale-110 shadow-md'
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className='bg-red-600 hover:bg-red-500 text-white p-2 rounded-full transition duration-300 transform hover:scale-110 shadow-md'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>

      </div>
    </>
  );
}

export default App;
