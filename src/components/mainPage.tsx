import * as React from 'react'

import SearchBox from './searchBox'

import CSS from '../styles/mainPage.module.css'

const MainPage: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <div className={CSS.mainPage}>
            <h1>RulesLawyer</h1>
            <div>
                <SearchBox/>
            </div>
        </div>
    )
}

export default MainPage