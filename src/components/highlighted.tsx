import * as React from 'react'
import { Fragment } from 'react'

import CSS from '../styles/highlighted.module.css'

interface Props {
    text: string
    keywords: string[]
}

const Highlighted: React.FunctionComponent<Props> = (props: Props): React.ReactElement => {

    let { text, keywords } = props

    if(keywords.length === 0) {
        return(
            <Fragment>{text}</Fragment>
        )
    }

    let escapedKeywords: string[]  = keywords.map(keyword => `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`)
    let match: RegExp = new RegExp(`${escapedKeywords.join('|')}`, 'gmi')

    let splitText: string[] = text.split(match).filter(element => element !== undefined)


    return(
        <span>{splitText.map((element, index) => {
            if(element.match(match)) {
                return <span className={CSS.highlight} key={index}>{element}</span>
            } else {
                return <Fragment key={index}>{element}</Fragment>
            }
        })}</span>
    )
}

export default Highlighted;