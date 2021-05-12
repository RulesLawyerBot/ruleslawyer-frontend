import * as React from 'react'

import { Fragment } from 'react'

import SearchBox from './searchBox'
import RuleDisplay from './ruleDisplay'
import ResultsList from './resultsList'

import * as sampleData from '../../sampleData.json'

interface State {
    displayedRules: RuleData[],
    statusMessage: string
}

interface Props {
    
}

interface RLReturnData {
    // lastPageNumber: number,
    request: {
        pageNumber: number,
        ruleRequestCategory: string,
        ruleSource: string,
        keywords: string[]
    },
    rules: RuleData[]
}

export interface RuleData{
    parentText: string,
    ruleSource: string,
    subRules: RuleData[],
    text: string
}

export class RuleSearch extends React.Component<{}, State> {

    state: State = sampleData as State

    private async getRules(query: string): Promise<void> {
        let url: URL = new URL("http://ruleslawyer-api.herokuapp.com/api/search")
        let params = {
            keywords: query
        }
        url.search = new URLSearchParams(params).toString()


        let response = await fetch(url.href)
        let body: any = await response.json()
        let data: RLReturnData = body as RLReturnData

        if(data.rules.length > 0) {
            let newRules: RuleData[] = data.rules
            this.setState({displayedRules: newRules, statusMessage: `Showing ${data.rules.length} results for "${query}".`})
        } else {
            this.setState({statusMessage: `Search for "${query}" returned no results.`})
        }
    }
    
    render(): React.ReactElement {
        return (
            <Fragment>
                <SearchBox onSubmit={this.getRules.bind(this)}/>
                <h5>{this.state.statusMessage}</h5>
                <ResultsList rules={this.state.displayedRules}/>
            </Fragment>
        )
    }

}

export default RuleSearch