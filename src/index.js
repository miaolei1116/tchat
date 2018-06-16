import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"
import axios from 'axios'


import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/authroute/authroute'
import BOSSinfo from './container/BOSSinfo/BOSSinfo'
import reducers from './reducers'
import './config'
import './index.css'

const store = createStore(reducers, applyMiddleware(thunk))

function BOSS(){
	return <h2>BOSS 页面</h2>
}


ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					
					<Route path='/bossinfo' component={BOSSinfo}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>)
	,document.getElementById('root')
)
		

