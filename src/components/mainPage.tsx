import * as React from 'react'

import SearchBox from './searchBox'

import CSS from '../styles/mainPage.module.css'

const MainPage: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <div className={CSS.mainPage}>
            <h1><img src="favicon.png" alt="OWL" width="30"/>RulesLawyer</h1>
            <h2>An advanced search engine for Magic: The Gathering rules</h2>
            <div>
                <SearchBox/>
            </div>
            <p>Search for citations, keywords, or a combination!</p>
        </div>
    )
}

export default MainPage