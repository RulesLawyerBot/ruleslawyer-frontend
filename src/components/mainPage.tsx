import * as React from 'react'

import SearchBox from './searchBox'

const MainPage: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <React.Fragment>
            <h1>RulesLawyer</h1>
            <div>
                <SearchBox/>
            </div>
        </React.Fragment>
    )
}

export default MainPage