import React from 'react';
import styled from 'styled-components';

const Content = styled.main`
  position: absolute;
  top: ${props => (props.isWork ? '0' : '15vh')};
  right: 0;
  left: 0;
  margin: 0 auto;
  max-width: ${props => (props.isWork ? '100vw' : '95vw')};
  z-index: 2;
  @media only screen and (min-width: 768px) {
    max-width: ${props => (props.isWork ? '100vw' : '840px')};
    top: ${props => (props.isWork ? '0' : '25vh')};
  }
`;

function MainContent({ children, Footer, ...rest }) {
  return (
    <Content {...rest}>
      {children}
      {Footer && <Footer />}
    </Content>
  );
}

export default MainContent;
