import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TaskContextProvider from './contexts/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
	<TaskContextProvider>
		<App />
	</TaskContextProvider>
)
