import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import RuleDisplay from './ruleDisplay'

import { RuleData } from './searchPage'

const RulePage: React.FunctionComponent = (): React.ReactElement => {

    let { id } = useParams<{id: string}>()

    const [rule, setRule] = useState<RuleData>(null)
    const [error, setError] = useState<Boolean>(false)

    const fetchRule = async () => {
        setError(null)
        console.log(`getting rule ${id}`)
        let url: URL = new URL("http://ruleslawyer-api.herokuapp.com/api/citation")
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
    return(
        <div>
            { rule ? <RuleDisplay rule={rule}/> : <div>{error ? <h4>Rule {id} not found.</h4> : null}</div>}
        </div>
    )
}

export default RulePage