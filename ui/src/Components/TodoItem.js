import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import TodoService from '../Services/TodoService'


const TodoItem = (props) => {

    const authContext = useContext(AuthContext);

    const handleClick = function (id) {
        const a = {
            _id: id
        }
        document.getElementById(a._id).innerHTML=''
        TodoService.deleteTodos(a)
    }

    return (
        <li className="list-group-item" id={props.todo._id}>
            <a href="#" onClick={() => handleClick(props.todo._id)}> {props.todo.name}</a>
        </li>
    )
}

export default TodoItem
