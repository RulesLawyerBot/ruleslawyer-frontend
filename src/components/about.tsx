import * as React from 'react'
import { Link } from 'react-router-dom'

import CSS from '../styles/staticPage.module.css'

const About: React.FunctionComponent<{}> = (): React.ReactElement => {
    return(
        <div>
            <h1><Link to='/'><img src="favicon.png" alt="OWL" width="30"/></Link> About RulesLawyer</h1>
            <div className={CSS.textBody}>
                <p>RulesLawyer is written by <b><a href="https://judgeacademy.com/user/profile/oritart/">Elaine Cao</a></b>, Level 2, and <b><a href="https://judgeacademy.com/user/profile/miraweave/">Miranda Keith</a></b>, Level 1, from Calgary, Alberta.</p>
                <h2>Special thanks</h2>
                <p><b><a href="https://vyseri.com/">Tobias Vyseri</a></b>, Level 2, for the owl logo.</p>
                <p><b>The <a href="https://www.scryfall.com">Scryfall</a> team</b> for their card API, as used in the Discord bot.</p>
                <h2>Legal</h2>
                <p>RulesLawyer (this website, as well as all bots, apps, social media, and any other presence under the name RulesLawyer) is created using material that is © Wizards of the Coast and is used in accordance with their <a href="https://company.wizards.com/en/legal/fancontentpolicy">Fan Content Policy</a>.</p>
                <p>RulesLawyer is not endorsed by Wizards of the Coast. RulesLawyer is also not endorsed by Judge Academy, Scryfall, or any other third-party organization. RulesLawyer is Verified by Discord, but this does not imply endorsement.</p>
                <p>Though every effort is made to keep RulesLawyer up-to-date, no warrant is made as to the accuracy of the information provided.</p>
                <h2>Code</h2>
                <p>The code for RulesLawyer is publically available <a href="https://github.com/RulesLawyerBot">here</a>.</p>
            </div>
        </div>
    )
}

export default About;