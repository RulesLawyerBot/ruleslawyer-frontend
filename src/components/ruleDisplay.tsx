import * as React from 'react'
import { RuleData } from './searchPage'
import { Fragment } from 'react'

import CSS from '../styles/rule.module.css'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

import Highlighted from './highlighted'
import { rulesDocList } from './glossary'

interface Props {
    rule: RuleData,
    keywords?: string[],
    linkToRule?: boolean
}

const RuleDisplay: React.FunctionComponent<Props> = ({rule, keywords = [], linkToRule=false}: Props): React.ReactElement => {
    const { subRules, ruleSource, text, parentIndices, ruleIndex, parentText }: RuleData = rule    
    let index: number = parentIndices.length > 0 ? parentIndices[parentIndices.length - 1] : ruleIndex

    let header: string = parentText[0] || text

    let body: React.ReactElement = null

    //only display a subheader if there is parent text for the header
    //subheader should be rule text for single nested rules, second layer of parent text for double nested rules
    let subHeaderID = parentText[1] ? parentIndices[0] : ruleIndex
    let subHeader: React.ReactElement = parentText.length > 0 ? <Highlighted text={parentText[1] || text} keywords={keywords} />: null

    if(subRules.length === 0) {
        if(parentText.length > 1) {
            body = <div><p className={CSS.indented}><Highlighted text={text} keywords={keywords}/></p></div>
        }
    } else {
        body = <div>
            {subRules.map((rule: RuleData, i: number) => {
                if(rule.subRules.length === 0){
                    if(rule.parentText.length > 1) {
                        return <p className={CSS.indented} key={i.toString()}><Highlighted text={rule.text} keywords={keywords}/></p>
                    } else {
                        return <h4 key={i.toString()} id={`${rule.ruleIndex}`}><Highlighted text={rule.text} keywords={keywords}/></h4>
                    }
                } else {
                    let currentRuleSubheader: React.ReactElement = <Highlighted text={rule.text} keywords={keywords}/>
                    return (
                        <Fragment key={i.toString()}>
                            <h4 id={`${rule.ruleIndex}`}>
                                {linkToRule ? <HashLink smooth to={`/rule/${index}#${rule.ruleIndex}`}>{currentRuleSubheader}</HashLink> : currentRuleSubheader}
                            </h4>
                            <div className={CSS.indented}>
                                {rule.subRules.map((subRule: RuleData, subIndex: number) => <p key={`sub${subIndex.toString()}`}><Highlighted text={subRule.text} keywords={keywords}/></p>)}
                            </div>
                        </Fragment>
                    )
                }
            })}
        </div>
    }

    header = header.trimEnd()
    // let highlightedHeader = <Highlighted text={header} keywords={[]}/>
    
    return (
        <div className={`${CSS.ruleBody} ${CSS.ruleContainer}`}>
            <h2 className={CSS.ruleHeader}>
                <span className={CSS.ruleSource}>{ruleSource}</span>
                {linkToRule ? <Link to={`/rule/${index}`}>{header}</Link> : header}
            </h2>
            {subHeader ? <h4 id={`${subHeaderID}`}>{linkToRule? <HashLink smooth to={`/rule/${index}#${subHeaderID}`}>{subHeader}</HashLink> : subHeader}</h4> : null}
            {body}
        </div>
    )
}

export default RuleDisplay