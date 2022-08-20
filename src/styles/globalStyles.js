import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
${reset}
  * {
    box-sizing:border-box;  
  }

  body {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 14px;
    user-select: none;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  input {
    background-color: transparent;

    &:focus {
    outline: none;
  }
  }

  button {
    color: #5f4d4b;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
  }

  .App {
    width: 100vw;
    display: flex;
    justify-content: center;
  }
`;

export default GlobalStyles;
