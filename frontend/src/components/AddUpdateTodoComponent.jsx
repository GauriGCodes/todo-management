import { useState } from "react";
import { addTodo, getTodo, updateTodo } from "../service/TodoService";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddUpdateTodoComponent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeCompleted = (e) => {
        setCompleted(e.target.value);
    }

    useEffect(() => {
        if (id) {
            getTodo(id).then((response) => {
                setTitle(response.data.title)
                setDescription(response.data.description)
                setCompleted(response.data.completed)
            })
        }
    }, [id])

    function updateTitle() {
        if (id) {
            return <h2 className="text-center">Update ToDo</h2>
        }
        else return <h2 className="text-center">Add ToDo</h2>
    }


    function onSubmit(e) {
        e.preventDefault();

        const todo = {
            "title": title,
            "description": description,
            "completed": completed
        }

        if (id) {
            todo["id"]=id
            updateTodo(todo).then((response) => {
                navigate("/todos")
            }).catch((error) => {
                console.log(error)
            })
        } else {
            addTodo(todo).then((response) => {
                navigate("/todos")
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 bg-transparent border-dark">
                        {updateTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="title" className="form-label">Todo Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={title} placeholder="Enter the title" onChange={onChangeTitle} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description" className="form-label">Todo Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={description} placeholder="Enter the description" onChange={onChangeDescription} />
                                </div>
                                <div className=" form-group mb-3">
                                    <label htmlFor="completed" className="form-label">Todo Completed</label>
                                    <select className="form-control" value={completed} id="completed" onChange={onChangeCompleted}>
                                        <option value="false">No</option>
                                        <option value="true">Yes</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success" onClick={onSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AddUpdateTodoComponent;
