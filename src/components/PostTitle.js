import React from 'react';
import styled from '@emotion/styled'
import Link from 'gatsby-link';

import { getColorFromString } from '../utils/color';
import { rhythm } from '../utils/typography';

const toStyle = props => {
  if (props.to) {
    return `
      cursor: pointer;
      &:hover {
        background: ${getColorFromString(props.title, -10, 20)};
      }
    `;
  }
  return '';
};

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 1;
  background: ${props => getColorFromString(props.title)};
  color: white;
  position: relative;
  padding-top: ${rhythm(1)};
  padding-bottom: ${rhythm(2.0)} !important;
  transition: background-color 125ms ease-in-out;
  @media only screen and (min-width: 768px) {
    padding: ${rhythm(1.75)} 0;
  }
  ${props => toStyle(props)};
`;

const Title = styled.h1`
  display: block;
  margin: 0 ${rhythm(2)};
  font-family: Bitter, Georgia, serif;
  font-size: ${rhythm(1)};
  line-height: ${rhythm(1.5)};
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: ${rhythm(1 / 2)} 0;
  @media only screen and (min-width: 768px) {
    border-width: 4px;
    font-size: ${rhythm(1.5)};
    line-height: ${rhythm(2)};
  }
`;

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  width: 100%;
`;

export default function PostTitle({ children, title, to }) {
  const Container = () => {
    return (
      <TitleContainer title={title} to={to}>
        <Title className="post-title">{title}</Title>
        {children}
      </TitleContainer>
    );
  };
  if (to) {
    return (
      <StyledLink to={to}>
        <Container />
      </StyledLink>
    );
  }
  return <Container />;
}
