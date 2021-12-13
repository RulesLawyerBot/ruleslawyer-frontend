import * as React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDownOutline } from 'react-ionicons'

import { rulesDocList } from './glossary'

import RuleCSS from '../styles/rule.module.css'
import CSS from '../styles/glossary.module.css'

const RuleSourceDropdown: React.FunctionComponent = (): React.ReactElement => {

    const [open, setOpen] = useState(false)
    const { id } = useParams<{id: string}>()

    let docListItems: React.ReactElement[] = []
    for(let key in rulesDocList) {
        if(key !== id) {
            docListItems.push(
                <div key={key} className={CSS.dropdownItem}>
                    <Link to={`/glossary/${key}`}><span className={RuleCSS.ruleSource}>{id}</span>{rulesDocList[key]}</Link>
                </div>
            )
        }
    }

    return(
        <div className={CSS.glossaryTitle}>
            <div onClick={() => setOpen(!open)}>
                <span className={RuleCSS.ruleSource}>{id}</span>
                {rulesDocList[id]}
                <ChevronDownOutline
                    color={'#000000'}
                    title={'Expand'}
                />
            </div>
            <div className={`${CSS.dropdownItemContainer} ${open? '' : CSS.hidden}`}>
                {docListItems}
            </div>
        </div>
    )
}

export default RuleSourceDropdown