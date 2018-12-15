import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from '@emotion/styled'

import NavigationButton from './NavigationButton';

// import { animateBackground, animateShake } from '../css/animations';

// import headerTex from '../images/background.jpg'

const Header = styled.header`
  height: ${props => (props.isPost ? '15vh' : '15vh')};
  color: blue;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  ${'' /* background-size: 50vh; */}
  ${'' /* background-image: url(${headerTex}); */}
  ${'' /* box-shadow: inset 0 0 20px rgba(0,0,0,0.5); */}
  ${'' /* animation: ${animateBackground} 10s ease infinite; */}
  font-weight: 400;
  transition: height 250ms ease-in-out;
  user-select: none;
  @media only screen and (min-width: 768px) {
    height: ${props => (props.isPost ? '25vh' : '25vh')};
  }
`;

const Name = styled.h1`
  display: flex;
  flex-wrap: wrap;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 700;
  align-items: center;
  transition: font-size 250ms ease-in-out, padding 150ms ease-in;
  background-color: #0B0C10;
  box-shadow:0 0 20px rgba(0,0,0,0.5);
  color: #FFF;
  padding: 0.5rem 1rem;
  margin: 0;
  width: auto;
  user-select: text;
  .wf-active & {
    font-family: 'Montserrat', sans-serif;
  }
  @media only screen and (min-width: 375px) {
    font-size: 2.5rem;
  }
  @media only screen and (min-width: 768px) {
    font-size: 4.5rem;
    padding: 1rem 2rem;
  }
`;

const Letter = styled.span`
  display: inline-block;
  position: relative;
  z-index: 3;
`;

// const First = styled.span`
//   padding-right: 2vw;
//   font-weight: 700;
//   white-space: nowrap;
// `;

const Last = styled.span`
  font-weight: 400;
  white-space: nowrap;
`;

const StyledLink = styled(Link)`color: inherit;`;

const BackContainer = styled.div`
  position: fixed;
  z-index: 2;
  top: 4px;
  left: 0;
`;

class BlogHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBackButton: false,
    };
  }

  componentDidMount() {
    this.setState({
      showBackButton: document.referrer.match('arttukoskela'),
    });
  }

  render() {
    const { showBackButton } = this.state;
    return (
      <Header id="blog-header" {...this.props}>
        {showBackButton && (
          <BackContainer>
            <NavigationButton to="https://www.arttukoskela.com" absolute prev>
              Back to Home
            </NavigationButton>
          </BackContainer>
        )}
        <Name className="name">
          <StyledLink to="/">
            {/* <First>
              {'Shaderism'.split('').map((letter, index) =>
                <Letter key={`${letter}-${index}`}>
                  {letter}
                </Letter>
              )}
            </First> */}
            <Last>
              {'Shaderism'
                .split('')
                .map((letter, index) => (
                  <Letter key={`${letter}-${index}`}>{letter}</Letter>
                ))}
            </Last>
          </StyledLink>
        </Name>
      </Header>
    );
  }
}

export default BlogHeader;
