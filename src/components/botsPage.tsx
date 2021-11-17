import * as React from 'react'
import { Link } from 'react-router-dom'

import CSS from '../styles/staticPage.module.css'

const BotsPage: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <div>
            <h1><Link to='/'><img src="favicon.png" alt="OWL" width="30"/></Link> RulesLawyer Chatbots</h1>
            <div className={CSS.textBody}>
                <h2>Discord</h2>
                <p>The RulesLawyer discord bot is the original version of RulesLawyer. Like the website, it supports advanced rule searching, and it also supports card search.</p>
                <a href="https://discordapp.com/oauth2/authorize?client_id=590184543684788253&scope=bot&permissions=380104960064&scope=applications.commands%20bot">
                    <button>Add to your Discord server!</button>
                </a>
                <h2>Slack</h2>
                <p>The Slack bot is still under development. If you would like to have access to the current development version of the bot, please <a href="https://twitter.com/RulesLawyerBot">contact us</a>.</p>
            </div>
        </div>
    )
}

export default BotsPage;