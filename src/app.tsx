import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Fragment } from 'react'

import SearchBox from './components/searchBox'
import RuleDisplay from './components/ruleDisplay'

interface State {
    displayedRules: RuleData[],
    statusMessage: string
}

interface RLReturnData {
    lastPageNumber: number,
    request: {
        pageNumber: number,
        ruleRequestCategory: string,
        ruleSource: string
    },
    rules: RuleData[]
}

export interface RuleData{
    parentText: string,
    ruleSource: string,
    subRules: RuleData[],
    text: string
}

export class App extends React.Component<{}, State> {

    state: State = {
        displayedRules: [],
        statusMessage: null
    }

    private async getRules(query: string): Promise<void> {
        let url: URL = new URL("http://ruleslawyer-api.herokuapp.com/search")
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

        console.log(this.state.statusMessage)
        console.log(this.state.displayedRules)
    }
    
    render(): React.ReactElement {
        return (
            <Fragment>
                <SearchBox onSubmit={this.getRules.bind(this)}/>
                <h5>{this.state.statusMessage}</h5>
                <div id="results">
                    {this.state.displayedRules.map((rule: RuleData, index: number) => <RuleDisplay key={index.toString()} rule={rule}/>)}
                </div>
            </Fragment>
        )
    }

}

export const render = (): void => { ReactDOM.render(<App/>, document.getElementById('react-app-root')) }