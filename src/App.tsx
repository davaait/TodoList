import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {v1} from 'uuid';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed"

//CRUD
function App() {
    //BLL:
    const [filter, setFilter] = useState<FilterValueType>("all")
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
    ]);

    const changeFilter = (filter: FilterValueType) => setFilter(filter);
    const todoListTitle_1: string = "What to learn";

    const removeTask = (id: string) => {
        const filteredTasks: Array<TaskType> = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
        console.log()
    }

    const addTask = (title: string) => {
        setTasks([{
            id: v1(),
            title,
            isDone: false
        }, ...tasks])
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
                addTask={addTask}
            />
        </div>
    );
}

export default App;