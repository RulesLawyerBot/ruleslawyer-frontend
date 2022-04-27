import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import SearchBox from './searchBox'

const Container = styled.div`
    text-align: center;
    margin: 0;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const GlossaryLink = styled.span`
    text-decoration: underline;
    font-weight: bold;
`

const MainPage: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <Container>
            <h1><img src="favicon.png" alt="OWL" width="30"/>RulesLawyer</h1>
            <h2>An advanced search engine for Magic: The Gathering rules</h2>
            <div>
                <SearchBox/>
            </div>
            <p>Search for citations, keywords, or a combination!</p>
            <GlossaryLink><Link to={'/glossary'}>See a list of rules documents here.</Link></GlossaryLink>
        </Container>
    )
}

export default MainPage