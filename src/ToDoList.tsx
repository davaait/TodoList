import React, {useState} from "react";
import {FilterValueType, TaskType} from "./App";

type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}

export function ToDoList(props: ToDoListPropsType) {
    const [title, setTitle] = useState<string>("");

    const tasksList = props.tasks.map((t) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })
    const addTask = () => {
        props.addTask(title)
        setTitle("");
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={(e) => { setTitle(e.currentTarget.value)}}
                    onKeyPress={(e) => {
                        if(e.key === "Enter") {
                            addTask();
                        }
                    }}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>All</button>
                <button onClick={() => props.changeFilter("active")}>Active</button>
                <button onClick={() => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}