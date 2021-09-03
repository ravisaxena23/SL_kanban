import React from 'react'

const TodoItem = (props) => {
    return (
        <li className="list-group-item" id="todolistitem">{props.todo.name}</li>
    )
}

export default TodoItem
