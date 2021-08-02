import * as React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import CSS from '../styles/footer.module.css'

const Footer: React.FunctionComponent<{}> = (): React.ReactElement => {
    let shouldRender = !useRouteMatch('/').isExact

    if(!shouldRender){
        return null
    }

    return(
        <div className={CSS.footer}><Link to='/about'>About</Link> | <a href='https://www.patreon.com/ruleslawyer'>Patreon</a> | <Link to='/bots'>Chatbots</Link></div>
    )
}

export default Footer