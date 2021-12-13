import * as React from 'react'

import { useState, useRef, useEffect, Fragment } from 'react'
import { useHistory, useParams } from 'react-router'

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

    const { heading, id: currentDoc } = useParams<{heading: string, id: string}>()
    const history = useHistory()
    let navID: number = parseInt(heading)
    let navToHere: boolean = navID >= contents.ruleIndex && navID < contents.nextIndex
    
    const [open, setOpen] = useState(navToHere)
    const ref = useRef<HTMLHeadingElement>(null)
    const getRef = (id: number) => {
        return id === navID ? ref : null
    }

    const onClick = () => {
        if(!open){
            history.push(`/glossary/${currentDoc}/${contents.ruleIndex}`)
        }
        setOpen(!open)
    }

    let displayedRules: React.ReactElement = null
    
    if(open) {
        if(contents.hasFullRules) {
            displayedRules = (
            <div className={CSS.glossaryRuleBody}>
                {contents.subRules.map((rule: RuleData, index: number) => {
                    if(rule.subRules.length === 0) {
                        return <h4 ref={getRef(rule.ruleIndex)} key={index.toString()}>{rule.text}</h4>
                    } else {
                        let subHeader: string = rule.text
                        return (
                            <Fragment key={index.toString()}>
                                <h4 ref={getRef(rule.ruleIndex)}>{subHeader}</h4>
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

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: 'smooth'})
    }, [contents.hasFullRules])

    return(
        <div>
            <div ref={getRef(contents.ruleIndex)} className={CSS.glossaryHeader} onClick={onClick}>
                {label}
            </div>
            {open? contents.hasFullRules? displayedRules: "don't have data yet" : null}
        </div>
    )
}

export default Expandable