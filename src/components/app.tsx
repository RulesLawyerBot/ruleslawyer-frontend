import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'

import SearchPage from './searchPage'
import MainPage from './mainPage'
import TopBar from './topBar'

export function App(): React.ReactElement {
    return(
        <div>
            <Router>
                <TopBar/>
                <Switch>
                    <Route exact path="/">
                        <MainPage/>
                    </Route>
                    <Route path="/search">
                        <SearchPage/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export const render = (): void => { ReactDOM.render(<App/>, document.getElementById('react-app-root')) }