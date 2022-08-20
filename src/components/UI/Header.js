import styled from 'styled-components';

const Header = ({ text }) => {
  return <Title>{text}</Title>;
};

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
  text-align: center;
`;

export default Header;
