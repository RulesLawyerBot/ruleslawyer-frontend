import * as React from 'react'
import { RuleData } from '../model/model'
import { Fragment } from 'react'
import styled from 'styled-components'
import Highlighted from './highlighted'
import WithCitations from './withCitations'

const Indented = styled.p`
    margin-left: 0.75em;
    padding-left: 0.25em;
    border-left: 1px solid lightgrey;
`

const CitationLink = styled.span`
    a {
        color: darkgray;
        text-decoration: underline;
    }
`

interface Props {
    rule: RuleData,
    hasTitle?:boolean
}

const RuleDisplay: React.FunctionComponent<Props> = ({ rule, hasTitle=false }: Props): React.ReactElement => {
    const { subRules, ruleSource, text, parentIndices, ruleIndex, parentText, citations }: RuleData = rule

    const title = parentText[0] || text
    let body: React.ReactElement = null

    //only display a subheader if there is parent text for the header
    //subheader should be rule text for single nested rules, second layer of parent text for double nested rules
    //this will never display for top level rules, but may for search results
    let subHeaderID = parentText[1] ? parentIndices[0] : ruleIndex
    // let subHeader: React.ReactElement = parentText.length > 0 ? <Highlighted text={parentText[1] || text} keywords={keywords} />: null

    //if subrule has no subrules and only one instance of parent text, the subheader will already contain necessary info
    if(subRules.length === 0) {
        if(parentText.length > 1) {
            body = <Indented><p><WithCitations text={text} citations={citations}/></p></Indented>
        }
    }
    
    return null;
}