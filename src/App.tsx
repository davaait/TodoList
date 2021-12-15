import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed"

//CRUD
function App() {
    //BLL:
    const [filter, setFilter] = useState<FilterValueType>("all")
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
    ]);

    const changeFilter = (filter: FilterValueType) => setFilter(filter);
    const todoListTitle_1: string = "What to learn";

    const removeTask = (id: number) => {
        const filteredTasks: Array<TaskType> = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
        console.log()
    }

    /*    let tasksForRender = tasks;
            if (filter === "active") {
                tasksForRender = tasks.filter(t => !t.isDone)
            }
        if (filter === "completed") {
            tasksForRender = tasks.filter(t => t.isDone)
        }*/

    const getTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks;
        }
    }


    //UI:
    return (
        <div className="App">
            <ToDoList
                filter={filter}
                title={todoListTitle_1}
                tasks={getTasksForRender()}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;