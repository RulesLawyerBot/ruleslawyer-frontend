import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import SearchBox from './searchBox'
import ResultsList from './resultsList'
import HomeButton from './homeButton'
import { API_URL } from './app'

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
    parentText: string[],
    ruleSource: string,
    subRules: RuleData[],
    text: string,
    previousIndex: number,
    nextIndex: number
}

const SearchPage: React.FunctionComponent<{}> = (): React.ReactElement => {

    const RESULTS_PER_PAGE = 15
    // const useQuery = ():[string] => {
    //     let params = new URLSearchParams(useLocation().search)
    //     return [params.get('q')]
    // }

    let params = new URLSearchParams(useLocation().search)
    
    const query = params.get('q')
    const page: number = parseInt(params.get('page')) || 1

    const [rules, setRules] = useState<RuleData[]>([])
    const [message, setMessage] = useState<string>('')
    const [keywords, setKeywords] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    let pageStart: number = RESULTS_PER_PAGE * (page - 1)

    const fetchRules = async () => {

        if(query === null) {
            setRules([])
            return
        }

        setLoading(true)
        setRules([])

        let url: URL = new URL(API_URL + '/api/search')
        let params = {
            keywords: query.split(' ').toString(),
        }

        url.search = new URLSearchParams(params).toString()

        let response = await fetch(url.href)        
        if(response.status != 200) {
            setMessage(`The server returned an error. (Error code ${response.status})`)
            setLoading(false)
            return
        }

        let body: any = await response.json()
        let data: RLReturnData = body as RLReturnData

        setLoading(false)
        setRules(data.rules)
        setKeywords(data.request.keywords)
    }

    useEffect((): void => {
        fetchRules()
    }, [query])

    //update message when rules or page changes
    useEffect((): void => {
        if(rules.length > 0) {
            setMessage(`Showing results ${pageStart + 1} - ${Math.min(pageStart + RESULTS_PER_PAGE, rules.length)} of ${rules.length} for "${query}" (Page ${page} of ${Math.ceil(rules.length / RESULTS_PER_PAGE)})`)
        } else {
            setMessage('')
        }
    }, [rules.length,page])

    //scroll to top on load
    useEffect(() => {
        window.scrollTo(0,0)
    })

    let notFound: React.ReactElement

    if(!loading && rules.length === 0) {
        notFound = (
            <div className={CSS.notFound}>
                <h3>No results found for "{query}".</h3>
                <p>RulesLawyer searches the following rules documents: the Comprehensive Rules, Infraction Procedure Guide, Magic Tournament Rules, Judging at Regular document, Oathbreaker rules, Digital Infraction Procedure Guide, and Digital Magic Tournament rules.</p>
                <p>Much like a traditional search engine, if your query does not appear in these documents, no results will be returned. It is suggested that you only use words that you think are likely to appear in these documents.</p>
            </div>
        )
    }

    return (
        <div>
            <div className={CSS.searchBarContainer}>
                <HomeButton/>
                <SearchBox/>
            </div>
            <div className={CSS.body}>
                {message && !loading? <div className={CSS.message}><p>{message}</p></div> : null}
                {notFound}
                {loading? <div className={CSS.loading}><div className={CSS.loadingAnimation}></div><div className={CSS.loadingText}>Loading</div></div>: null}
                <ResultsList rules={rules.slice(pageStart, pageStart + RESULTS_PER_PAGE)} keywords={keywords}/>
                <div className={CSS.pageLinkContainer}>
                    {!loading && page > 1? <div className={CSS.pageLink}><Link to={`/search?q=${query}&page=${page-1}`}>{`< Page ${page - 1}`}</Link></div> : null}
                    {!loading && page < Math.ceil(rules.length / RESULTS_PER_PAGE)? <div className={`${CSS.pageLink} ${CSS.right}`}><Link to={`/search?q=${query}&page=${page+1}`}>{`Page ${page + 1} >`}</Link></div> : null}
                </div>
            </div>
        </div>
    )
}


export default SearchPage