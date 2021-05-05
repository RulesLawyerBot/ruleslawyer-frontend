import * as React from 'react'
import { RuleData } from '../app'
import { Fragment } from 'react'

import css from '../styles/rule.module.css'

interface Props {
    rule: RuleData
}

function RuleDisplay(props: Props): React.ReactElement {
    const { parentText, subRules, ruleSource, text }: RuleData = props.rule
    
    let header: string = parentText? parentText: text

    let body: React.ReactElement

    if(subRules.length === 0) {
        body = <div><p>{text}</p></div>
    } else {
        body = <div>
            {subRules.map((rule: RuleData, index: number) => {
                if(rule.subRules.length === 0){
                    return <p key={index.toString()}>{rule.text}</p>
                } else {
                    return (
                        <Fragment key={index.toString()}>
                            <h4>{rule.text}</h4>
                            {rule.subRules.map((subRule: RuleData, subIndex: number) => <p key={`sub${subIndex.toString()}`}>{subRule.text}</p>)}
                        </Fragment>
                    )
                }
            })}
        </div>
    }
    
    return (
        <div className={`${css.ruleBody} ${css.ruleContainer}`}>
            <h3>{header}</h3>
            {body}
        </div>
    )
}

export default RuleDisplay