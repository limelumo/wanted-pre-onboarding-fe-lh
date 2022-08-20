import styled from 'styled-components';

const Header = ({ text }) => {
  return <Title>{text}</Title>;
};

Header.defaultProps = {
  type: 'default',
};

const Title = styled.h2`
  font-size: 2em;
  margin-bottom: 1em;
`;

export default Header;
