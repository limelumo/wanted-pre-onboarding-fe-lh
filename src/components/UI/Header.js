import styled from 'styled-components';

const Header = ({ text }) => {
  return <Title>{text}</Title>;
};

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 2.2em;
  text-align: center;
  color: #5F4D4B;
`;

export default Header;
