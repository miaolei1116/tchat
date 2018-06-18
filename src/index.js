import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom"


import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/authroute/authroute'
import BOSSinfo from './container/BOSSinfo/BOSSinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './components/dashboard/dashboard'
import reducers from './reducers'
import './config'
import './index.css'

const store = createStore(reducers, applyMiddleware(thunk))



// 页面  boss   genius   me   msg
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/login' component={Login}></Route>
					<Route path='/geniusinfo' component={Geniusinfo}></Route>
					<Route path='/register' component={Register}></Route>
					<Route path='/bossinfo' component={BOSSinfo}></Route>
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>)
	,document.getElementById('root')
)
		

