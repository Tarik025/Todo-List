import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

function App() {

  const [todo, setTodo] = useState("") //new todo taking input
  const [todoholder, setTodoholder] = useState([]) //holds all task(todos) array

  useEffect(() => {
    let todoString = localStorage.getItem("todoholder")
    if(todoString){
    let todoholder = JSON.parse(localStorage.getItem("todoholder")) //todoholder is null
    setTodoholder(todoholder)
  }
  }, [])

  const saveToLS = () => { //Save to Local Storage
    localStorage.setItem("todoholder", JSON.stringify(todoholder))
  }

  const handleAdd = () => {
    setTodoholder([...todoholder, { id: uuidv4(), todo, isCompleted: false }])
    // ...todoholder: This is the spread operator, which spreads the existing todoholder array into individual elements. This ensures the new array includes all existing tasks.
    //     { id: uuidv4(), todo, isCompleted: false }: A new task object is created with:
    // id: uuidv4(): Generates a unique identifier for the task using the uuidv4 library.
    // todo: The current value of the todo state (the text entered by the user).
    // isCompleted: false: Marks the task as incomplete by default.

    setTodo("")
    // Resets the todo state to an empty string after the task is added.
    // This clears the input field, preparing it for the next task.

    console.log(todoholder)
    saveToLS();
  }

  const handleEdit = (e, id) => {
    let t = todoholder.filter(item => item.id === id)
    console.log( `The id is ${id}`)
    setTodo(t[0].todo)

    let newTodoholder = todoholder.filter(item => {
      return item.id !== id
    });
    setTodoholder(newTodoholder)
    saveToLS();
  }

  const handleDelete = (e) => {
    let id = e.target.name;
    let newTodoholder = todoholder.filter(item => {
      return item.id !== id
    });
    setTodoholder(newTodoholder)
    // Explanation:
    // Purpose:
    
    // This function deletes a specific todo item from the todoholder array based on the ID of the todo.
    // Step-by-Step Process:
    
    // Retrieve the ID of the Todo:
    // e.target.name: When the "Delete" button is clicked, its name attribute (which contains the unique ID of the todo) is passed to this function.
    // Filter Out the Todo:
    // todoholder.filter(...): This creates a new array (newTodoholder) containing all items from todoholder except the one with the matching id. ***     
    // item.id !== id: This condition ensures that the item with the provided id is excluded from the new array.
    // Update the State:
    // setTodoholder(newTodoholder): This updates the todoholder state with the new array, effectively removing the deleted todo from the list.
    // Why Use filter:
    
    // filter returns a new array, ensuring immutability of the original todoholder array.

    saveToLS();
    
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    // e (event): This is the event object automatically passed by React when an event (like typing in an input field) occurs.
    // e.target: Refers to the HTML element where the event occurred (the input field in this case).
    // e.target.value: Contains the current value of the input field (what the user typed).
  }

  const handleCheckbox = (t) => {
    let id = t.target.name;
    //     Parameters:
    // t (event):
    // Represents the event object triggered by the checkbox click.
    // t.target: Refers to the clicked checkbox element.
    // t.target.name: Holds the name attribute of the checkbox, which in this case is the task's unique id.

    let index = todoholder.findIndex(item => {
      return item.id === id;
    });
    let newTodoholder = [...todoholder];
    newTodoholder[index].isCompleted = !newTodoholder[index].isCompleted
    setTodoholder(newTodoholder)
    //     How it Works:
    // Extract the ID:

    // The id of the task is extracted from the name attribute of the clicked checkbox: let id = t.target.name.
    // Find the Task Index:

    // The function uses the findIndex method to locate the task in the todoholder array that matches the id:
    // javascript
    // Copy code
    // let index = todoholder.findIndex((item) => item.id === id);
    // Clone the todoholder Array:

    // A shallow copy of the todoholder array is created using the spread operator (...):
    // javascript
    // Copy code
    // let newTodoholder = [...todoholder];
    // Toggle the isCompleted Status:

    // The isCompleted property of the task at the found index is toggled:
    // javascript
    // Copy code
    // newTodoholder[index].isCompleted = !newTodoholder[index].isCompleted;
    // Update the State:

    // The updated newTodoholder array is passed to setTodoholder to update the state.
    saveToLS();

  }


  return (
    <>
      <Navbar />



      <div className="container">
        <h1><b>Add your TODO</b></h1>
        <div className="addtodo">
          <input onChange={handleChange} value={todo} className='input' type="text" />
          <button onClick={handleAdd} className='addBtn'>Save</button>
        </div>


        <div className="subhead">Your TODO: </div>

        <div className="todoholder">

          {todoholder.map(item => {
            return (
              <div key={item.id} className="todolist">
                <input
                  type="checkbox" onChange={handleCheckbox} value={item.isCompleted}
                  name={item.id} // Pass unique ID as the name
                />

                <div className={item.isCompleted ? "line-through" : ""}> {item.todo} </div>

                <div className="button">
                  <button onClick={(e)=>{handleEdit(e, item.id)}} id='btn1'>Edit</button>
                  <button onClick={handleDelete} name={item.id} id='btn2'>Delete</button>
                </div>
              </div>
            );

          })}


          {/* {todoholder.map((item, index) => {
            return (
              <div key={index} className="todolist">
                <div className="text">{item.todo}</div>
                <div className="button">
                  <button onClick={handleEdit} id="btn1">Edit</button>
                  <button onClick={handleDelete} id="btn2">Delete</button>
                </div>
              </div>
            );
          })} */}

        </div>


      </div>
    </>
  )
}

export default App
