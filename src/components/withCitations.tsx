import * as React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Citation } from '../model/model'

interface Props {
    text: string,
    citations: Citation[],
    styleWrapper?: React.FunctionComponent,
    previousCitations?: Citation[]
}

const CitationLink = styled.span`
    color: #696969;
    text-decoration: underline;

    :hover {
        text-decoration: underline;
        color: black;
    }
`

const WithCitations: React.FunctionComponent<Props> = ({text, citations, styleWrapper = CitationLink, previousCitations = []}: Props ) => {

    if(citations.length === 0){
        return <Fragment>{text}</Fragment>
    }

    let Wrapper: React.FunctionComponent = styleWrapper || Fragment

    let citationMatches: {match: string, body: Citation, used: boolean}[] = citations.map((citation, index) => {
        return {
            match: `(${citation.citationText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
            body: citation,
            used: false
        }
    })

    let filteredCitations: typeof citationMatches = citationMatches.filter((group) => {
        for(let previous of previousCitations) {
            if(previous.ruleIndex === group.body.ruleIndex && !text.match(new RegExp(`^${group.match}`, 'i'))) {
                return false
            }
        }
        return true
    })

    filteredCitations.sort((a, b) => b.body.citationText.length - a.body.citationText.length)

    // console.log(`generating ${citations.length} citations for: ${text}`)
    // console.log(citations)

    let fullMatch: RegExp = new RegExp(`${filteredCitations.map(pair => pair.match).join('|')}`, 'gmi')

    let splitText: string[] = text.split(fullMatch).filter(element => element !== undefined)
    // console.log(splitText)

    return(
        <Fragment>
            {splitText.map((segment, index) => {
                if(segment.match(fullMatch)) {
                    // console.log(`found a match for ${segment}`)
                    for(let citation of citationMatches) {
                        if(!citation.used && segment.match(new RegExp(citation.match, 'gmi'))) {
                            // console.log(`${segment} matches ${citation.body.citationText}`)
                            citation.used = true
                            return <Link key={index} to={`/glossary/${citation.body?.ruleSource}/${citation.body?.ruleIndex}`}><Wrapper>{segment}</Wrapper></Link>
                        }
                    }
                }
                return <Fragment key={index}>{segment}</Fragment>
            })}
        </Fragment>
    )
}

export default WithCitations