import * as React from 'react'

import RuleDisplay from './ruleDisplay'
import FormattedRule from './formattedRule'
import { RuleData } from '../model/model'

import CSS from '../styles/resultList.module.css'
import styled from 'styled-components'

interface Props {
    rules: RuleData[],
    keywords: string[]
}

const RuleContainer = styled.div`
    border: solid;
    border-color: black;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: white;
`

const ResultsList: React.FunctionComponent<Props> = (props: Props): React.ReactElement => {
    let { rules, keywords } = props

    return(
        <div className={CSS.resultList}>
            {/* {rules.map((rule: RuleData, index: number) => <RuleDisplay key={index.toString()} rule={rule} keywords={keywords} linkToRule={true}/>)} */}
            {rules.map((rule: RuleData, index: number) => <RuleContainer key={index}>
                <FormattedRule rule={rule} hasTitle={true}/>
            </RuleContainer>)}
        </div>
    )
}

export default ResultsList