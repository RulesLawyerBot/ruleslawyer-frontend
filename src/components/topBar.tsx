import * as React from 'react'

import { Link } from 'react-router-dom'

import CSS from '../styles/topBar.module.css'


const TopBar: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <div className={CSS.topBar}>
            <Link to="/donate" className={CSS.topBarLink}>Donate!</Link>
            <Link to="/discord" className={CSS.topBarLink}>Get RulesLawyer for Discord</Link>
            <Link to="/slack" className={CSS.topBarLink}>Get RulesLawyer for Slack</Link>
        </div>
    )
}

export default TopBar