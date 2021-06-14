import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import SearchPage from './searchPage'
import MainPage from './mainPage'
import TopBar from './topBar'
import RulePage from './rulePage'

import CSS from '../styles/app.module.css'

export function App(): React.ReactElement {
    return(
        <div className={CSS.app }>
            <Router>
                <TopBar/>
                <Switch>
                    <Route exact path='/'>
                        <MainPage/>
                    </Route>
                    <Route path='/search'>
                        <SearchPage/>
                    </Route>
                    <Route exact path='/rule/' render={()=> <Link to='/rule/0'>Go to Rule</Link>}/>
                    <Route path='/rule/:id' component={RulePage}/>
                    <Route component={()=> <h1>NOT FOUND</h1>}/>
                </Switch>
            </Router>
        </div>
    )
}

export const render = (): void => { ReactDOM.render(<App/>, document.getElementById('react-app-root')) }