import { useEffect, useState } from 'react'
import Form from './components/Form'
import './App.css'
import Result from './components/Result'

function App() {
	console.log(window.location.pathname)

	function ViewForm(){
		if(window.location.pathname == '/'){
			return <Form/>
		}else return
	}

	function ViewResult(){
		if(window.location.pathname == '/result'){
			return <Result/>
		}else return
	}
	return(
		<>
		<ViewForm/>
		<ViewResult/>
		</>
	)
}

export default App
