import * as React from 'react'

import SearchBox from './searchBox'

import CSS from '../styles/mainPage.module.css'

const MainPage: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <div className={CSS.mainPage}>
            <h1><img src="favicon.png" alt="OWL" width="30"></img>RulesLawyer</h1>
            <h2>A search engine for Magic: The Gathering rules</h2>
            <div>
                <SearchBox/>
            </div>
            <div>Search for citations, keywords, or a combination!</div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>About | Patreon</div>
            <br></br>
            <div>Bots | Discord | Slack</div>
        </div>
    ) //TODO remove bar from front page and set up these links
}

export default MainPage