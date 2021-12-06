import * as React from 'react'

import { useState, Fragment } from 'react'

import { RuleDataIncomplete } from './glossary'

import RuleCSS from '../styles/rule.module.css'
import CSS from '../styles/glossary.module.css'
import { RuleData } from './searchPage'


interface Props {
    label: string
    contents: RuleDataIncomplete
    // onClick: () => void
    getData: (index: number) => void
}

const Expandable: React.FunctionComponent<Props> = ({label, contents, getData}: Props) => {

    let [open, setOpen] = useState(false)

    let displayedRules: React.ReactElement = null
    
    if(open) {
        if(contents.hasFullRules) {
            displayedRules = (
            <div className={CSS.glossaryRuleBody}>
                {contents.subRules.map((rule: RuleData, index: number) => {
                    if(rule.subRules.length === 0) {
                        return <h4 key={index.toString()}>{rule.text}</h4>
                    } else {
                        console.log(`have ${rule.subRules.length} subrules for ${rule.text}`)
                        let subHeader: string = rule.text
                        return (
                            <Fragment key={index.toString()}>
                                <h4>{subHeader}</h4>
                                <div className={RuleCSS.indented}>
                                    {rule.subRules.map((subRule: RuleData, subIndex: number) => <p key={`sub${subIndex.toString()}`}>{subRule.text}</p>)}
                                </div>
                            </Fragment>
                        )
                    }
                })}
            </div>)
        } else {
            getData(contents.ruleIndex)
        }
    }

    return(
        <div>
            <div className={CSS.glossaryHeader} onClick={() => setOpen(!open)}>
                {label}
            </div>
            {open? contents.hasFullRules? displayedRules: "don't have data yet" : null}
        </div>
    )
}

export default Expandable