import { useState } from "react"
import { useDispatch } from "react-redux"
// import { action } from "../reducer/todoReducer"
import { postTodoAsync } from "../reducer/todoReducer"
import {  toast } from 'react-toastify';

function TodoInput() {
    const [todo, setTodo] = useState("")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const handleTodo = () => {
        if (todo.trim() === "") {
            setMessage("Pls add some text")
            setTimeout(() => {
                setMessage("")
            }, 1500)
            return
        }
        dispatch(postTodoAsync(todo))
        toast.success("Todo Added")
        setTodo("")
    }

    return (
        <>

            <div className="input-group mb-3 px-3">
                <input value={todo} type="text" onChange={(e) => setTodo(e.target.value)} className="form-control rounded" placeholder="Add Todo here"></input>
                <button onClick={handleTodo} className="btn btn-success" type="button" id="button-addon2">Add Todo</button>
            </div>
            {message &&
                <small  className="form-text text-muted bg-danger">{message}</small>
                }
        </>

    )
}


export default TodoInput