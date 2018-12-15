import React from 'react';
import styled from '@emotion/styled'

import { FaGithub, FaFacebook, FaEnvelope } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  display: inline-block;
  text-decoration: none;
  color: ${props => props.color || '#555'};
  transition: color 175ms ease-in-out, transform 175ms ease-in-out;
  :hover {
    transform: scale(1.1);
    color: ${props => props.hoverColor};
  }
`;

const ExternalLink = props => {
  return (
    <Link target="_blank" rel="noopener" {...props}>
      {props.children}
    </Link>
  );
};

const Types = {
  facebook(props) {
    return (
      <ExternalLink
        hoverColor="#3b5998"
        href="https://www.facebook.com/shaderism/"
        {...props}
      >
        <FaFacebook size={32} />
      </ExternalLink>
    );
  },
  git(props) {
    return (
      <ExternalLink
        hoverColor="#333333"
        href="https://github.com/Toseben"
        {...props}
      >
        <FaGithub size={32} />
      </ExternalLink>
    );
  },
  home(props) {
    return (
      <ExternalLink
        hoverColor="#fff"
        href="mailto:shaderism@gmail.com"
        {...props}
      >
        <FaEnvelope size={32} />
      </ExternalLink>
    );
  },
};

export default function SocialButton({ type, ...rest }) {
  const Type = Types[type];
  return (
    <Container {...rest}>
      <Type {...rest} />
    </Container>
  );
}
