import * as React from 'react'
import { Link, useParams } from 'react-router-dom'

import { rulesDocList } from './glossary'

import CSS from '../styles/glossary.module.css'

const GlossarySidebar: React.FunctionComponent = (): React.ReactElement => {

    let { id } = useParams<{id: string}>()

    let docListItems: React.ReactElement[] = []

    for(let key in rulesDocList) {
        docListItems.push(
            <li key={key}><Link to={`/glossary/${key}`} className={`${CSS.sidebarItem} ${id === key? CSS.itemSelected : null}`}>
                {rulesDocList[key]}
            </Link></li>)
    }


    return (
        <ul className={CSS.sidebarContainer}>
            {docListItems}
        </ul>
    )
}

export default GlossarySidebar