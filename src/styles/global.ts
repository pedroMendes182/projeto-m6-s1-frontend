import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --color-primary: #FF577F;
        --color-primary-focus: #FF427F;
        --color-primary-negative: #59323F;

        --grey-0: #F8F9FA;
        --grey-1: #868E96;
        --grey-2: #343B41;
        --grey-3: #212529;
        --grey-4: #121214;
        --grey-4-50: #12121450;
        
        --sucess: #3FE864;
        --negative : #E83F5B;
    }

    *{
        margin: 0;
        padding: 0;
        border: none;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        font-family: 'Inter', sans-serif;;
    }

    body {
        background-color: var(--grey-0);
    }

    button {
        cursor: pointer;
        transition: 0.4s;
    }
`;

export default GlobalStyle;
