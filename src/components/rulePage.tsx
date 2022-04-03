import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'

import RuleDisplay from './ruleDisplay'
import HomeButton from './homeButton'
import { API_URL } from './app'
import { RuleData } from '../model/model'

import CSS from '../styles/rulePage.module.css'

const RulePage: React.FunctionComponent = (): React.ReactElement => {

    let { id } = useParams<{id: string}>()

    const [rule, setRule] = useState<RuleData>(null)
    const [error, setError] = useState<Boolean>(false)

    const fetchRule = async () => {
        setError(null)
        let url: URL = new URL(API_URL + "/api/citation")
        let params = {
            index: id
        }
        url.search = new URLSearchParams(params).toString()
        console.log(url.href)

        let response = await fetch(url.href)
        if(response.status === 200) {
            let body: any = await response.json()
            let data: RuleData = body as RuleData
    
            setRule(data)
            setError(false)
        } else {
            setError(true)
        }
    }

    useEffect((): void => {
        fetchRule()
    }, [id])

    if(rule) {
        return(
            <div className={CSS.rulePage}>
                <Helmet>
                    <title>{rule.text} | RulesLawyer</title>
                </Helmet>
                <div className={CSS.navLinkContainer}>
                    <Link to={`/rule/${rule.previousIndex}`} className={CSS.navLink}>{'< Previous'}</Link>
                    <div className={CSS.navLinkHome}>
                        <HomeButton/>
                    </div>
                    <Link to={`/rule/${rule.nextIndex}`} className={CSS.navLink}>{'Next >'}</Link>
                </div>
                <RuleDisplay rule={rule}/>
            </div>
        )
    } else if (error) {
        return (
            <div className={CSS.rulePage}>
                <h4>Rule {id} not found.</h4>
            </div>
        )
    } else {
        return <div></div>
    }

}

export default RulePage