import * as React from 'react'
import { Link } from 'react-router-dom'

const BotsPage: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <div>
            <Link to={{pathname: 'https://discordapp.com/oauth2/authorize?client_id=590184543684788253&scope=bot&permissions=2147838016'}}>Add RulesLawyer to your Discord server!</Link>
            <Link to='/slack'>Add RulesLawyer to Slack (Note: This does not work well currently)</Link>
        </div>
    )
}

export default BotsPage