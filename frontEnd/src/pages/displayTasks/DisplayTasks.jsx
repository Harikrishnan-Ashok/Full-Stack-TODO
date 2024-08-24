import "./displayTasks.css"
export default function DisplayTasks() {
	return (
		<div className="container">
			<h1 className="heading">Tasks</h1>
			<div className="sectionContainer">
				<div className="blocks">
					<div className="task">
						<h2 className="heading">Progress Heading</h2>
						<p>will add the tasks from context here.</p>
					</div>
					<button className="new"> + New One</button>
				</div>
			</div>
		</div>
	)
}
