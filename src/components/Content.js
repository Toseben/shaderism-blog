
/* eslint-disable no-restricted-globals */

import React from 'react';
import styled from '@emotion/styled'

const Content = styled.main`
  position: absolute;
  top: ${props => (props.hackIsWork ? "0" : "15vh")};
  right: 0;
  left: 0;
  margin: 0 auto;
  max-width: ${props => (props.hackIsWork ? "100vw" : "95vw")};
  z-index: 2;
  @media only screen and (min-width: 768px) {
    max-width: ${props => (props.hackIsWork ? "100vw" : "840px")};
    top: ${props => (props.hackIsWork ? "0" : "25vh")};
  }
`;

function MainContent({ children, Footer, ...rest }) {
  const isWork = /^\/work\/?$/.test(location.pathname);

  return (
    <Content {...rest} hackIsWork={isWork}>
      {children}
      {Footer && <Footer />}
    </Content>
  );
}

export default MainContent;
