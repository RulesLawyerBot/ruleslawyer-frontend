import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import { Fragment } from 'react'
import styled from 'styled-components'

import SearchPage from './searchPage'
import MainPage from './mainPage'
import RulePage from './rulePage'
import Glossary from './glossary'
import NotFound from "./notfound"
import About from "./about"
import BotsPage from './botsPage'
import Footer from './footer'
import { Helmet } from 'react-helmet'

import GlobalStyle from '../styles/globalStyles'

export const API_URL = process.env.LOCAL_SERVER || window.location.origin

const BodyContainer = styled.div`
    flex-grow: 1;
    margin-left: 2vw;
    margin-right: 2vw;

    @media (min-width: 992px) {
        margin-left: 13vw;
        margin-right: 13vw;
    }
`

const Container = styled.div`
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    min-height: 100vh;
`

export function App(): React.ReactElement {
    return(
        <Fragment>
            <GlobalStyle/>
            <Helmet>
                <title>RulesLawyer</title>
            </Helmet>
            <Container>
                <Router>
                    <BodyContainer>
                        <Switch>
                            <Route exact path='/'>
                                <MainPage/>
                            </Route>
                            <Route path='/search'>
                                <SearchPage/>
                            </Route>
                            <Route path='/rule/:id' component={RulePage}/>
                            <Route path='/glossary/:id?/:heading?' component={Glossary}/>
                            <Route path='/about' component={About}/>
                            <Route path='/bots' component={BotsPage}/>
                            <Route path='*'component={NotFound}/>
                        </Switch>
                    </BodyContainer>
                    <Footer/>
                </Router>
            </Container>
        </Fragment>
    )
}

export const render = (): void => { ReactDOM.render(<App/>, document.getElementById('react-app-root')) }