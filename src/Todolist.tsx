import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type filterTypes = 'all' | 'active' | 'completed'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    onSetFilter: (value: filterTypes) => void
    filter: filterTypes
}

export function Todolist({filter, onSetFilter,  ...props}: PropsType) {

    const aqua = {
        background: 'aquamarine',
    }
    // const onRemove = (id: number) => {props.removeTask(id)}

    const tasksList = props.tasks.map(t => {
        return (
            <li key={t.id}><input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span> <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {tasksList}
        </ul>
        <div>
            <button style={filter === "all" ? aqua : {}} onClick={()=> onSetFilter("all")}>All</button>
            <button style={filter === "active" ? aqua : {}} onClick={()=> onSetFilter("active")}>Active</button>
            <button style={filter === "completed" ? aqua : {}} onClick={()=> onSetFilter("completed")}>Completed</button>
        </div>
    </div>
}
