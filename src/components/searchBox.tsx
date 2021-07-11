import * as React from 'react'
import { useHistory } from 'react-router-dom'

import CSS from '../styles/searchBar.module.css'

const SearchBox: React.FunctionComponent<{}> = (): React.ReactElement => {
    const [value, setValue] = React.useState<string>('')
    const history = useHistory()

    function onChange(event: React.FormEvent<HTMLInputElement>): void {
        setValue(event.currentTarget.value)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()

        let search: URLSearchParams = new URLSearchParams()
        search.append('q', value)

        history.push(`/search?${search.toString()}`)
    }

    return(
        <form onSubmit={handleSubmit} className={CSS.searchBar}>
            <input type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}/>
            {/* <button type="submit">Search</button> */}
        </form>
    )
}

export default SearchBox