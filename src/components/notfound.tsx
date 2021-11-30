import * as React from 'react'
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import CSS from '../styles/notfound.module.css'

const NotFound: React.FunctionComponent<{}> = (): React.ReactElement => {
    let location = useLocation()
    console.log(location.pathname)
    return(
        <div className={CSS.notfound}>
            <h1>Page Not Found</h1>
            <div>
                The page at {location.pathname} does not exist.
            </div>
            <Link to='/'>Home</Link>
        </div>
    )
}

export default NotFound;