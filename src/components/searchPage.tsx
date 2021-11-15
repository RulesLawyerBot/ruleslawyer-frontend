import * as React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import SearchBox from './searchBox'
import ResultsList from './resultsList'
import HomeButton from './homeButton'

import CSS from '../styles/searchPage.module.css'

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
    text: string,
    previousIndex: number,
    nextIndex: number
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
    const [loading, setLoading] = useState<boolean>(false)

    const fetchRules = async () => {

        if(query === null) {
            setRules([])
            return
        }

        setLoading(true)
        setRules([])

        let url: URL = new URL("https://ruleslawyer-api.herokuapp.com/api/search")
        let params = {
            keywords: query.split(' ').toString(),
        }

        url.search = new URLSearchParams(params).toString()
        console.log(url.toString())

        let response = await fetch(url.href)        
        if(response.status != 200) {
            setMessage(`The server returned an error. (Error code ${response.status})`)
            setLoading(false)
            return
        }

        let body: any = await response.json()
        let data: RLReturnData = body as RLReturnData

        if(data.rules.length > 0) {
            setRules(data.rules)
            setMessage(`Showing ${data.rules.length} results for ${query}.`)
            setKeywords(data.request.keywords)
            setLoading(false)
        } else {
            setMessage(`Search for ${query} returned no results`)
        }
    }

    useEffect((): void => {
        fetchRules()
    }, [query])

    return (
        <div>
            <div className={CSS.searchBarContainer}>
                <HomeButton/>
                <SearchBox/>
            </div>
            <div className={CSS.body}>
                {/* {message? message : null} */}
                {loading? <div className={CSS.loading}><div className={CSS.loadingAnimation}></div><div className={CSS.loadingText}>Loading</div></div>: null}
                <ResultsList rules={rules} keywords={keywords}/>
            </div>
        </div>
    )
}

export default SearchPage