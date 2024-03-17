import { useEffect, useState } from "react";
import { getTodoslist, deleteTodo, completed, inCompleteTodo } from "../service/TodoService.js";
import { useNavigate } from "react-router-dom";
import {getRole} from "../service/AuthService.js";

const ListTodosComponent = () => {
    const [todoList, setToDoList] = useState([])
    const [role, setRole] = useState(true)

    useEffect(() => {
           listTodos();
           if(getRole() === "ROLE_ADMIN") setRole(false)
    }, []);

    function listTodos(){
        getTodoslist().then((response) => {
            setToDoList(response.data)
        }).catch((error) => {
            console.log(console.error(error))
        })
    }

    const navigator = useNavigate();
    function redirectToPost() {
        navigator("/add-todo");
    }

    function updateToDo(id) {
        navigator(`/update-todo/${id}`);
    }

    function successDelete(msg) {
        return <div className="alert alert-danger" role="alert">
            {msg}
        </div>
    }

    function delToDo(id) {
        deleteTodo(id).then((response) => {
            successDelete(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    function completeToDo(id){
        completed(id).then((response)=>{
            listTodos()
        }).catch((error) => {
            console.log(error);
        })
    }

    function inComplete(id){
        inCompleteTodo(id).then((response)=>{
            listTodos()
        }).catch((error) => {
            console.log(error);
        })
        
    }

    return (
        <>
            <div className="container mt-5">
                <h2 className="text-center">Todo List</h2>
                <button type="button" className="btn btn-primary" disabled={role} onClick={redirectToPost}>Add Todo</button>
                <table className="table table-striped table-bordered table-hover mt-2">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Completed</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todoList.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.completed ? 'Yes' : 'No'}</td>
                                        <td><button type="button" className="btn btn-outline-info ms-2" disabled={role} onClick={() => updateToDo(todo.id)}>Update</button>
                                            <button type="button" className="btn btn-outline-danger ms-2" disabled={role} onClick={() => delToDo(todo.id)}>Delete</button>
                                            <button type="button" className="btn btn-outline-success ms-2" onClick={()=> completeToDo(todo.id)}>Complete</button>
                                            <button type="button" className="btn btn-outline-info ms-2" onClick={()=> inComplete(todo.id)}>In-Complete</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default ListTodosComponent;