import React from "react";
import {FilterValueType, TaskType} from "./App";

type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (id: number) => void
    changeFilter: (filter: FilterValueType) => void
}

export function ToDoList(props: ToDoListPropsType) {
const tasksList = props.tasks.map((t) => {
    return (
        <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => props.removeTask(t.id)}>x</button>
        </li>
    )
})
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
            { tasksList }
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}