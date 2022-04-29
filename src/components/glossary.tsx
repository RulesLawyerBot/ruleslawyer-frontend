import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect, Fragment } from 'react'
import { RuleData } from '../model/model'

import GlossarySidebar from './glossarySidebar'
import Expandable from './expandable'
import RuleSourceDropdown from './ruleSourceDropdown'
import { API_URL } from './app'
import LoadingAnimation from './loadingAnimation'

import CSS from '../styles/glossary.module.css'
import RuleCSS from '../styles/rule.module.css'
import HomeButton from './homeButton'
import { Helmet } from 'react-helmet'

export const rulesDocList: Record<string, string> = {
    CR: 'Comprehensive Rules',
    CRG: 'Comprehensive Rules - Glossary',
    IPG: 'Infraction Procedure Guide',
    MTR: 'Magic Tournament Rules',
    JAR: 'Judging At Regular Document',
    // OATH: 'Oathbreaker Rules',
    DIPG: 'Digital Infration Procedure Guide',
    DMTR: 'Digital Magic Tournament Rules'
}


export interface RuleDataIncomplete extends RuleData {
    hasFullRules: boolean
}

const Glossary: React.FunctionComponent = (): React.ReactElement => {

    const { id: currentDoc, heading } = useParams<{id: string, heading: string}>()
    let navID = parseInt(heading)

    const [rules, setRulesDirect] = useState<Map<string, Map<number, RuleDataIncomplete>>>(new Map())

    const setRules = (document: string, data: Map<number, RuleDataIncomplete>) => {
        setRulesDirect(new Map(rules.set(document, data)))
    }

    const setRuleData = (document: string, ruleIndex: number, data: RuleDataIncomplete) => {
        setRulesDirect(new Map(rules.set(document, rules.get(document).set(ruleIndex, data))))
    }

    const fetchRuleList = async () => {
        if(rulesDocList[currentDoc] == null) {
            console.log('invalid document')
            return;
        }

        let url: URL = new URL(API_URL + '/api/index')
        let params = {
            ruleSource: currentDoc
        }
        url.search = new URLSearchParams(params).toString()

        let response = await fetch(url.href)
        let body: any = await response.json()
        let data: RuleDataIncomplete[] = (body as RuleData[]).map((rule: RuleData) => ({...rule, hasFullRules: false}))

        let newMap: Map<number, RuleDataIncomplete> = data.reduce<Map<number, RuleDataIncomplete>>((map: Map<number, RuleDataIncomplete>, rule: RuleDataIncomplete) => {
            map.set(rule.ruleIndex, rule)
            return map
        }, new Map())

        setRules(currentDoc, newMap)
    }

    const fetchRuleData = async (ruleIndex: number) => {
        let url: URL = new URL(API_URL + '/api/citation')
        let params = {
            index: ruleIndex.toString()
        }
        url.search = new URLSearchParams(params).toString()

        let response = await fetch(url.href)
        let body: any = await response.json()
        let ruleData: RuleDataIncomplete = {...body as RuleData, hasFullRules: true}
        setRuleData(ruleData.ruleSource, ruleData.ruleIndex, ruleData)
    }

    useEffect(() => {
        if(!rules.has(currentDoc)) {
            fetchRuleList()
        }
    }, [currentDoc])

    useEffect(() => {
        document.getElementById(`rule${navID}`)?.scrollIntoView({behavior: 'smooth'})
    }, [navID])

    let ruleElements: React.ReactElement[] = []

    let currentDocItems: Map<number, RuleDataIncomplete> = rules.get(currentDoc)
    if(currentDocItems) {
        currentDocItems.forEach((rule: RuleDataIncomplete) => {
            ruleElements.push(<Expandable key={rule.ruleIndex} label={rule.text} contents={rule} getData={fetchRuleData} />)
        }) 
    }

    return (
        <div>
            <Helmet>
                <title>{rulesDocList[currentDoc] || 'Documents'} | RulesLawyer</title>
            </Helmet>
            <div className={CSS.topBar}>
                <Link to="/"><img src='/favicon.png' height={30} width={30}/></Link>
                Document Index
            </div>
            <div className={CSS.glossaryContainer}>
                <RuleSourceDropdown/>
                <div className={CSS.glossaryBody}>
                    {currentDocItems && currentDocItems.size > 0 ? ruleElements : 
                        currentDoc in rulesDocList ? <div className={CSS.loading}><LoadingAnimation text='Loading'/></div> : null}
                </div>
            </div>
        </div>
    )
}

export default Glossary