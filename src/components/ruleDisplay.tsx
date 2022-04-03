import * as React from 'react'
import { Citation, RuleData } from '../model/model'
import { Fragment } from 'react'

import CSS from '../styles/rule.module.css'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

import Highlighted from './highlighted'
import WithCitations from './withCitations'
import styled from 'styled-components'

interface Props {
    rule: RuleData,
    keywords?: string[],
    linkToRule?: boolean
}

const CitationLink = styled.span`
    color: #696969;
    text-decoration: none;

    :hover {
        text-decoration: underline;
        color: black;
    }
`

const RuleDisplay: React.FunctionComponent<Props> = ({rule, keywords = [], linkToRule=false}: Props): React.ReactElement => {
    const { subRules, ruleSource, text, parentIndices, ruleIndex, parentText, citations }: RuleData = rule    
    let index: number = parentIndices.length > 0 ? parentIndices[parentIndices.length - 1] : ruleIndex

    let header: string = parentText[0] || text

    let body: React.ReactElement = null

    let usedCitations: Citation[] = []
    const addCitations: (citations: Citation[]) => Citation[] = (citations: Citation[]) => {
        let prev = usedCitations
        usedCitations = [...usedCitations, ...citations]
        return prev
    }

    //only display a subheader if there is parent text for the header
    //subheader should be rule text for single nested rules, second layer of parent text for double nested rules
    let subHeaderID = parentText[1] ? parentIndices[0] : ruleIndex
    let subHeaderText: string = parentText.length > 0 ? parentText[1] || text : null
    let subHeader: React.ReactElement = subHeaderText ? <WithCitations text={subHeaderText} citations={citations} styleWrapper={CitationLink} previousCitations={addCitations(citations)}/> : null

    if(subRules.length === 0) {
        if(parentText.length > 1) {
            body = <div><p className={CSS.indented}><WithCitations text={text} citations={citations} styleWrapper={CitationLink} previousCitations={addCitations(citations)}/></p></div>
        }
    } else {
        body = <div>
            {subRules.map((sub: RuleData, i: number) => {
                if(sub.subRules.length === 0){
                    if(sub.parentText.length > 1) {
                        return <p className={CSS.indented} key={i.toString()}><WithCitations text={sub.text} citations={sub.citations} styleWrapper={CitationLink} previousCitations={addCitations(sub.citations)}/></p>
                    } else {
                        return <h4 key={i.toString()} id={`${sub.ruleIndex}`}><WithCitations text={sub.text} citations={sub.citations} styleWrapper={CitationLink} previousCitations={addCitations(sub.citations)}/></h4>
                    }
                } else {
                    let currentRuleSubheader: string = sub.text
                    return (
                        <Fragment key={i.toString()}>
                            <h4 id={`${sub.ruleIndex}`}>
                                {/* {linkToRule ? <Link to={`/glossary/${rule.ruleSource}/${rule.ruleIndex}`}>{currentRuleSubheader}</Link> : currentRuleSubheader} */}
                                <WithCitations text={currentRuleSubheader} citations={sub.citations} styleWrapper={CitationLink} previousCitations={addCitations(sub.citations)}/>
                            </h4>
                            <div className={CSS.indented}>
                                {sub.subRules.map((sub2: RuleData, subIndex: number) => <p key={`sub${subIndex.toString()}`}><WithCitations text={sub2.text} citations={sub2.citations} styleWrapper={CitationLink} previousCitations={addCitations(sub2.citations)}/></p>)}
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
                <Link to={`/glossary/${ruleSource}/${index}`}>{header}</Link>
            </h2>
            {subHeader? <h4>{subHeader}</h4> : null}
            {body}
        </div>
    )
}

export default RuleDisplay