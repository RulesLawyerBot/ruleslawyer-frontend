import * as React from 'react'
import { Link } from 'react-router-dom'

import SearchBox from './searchBox'

import CSS from '../styles/mainPage.module.css'

const MainPage: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <div className={CSS.mainPage}>
            <h1><img src="favicon.png" alt="OWL" width="30"/>RulesLawyer</h1>
            <h2>A search engine for Magic: The Gathering rules</h2>
            <div>
                <SearchBox/>
            </div>
            <p>Search for citations, keywords, or a combination!</p>
            <br></br>
            <br></br>
            <br></br>
            <div><Link to='/about'>About</Link> | <a href='https://www.patreon.com/ruleslawyer'>Patreon</a> | <Link to='/bots'>Chatbots</Link></div>
        </div>
    ) //TODO remove bar from front page and set up these links
}

export default MainPage