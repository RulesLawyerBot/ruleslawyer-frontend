import * as React from 'react'

interface Props {
    onSubmit: (searchString: string) => void
}

interface State {
    query: string
}

export default class SearchBox extends React.Component<Props, State> {
    state = {
        query: ""
    }

    private handleChange(event: React.FormEvent<HTMLInputElement>): void{
        event.preventDefault()
        this.setState({query: event.currentTarget.value})
    }

    private handleSubmit(event: React.FormEvent<HTMLInputElement>): void {
        event.preventDefault()
        this.props.onSubmit(this.state.query)
        this.setState({query: ""})
    }

    render(): React.ReactElement {
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>            
                <input type="text"
                    placeholder="enter search terms"
                    value={this.state.query}
                    onChange={this.handleChange.bind(this)}
                /> 
                <button type="submit">Search</button>
            </form>

        )
    }
    
}