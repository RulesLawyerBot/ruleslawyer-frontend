import * as React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import SearchBox from './searchBox'
import ResultsList from './resultsList'

interface RLReturnData {
    request: {
        pageNumber: number,
        ruleRequestCategory: string,
        ruleSource: string,
        keywords: string[]
    },
    rules: RuleData[]
}

export interface RuleData{
    parentIndices: number[],
    ruleIndex: number,
    parentText: string,
    ruleSource: string,
    subRules: RuleData[],
    text: string
}

const SearchPage: React.FunctionComponent<{}> = (): React.ReactElement => {
    const useQuery = ():[string] => {
        let params = new URLSearchParams(useLocation().search)
        return [params.get('q')]
    }
    const [query] = useQuery()
    const [rules, setRules] = useState<RuleData[]>([])
    const [message, setMessage] = useState<string>('')
    const [keywords, setKeywords] = useState<string[]>([])

    const fetchRules = async () => {

        if(query === null) {
            setRules([])
            return
        }

        console.log('fetching rules')
        let url: URL = new URL("http://ruleslawyer-api.herokuapp.com/api/search")
        let params = {
            keywords: query.split(' ').toString(),
        }

        console.log(params.keywords)
        url.search = new URLSearchParams(params).toString()

        console.log(url.href)
        let response = await fetch(url.href)
        let body: any = await response.json()
        let data: RLReturnData = body as RLReturnData

        if(data.rules.length > 0) {
            let newRules: RuleData[] = data.rules
            setRules(data.rules)
            setMessage(`Showing ${data.rules.length} results for ${query}`)
            setKeywords(data.request.keywords)
        } else {
            setMessage(`Search for ${query} returned no results`)
        }

        console.log(data.rules)
    }

    useEffect((): void => {
        fetchRules()
    }, [query])

    return (
        <div>
            <SearchBox/>
            <ResultsList rules={rules} keywords={keywords}/>
        </div>
    )
}

export default SearchPage