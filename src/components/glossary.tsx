import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { RuleData } from './searchPage'

import GlossarySidebar from './glossarySidebar'
import Expandable from './expandable'
import { API_URL } from './app'

import CSS from '../styles/glossary.module.css'
import RuleCSS from '../styles/rule.module.css'

export const rulesDocList: Record<string, string> = {
    CR: 'Comprehensive Rules', 
    IPG: 'Infraction Procedure Guide',
    MTR: 'Magic Tournament Rules',
    JAR: 'Judging At Regular Document',
    OATH: 'Oathbreaker Rules',
    DIPG: 'Digital Infration Procedure Guide',
    DMTR: 'Digital Magic Tournament Rules'
}


export interface RuleDataIncomplete extends RuleData {
    hasFullRules: boolean
}

const Glossary: React.FunctionComponent = (): React.ReactElement => {

    const { id: currentDoc } = useParams<{id: string}>()

    const [rules, setRulesDirect] = useState<Map<string, Map<number, RuleDataIncomplete>>>(new Map())

    const setRules = (document: string, data: Map<number, RuleDataIncomplete>) => {
        setRulesDirect(new Map(rules.set(document, data)))
    }

    const setRuleData = (document: string, ruleIndex: number, data: RuleDataIncomplete) => {
        setRulesDirect(new Map(rules.set(document, rules.get(document).set(ruleIndex, data))))
    }

    const fetchRuleList = async () => {
        if(rulesDocList[currentDoc] === null) {
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

    let ruleElements: React.ReactElement[] = []

    let currentDocItems: Map<number, RuleDataIncomplete> = rules.get(currentDoc)
    if(currentDocItems) {
        currentDocItems.forEach((rule: RuleDataIncomplete) => {
            ruleElements.push(<Expandable key={rule.ruleIndex} label={rule.text} contents={rule} getData={fetchRuleData} />)
        }) 
    }

    let glossaryDisplay: React.ReactElement = <div className={CSS.glossaryContainer}>
        <div className={CSS.glossaryTitle}>
            <span className={RuleCSS.ruleSource}>{currentDoc}</span>
            {rulesDocList[currentDoc]}
        </div>
        {ruleElements}
    </div>

    return (
        <div>
            <GlossarySidebar/>
            {currentDocItems && currentDocItems.size > 0 ? glossaryDisplay : null}
        </div>
    )
}

export default Glossary