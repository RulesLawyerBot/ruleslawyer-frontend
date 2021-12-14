import * as React from 'react'

import CSS from '../styles/loadingAnimation.module.css'

interface Props {
    size?: number
    text: string
}

const LoadingAnimation: React.FunctionComponent<Props> = (props: Props): React.ReactElement => {

    let style: React.CSSProperties = props.size ? { width: `${props.size}px`, height: `${props.size}px`} : null

    return(
        <div className={CSS.loading} style={style}>
            <div className={CSS.loadingAnimation}/>
            <div className={CSS.loadingText}>{props.text}</div>
        </div>
    )
}

export default LoadingAnimation