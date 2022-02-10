import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-image: linear-gradient(rgb(103, 183, 255), rgb(179, 219, 255));
        background-attachment: fixed;
        font-family: Open-Sans, Helvetica, Sans-Serif;
    }

a {
    color: black;
    text-decoration: none;
}

a:visited {
    color: black;
}

a:hover {
    color: blue;
}
`

export default GlobalStyle