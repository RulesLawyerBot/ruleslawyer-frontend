import * as React from 'react'

import RuleDisplay from './ruleDisplay'

import { RuleData } from '../app'

interface Props {
    rules: RuleData[]
}

function ResultsList(props: Props): React.ReactElement {
    let { rules } = props

    return(
        <div>
            {rules.map((rule: RuleData, index: number) => <RuleDisplay key={index.toString()} rule={rule}/>)}
        </div>
    )
}

export default ResultsList