import * as React from 'react'
import { Link } from 'react-router-dom'

import CSS from '../styles/homeButton.module.css'

const HomeButton: React.FunctionComponent<{}> = (): React.ReactElement => {
    return <Link to='/'><div className={CSS.homeButton}></div></Link>
}

export default HomeButton