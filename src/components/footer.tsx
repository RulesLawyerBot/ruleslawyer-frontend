import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    text-align: center;
    flex-basis: 8vh;
    margin-top: .75em;
`

const Footer: React.FunctionComponent<{}> = (): React.ReactElement => {

    return(
        <Container><Link to='/about'>About</Link> | <a href='https://www.patreon.com/ruleslawyer'>Patreon</a> | <Link to='/bots'>Chatbots</Link> | <Link to='/glossary'>Glossary</Link></Container>
    )
}

export default Footer;