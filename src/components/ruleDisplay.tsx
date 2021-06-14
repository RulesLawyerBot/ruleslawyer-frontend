import * as React from 'react'
import { RuleData } from './searchPage'
import { Fragment } from 'react'

import CSS from '../styles/rule.module.css'
import { Link } from 'react-router-dom'

interface Props {
    rule: RuleData,
    keywords?: string[],
    linkToRule?: boolean
}

const RuleDisplay: React.FunctionComponent<Props> = ({rule, keywords = [], linkToRule=false}: Props): React.ReactElement => {
    const { subRules, ruleSource, text, parentIndices, ruleIndex }: RuleData = rule

    console.log(rule)
    
    let index: number = parentIndices.length > 0 ? parentIndices[parentIndices.length - 1] : ruleIndex

    let header: string = rule.parentText? rule.parentText: text

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
        <div className={`${CSS.ruleBody} ${CSS.ruleContainer}`}>
            <h3>{linkToRule ? <Link to={`/rule/${index}`}>{header}</Link> : header}</h3>
            {body}
        </div>
    )
}

export default RuleDisplay