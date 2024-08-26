import { useContext, useState } from "react";
import "./displayTasks.css";
import { TaskContext } from "../../contexts/TaskContext";

export default function DisplayTasks() {
	const [newtask, setNewtask] = useState(false);
	const [desc, setDesc] = useState("")
	const { tasks, addTask, changeProgress, delTask } = useContext(TaskContext)

	function handleNewtask() {
		setNewtask((val) => !val);
	}

	function deleteTask(id) {
		delTask(id)
	}

	function handleProgress(id) {
		changeProgress(id)
	}

	function handleChange(e) {
		setDesc(() => e.target.value)
	}

	function handleAdd() {
		addTask(desc)
		console.log(tasks)
	}
	return (
		<>
			<div className="container">
				<h1 className="heading">Tasks</h1>
				<div className="sectionContainer">
					<div className="blocks">
						<div className="heading">
							<h2>TODO</h2>
							<div className="taskCont">
								{tasks.filter(task => !task.progress).map((task, index) => (
									< div className="task" key={index} >
										<span>{index + 1}.</span><p>id: {task.id}</p>
										<p>TASK: {task.desc}</p>
										{(task.progress) ?
											< p > STATUS : completed</p>
											:
											<p>STATUS: NOT completed</p>}
										<button onClick={() => handleProgress(task.id)}> {task.progress ? "UNDO" : "DONE"}</button>
										<button onClick={() => deleteTask(task.id)}>DELETE</button>
									</div>
								))}
							</div>
						</div>
						<div className="heading">
							<h2>COMPLETED</h2>
							<div className="taskCont">
								{tasks.filter(task => task.progress).map((task, index) => (
									< div className="task" key={index} >
										<span>{index + 1}.</span><p>id: {task.id}</p>
										<p>TASK: {task.desc}</p>
										{(task.progress) ?
											< p > STATUS : completed</p>
											:
											<p>STATUS: NOT completed</p>}
										<button onClick={() => handleProgress(task.id)}> {task.progress ? "UNDO" : "DONE"}</button>
										<button onClick={() => deleteTask(task.id)}>DELETE</button>
									</div>
								))}
							</div>
						</div>


					</div>
				</div>
				<button className="new" onClick={() => handleNewtask()}>+ New One</button>
				<div className="newTaskContainer">
					{newtask && (
						<div className="formContainer">
							<label>Description :</label>
							<input type="text" onChange={(e) => handleChange(e)} />
							<button type="submit" onClick={() => handleAdd()} >ADD</button>
							<button onClick={() => handleNewtask()}>X</button>
						</div>
					)}
				</div>
			</div >
		</>
	);
}
