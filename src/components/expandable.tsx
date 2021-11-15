import * as React from 'react'

import { useState } from 'react'

interface Props {
    label: string
    contents: React.ReactElement
    startOpen?: boolean
}

const Expandable: React.FunctionComponent<Props> = ({label, contents, startOpen = false}: Props) => {

    let [open, setOpen] = useState(startOpen)

    return(
        <div>
            <div onClick={() => setOpen(!open)}>
                {label}
            </div>
            {open? contents : null}
        </div>
    )
}

export default Expandable