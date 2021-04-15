import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SearchBox from './components/searchBox'

interface State {
    displayedRules: RuleData[]
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

interface RuleData{
    parentText: string,
    ruleSource: string,
    subRules: RuleData[],
    text: string
}

export class App extends React.Component<{}, State> {

    state: State = {
        displayedRules: []
    }

    private async getRules(query: string): Promise<void> {
        let url: URL = new URL("http://ruleslawyer-api.herokuapp.com/search")
        let params = {
            keywords: query
        }
        url.search = new URLSearchParams(params).toString()

        console.log(`fetching from ${url}`)

        let response = await fetch(url.href)
        let body: any = await response.json()
        let data: RLReturnData = body as RLReturnData

        let newRules: RuleData[] = data.rules

        this.setState({displayedRules: newRules})

        console.log(this.state.displayedRules)
    }
    
    render(): React.ReactElement {
        return (
            <SearchBox onSubmit={this.getRules.bind(this)}/>
        )
    }

}

export const render = (): void => { ReactDOM.render(<App/>, document.getElementById('react-app-root')) }