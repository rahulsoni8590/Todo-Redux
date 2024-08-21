import { useDispatch } from "react-redux";
import { putTodoAsync, deletTodoAsync } from "../reducer/todoReducer"

export default function TodoList(props) {
    const dispatch = useDispatch()
    const { title, id, completed } = props.todo
    const {todo_id} = props
    return (
        <>
        { todo_id % 2 === 0 ?
            <div className="bg-dark card m-2">
                <div className="card-body d-flex justify-content-between">
                    <p className="text-light card-text">{title}</p>
                    <div className="col-6 d-flex py-1 justify-content-around">
                        {completed ? <button onClick={() => dispatch(putTodoAsync(props.todo))} className="btn btn-success">Mark as unDone</button>
                            :
                            <button onClick={() => dispatch(putTodoAsync(props.todo))} className="btn btn-warning">Mark as Done</button>}
                        <button onClick={() => dispatch(deletTodoAsync(id))} className="btn btn-danger">Delet Todo</button>
                    </div>
                </div>
            </div> 
            :
            <div className="bg-secondary card m-2">
                <div className="card-body d-flex justify-content-between">
                    <p className="text-light card-text">{title}</p>
                    <div className="col-6 d-flex py-1 justify-content-around">
                        {completed ? <button onClick={() => dispatch(putTodoAsync(props.todo))} className="btn btn-success">Mark as unDone</button>
                            :
                            <button onClick={() => dispatch(putTodoAsync(props.todo))} className="btn btn-warning">Mark as Done</button>}
                        <button onClick={() => dispatch(deletTodoAsync(id))} className="btn btn-danger">Delet Todo</button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}