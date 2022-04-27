import * as React from 'react'
import { RuleData } from '../model/model'
import { Fragment } from 'react'
import styled from 'styled-components'
import Highlighted from './highlighted'
import WithCitations from './withCitations'
import { Link } from 'react-router-dom'

const Indented = styled.p`
    margin-left: 0.75em;
    padding-left: 0.25em;
    border-left: 1px solid lightgrey;
`

const RuleBody = styled.div`
    color: black;
    text-decoration: none;
`

const RuleHeader = styled.h2`
    font-size: larger;
    font-weight: bold;
    padding-bottom: 10px;
    margin-bottom: 4px;
    border-bottom: 1px solid black;
`

const RuleSource = styled.span`
    margin-right: 0.5em;
    font-weight: normal;
    color: lightgrey;
`

interface Props {
    rule: RuleData,
    hasTitle?:boolean
}

const FormattedRule: React.FunctionComponent<Props> = ({ rule, hasTitle=false }: Props): React.ReactElement => {
    const { subRules, ruleSource, text, parentIndices, ruleIndex, parentText, citations }: RuleData = rule

    const title = parentText[0] || text
    const titleIndex: number = parentIndices.length > 0 ? parentIndices[parentIndices.length - 1] : ruleIndex
    let body: React.ReactElement = null

    //only display a subheader if there is parent text for the header
    //subheader should be rule text for single nested rules, second layer of parent text for double nested rules
    //this will never display for top level rules, but may for search results
    let subHeaderText: string = parentText.length > 0 ? parentText[1] || text : null
    // let subHeader: React.ReactElement = parentText.length > 0 ? <Highlighted text={parentText[1] || text} keywords={keywords} />: null
    console.log(rule)
    console.log(subHeaderText)

    //if subrule has no subrules and only one instance of parent text, the subheader will already contain necessary info
    if(subRules.length === 0) {
        body = <Fragment>
            {subHeaderText ? <h4 id={`rule${ruleIndex}`}><WithCitations text={text} citations={citations}/></h4> : null}
            {parentText.length > 1 ? <Indented><WithCitations text={text} citations={citations}/></Indented> : null}
        </Fragment>
    } else {
        body = <Fragment>
            {subHeaderText ? <h4 id={`rule${ruleIndex}`}><WithCitations text={text} citations={citations}/></h4> : null}
            {subRules.map((sub: RuleData, index: number) => {
                let cited = <WithCitations text={sub.text} citations={sub.citations}/>
                if(sub.subRules.length === 0) {
                    return sub.parentText.length > 1 ? <Indented id={`rule${sub.ruleIndex}`} key={index}>{cited}</Indented> : <h4 id={`rule${sub.ruleIndex}`} key={index}>{cited}</h4>
                } else {
                    let currentSubheader = sub.text
                    return (
                        <Fragment key={index}>
                            <h4 id={`rule${sub.ruleIndex}`}>
                                <WithCitations text={currentSubheader} citations={sub.citations}/>
                            </h4>
                            {sub.subRules.map((sub2: RuleData, subIndex: number) => <Indented id={`rule${sub2.ruleIndex}`} key={subIndex}><WithCitations text={sub2.text} citations={sub2.citations}/></Indented>)}
                        </Fragment>
                    )
                }
            })}
        </Fragment>
    }
    
    return (
        <RuleBody>
            {hasTitle ? <RuleHeader>
                <RuleSource>{ruleSource}</RuleSource>
                <Link to={`/glossary/${ruleSource}/${titleIndex}`}>{title}</Link>
            </RuleHeader> : null}
            {body}
        </RuleBody>
    )
}

export default FormattedRule