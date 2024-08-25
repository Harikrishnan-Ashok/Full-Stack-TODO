import { useContext, useState } from "react";
import "./displayTasks.css";
import { TaskContext } from "../../contexts/TaskContext";

export default function DisplayTasks() {
	const [newtask, setNewtask] = useState(false);
	const [desc, setDesc] = useState("")
	const { tasks, addTask } = useContext(TaskContext)

	function handleNewtask() {
		setNewtask((val) => !val);
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
						<div className="task">
							<h2 className="heading">Progress Heading</h2>
							{tasks.map((task, index) => (
								<div className="task" key={index}>
									<span>{index + 1}.</span><p>TASK: {task.desc}</p>
									{(task.progress) ?
										< p > STATUS : completed</p>
										:
										<p>STATUS: NOT completed</p>}
									<button>DONE</button>
								</div>
							))}
						</div>
						<button className="new" onClick={() => handleNewtask()}>
							+ New One
						</button>
					</div>
				</div>
				<div className="newTaskContainer">
					{newtask && (
						<div className="formContainer">
							<label>Description :</label>
							<input type="text" onChange={(e) => handleChange(e)} />
							<button onClick={() => handleAdd()} >ADD</button>
							<button onClick={() => handleNewtask()}>X</button>
						</div>
					)}
				</div>
			</div >
		</>
	);
}
