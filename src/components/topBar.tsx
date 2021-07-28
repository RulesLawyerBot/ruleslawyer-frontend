import * as React from 'react'

import { Link } from 'react-router-dom'

import CSS from '../styles/topBar.module.css'


const TopBar: React.FunctionComponent<{}> = (): React.ReactElement => {
    return( //TODO fix these
        <div className={CSS.topBar}>
            <Link to="https://www.patreon.com/ruleslawyer" className={CSS.topBarLink}>Donate!</Link>
            <Link to="https://discordapp.com/oauth2/authorize?client_id=590184543684788253&scope=bot&permissions=2147838016" className={CSS.topBarLink}>RulesLawyer for Discord</Link>
            <Link to="/slack" className={CSS.topBarLink}>RulesLawyer for Slack</Link>
        </div>
    )
}

export default TopBar