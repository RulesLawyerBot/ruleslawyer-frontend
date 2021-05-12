import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom'

import RuleSearch from './ruleSearch'

function Blargle(): React.ReactElement {
    let location = useLocation()

    console.log('blargel')
    return(
        <div>
            {location.pathname}
        </div>
    )
}

export function App(): React.ReactElement {
    return(
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <h1>I LOVE MY WIFE</h1>
                    </Route>
                    <Route path="/search">
                        <RuleSearch/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export const render = (): void => { ReactDOM.render(<App/>, document.getElementById('react-app-root')) }