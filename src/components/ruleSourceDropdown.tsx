import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDownOutline } from 'react-ionicons'

import { rulesDocList } from './glossary'

import RuleCSS from '../styles/rule.module.css'
import CSS from '../styles/glossary.module.css'

const RuleSourceDropdown: React.FunctionComponent = (): React.ReactElement => {
    
    const { id } = useParams<{id: string}>()
    const [open, setOpen] = useState(!(id in rulesDocList))

    const onClick = () => {
        if(id in rulesDocList) {
            setOpen(!open)
        }
    }

    let docListItems: React.ReactElement[] = []
    for(let key in rulesDocList) {
        if(key !== id) {
            docListItems.push(
                <div key={key} className={CSS.dropdownItem}>
                    <Link to={`/glossary/${key}`}>{rulesDocList[key]}<span className={RuleCSS.ruleSource}>{` (${key})`}</span></Link>
                </div>
            )
        }
    }

    useEffect(() => {
        if(id in rulesDocList){
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [id])


    return(
        <div className={CSS.glossaryTitle}>
            <div onClick={onClick} className={CSS.clickable}>
                <span className={RuleCSS.ruleSource}>{id in rulesDocList ? id : null}</span>
                {rulesDocList[id] || 'Select a Document'}
                <div className={CSS.dropdownIconPadding}>
                    <ChevronDownOutline
                        color={'#000000'}
                        title={'Expand'}
                        cssClasses={`${CSS.dropdownIcon} ${open? CSS.rotated : ''}`}
                    />
                </div>
            </div>
            <div className={`${CSS.dropdownItemContainer} ${open? '' : CSS.closed}`}>
                {docListItems}
            </div>
        </div>
    )
}

export default RuleSourceDropdown