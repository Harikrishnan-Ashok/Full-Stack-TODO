import { createContext, useState } from "react";

export const TaskContext = createContext(null)

export default function TaskContextProvider({ children }) {
	const [tasks, setTask] = useState([])

	function addTask(newDesc) {
		setTask((value) => [...value, { id: Date.now(), desc: newDesc, progress: false }])
	}

	function changeProgress(TaskId) {
		setTask((value) => value.map((item) => item.id === TaskId ? { ...item, progress: !item.progress } : item))
	}

	function delTask(TaskId) {
		setTask((value) => value.filter((item) => item.id !== TaskId))
	}

	return (
		<TaskContext.Provider value={{ tasks, addTask, changeProgress, delTask }}>
			{children}
		</TaskContext.Provider>
	)
}
