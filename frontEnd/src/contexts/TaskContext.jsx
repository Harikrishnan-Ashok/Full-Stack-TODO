import axios from "axios";
import { API_BASE_URL } from "../api"
import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext(null)

export default function TaskContextProvider({ children }) {
	const [tasks, setTask] = useState([])

	useEffect(() => {
		async function getTODO() {
			try {
				const res = await axios.get(`${API_BASE_URL}/todos`)
				setTask(res.data)
			} catch (error) {
				console.log(error);
			}
		}
		getTODO()
	}, [])

	async function insertTask(newDesc) {
		const newtask = { desc: newDesc, progress: false }
		const res = await axios.post(`${API_BASE_URL}/newtask`, newtask)
		setTask((val) => [...val, res.data])
	}

	async function deleteTask(TaskId) {
		await axios.delete(`${API_BASE_URL}/todo/${TaskId}`);
		setTask((val) => val.filter((item) => item.id !== TaskId));
	}

	async function updateTask(TaskId) {
		await axios.put(`${API_BASE_URL}/updateTask/${TaskId}`)
	}

	function addTask(newDesc) {
		insertTask(newDesc)
	}

	function changeProgress(TaskId) {
		setTask((value) => value.map((item) => item.id === TaskId ? { ...item, progress: !item.progress } : item))
		updateTask(TaskId)
	}

	function delTask(TaskId) {
		deleteTask(TaskId)
	}

	return (
		<TaskContext.Provider value={{ tasks, addTask, changeProgress, delTask }}>
			{children}
		</TaskContext.Provider>
	)
}


