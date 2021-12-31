import React, {ChangeEvent, useState} from "react";
import {FilterValueType, TaskType} from "./App";

type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export function ToDoList(props: ToDoListPropsType) {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<boolean | string>(false);

    const tasksList = props.tasks.map((t) => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox" checked={t.isDone}
                       onChange={changeStatus}
                />
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
            setTitle("");
        } else {
            setError("Title is required")
        }
    }

    const allBtnClass = props.filter === "all" ? "active-filter" : ""
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const compBtnClass = props.filter === "completed" ? "active-filter" : ""

    const errorMessage = error && <div style={{color: "red"}}>Title is required</div>

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value)
                        setError(false)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            addTask();
                        }
                    }}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={() => props.changeFilter("all")}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={() => props.changeFilter("active")}>Active
                </button>
                <button
                    className={compBtnClass}
                    onClick={() => props.changeFilter("completed")}>Completed
                </button>
            </div>
        </div>
    )
}