import * as React from 'react'

import RuleDisplay from './ruleDisplay'
import { RuleData } from './searchPage'

import CSS from '../styles/resultList.module.css'

interface Props {
    rules: RuleData[],
    keywords: string[]
}

const ResultsList: React.FunctionComponent<Props> = (props: Props): React.ReactElement => {
    let { rules, keywords } = props

    return(
        <div className={CSS.resultList}>
            {rules.map((rule: RuleData, index: number) => <RuleDisplay key={index.toString()} rule={rule} keywords={keywords} linkToRule={true}/>)}
        </div>
    )
}

export default ResultsList