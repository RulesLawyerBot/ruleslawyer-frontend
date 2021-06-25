import * as React from 'react'
import { RuleData } from './searchPage'
import { Fragment } from 'react'

import CSS from '../styles/rule.module.css'
import { Link } from 'react-router-dom'

import Highlighted from './highlighted'

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
                    return <p key={index.toString()}><Highlighted text={rule.text} keywords={keywords}/></p>
                } else {
                    return (
                        <Fragment key={index.toString()}>
                            <h4><Highlighted text={rule.text} keywords={keywords}/></h4>
                            {rule.subRules.map((subRule: RuleData, subIndex: number) => <p key={`sub${subIndex.toString()}`}><Highlighted text={subRule.text} keywords={keywords}/></p>)}
                        </Fragment>
                    )
                }
            })}
        </div>
    }
    
    return (
        <div className={`${CSS.ruleBody} ${CSS.ruleContainer}`}>
            <h3>{linkToRule ? <Link to={`/rule/${index}`}><Highlighted text={header} keywords={keywords}/></Link> : header}</h3>
            {body}
        </div>
    )
}

export default RuleDisplay