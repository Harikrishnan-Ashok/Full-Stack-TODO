import { createContext, useState } from "react";

export const TaskContext = createContext(null)

export default function TaskContextProvider({ children }) {
	const [tasks, setTask] = useState([])
	function addTask(newDesc) {
		setTask((value) => [...value, { id: "", desc: newDesc, progress: false }])
	}
	return (
		<TaskContext.Provider value={{ tasks, addTask }}>
			{children}
		</TaskContext.Provider>
	)
}
