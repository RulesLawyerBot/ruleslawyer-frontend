import * as React from 'react'

const About: React.FunctionComponent<{}> = (): React.ReactElement => {
    return( // TODO make this look pretty I dunno
        <div>
            <h1>About RulesLawyer</h1>
            <p>RulesLawyer is written by <b><a href="https://judgeacademy.com/user/profile/oritart/">Elaine Cao</a></b>, Level 2, and <b>Miranda Keith</b>, from Calgary, Alberta.</p>
            <h1>Special thanks</h1>
            <p><b>Tobias Vyseri</b>, Level 2, for the owl logo.</p>
            <p><b>The <a href="https://www.scryfall.com">Scryfall</a> team</b> for their card API, as used in the Discord bot.</p>
            <h1>Legal</h1>
            <p>RulesLawyer (this website, as well as all bots, apps, social media, and any other presence under the name RulesLawyer) is created using material that is © Wizards of the Coast and is used in accordance with their <a href="https://company.wizards.com/en/legal/fancontentpolicy">Fan Content Policy</a>.</p>
            <p>RulesLawyer is not endorsed by Wizards of the Coast. RulesLawyer is also not endorsed by Judge Academy, Scryfall, or any other third-party organization.</p>
            <p>Though every effort is made to keep RulesLawyer up-to-date, no warrant is made as to the accuracy of the information provided.</p>
            <h1>Code</h1>
            <p>The code for RulesLawyer is publically available <a href="https://github.com/gold-mir/ruleslawyer-frontend">here</a> and <a href ="https://github.com/elainecao93/ruleslawyer">here</a>.</p>
        </div>
    )
}

export default About;