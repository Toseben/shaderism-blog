import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import PostTitle from './PostTitle';
import { rhythm } from '../utils/typography';
import { fadeInBottom } from '../css/animations'

import ImageShift from '../components/ImageShift'
import WorkItem from '../components/WorkItem'

import envportal from '../images/work/envportal.jpg'
import buy from '../images/work/buy.jpg'
import particles from '../images/work/particles.jpg'
import spinningglobe from '../images/work/spinningglobe.jpg'
import bankvis from '../images/work/bankvis.jpg'

import ikea from '../images/work/ikea_tshirt.jpg'
import johnlewis from '../images/work/johnlewis.jpg'
import candycrush from '../images/work/soda_laundrette.jpg'
import mclaren from '../images/work/mclaren.jpg'
import ferrero from '../images/work/ferrero.jpg'

import '../css/posts.css';

injectGlobal`
  h1.post-title {
    text-align: center;
    font-weight: 700;
    display: inline-block;
  }

  h1.clients {
    text-align: center;
    font-weight: 700;
  }

  .post-content h2 {
    color: #333;
    margin: ${rhythm(1 / 4)} 0;
    padding: ${rhythm(1 / 4)} 0;
    border-bottom: 2px solid #ddd;
    font-weight: 400;
  }

  .post-content h3 {
    display: inline-block;
    color: #444;
    margin: ${rhythm(1 / 6)} 0;
    padding: ${rhythm(1 / 6)};
    padding-left: 0;
    border-bottom: 1px solid #ddd;
    font-weight: 400;
  }

  .post-content p {
    margin: ${rhythm(3 / 4)} auto;
    color: #333;
    line-height: ${rhythm(1.25)};
  }
`;

const Post = styled.section`
  position: relative;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  outline: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const PostContents = styled.div`
  max-width: 100%;
  padding: ${rhythm(3 / 4)} ${rhythm(1)};
  @media only screen and (min-width: 768px) {
    padding: ${rhythm(1)} ${rhythm(2)};
    padding-top: ${rhythm(1)};
  }
`;

const Divider = styled.hr`
  border: 0;
  width: 75%;
  margin: ${rhythm(1 / 2)} auto;
  border-bottom: 1px solid #eee;
`;

const Container = styled.div`
  background-color: white;
  max-width: 100%;
  transform: translateY(16px) scale(.99);
  transform-origin: 50% 0;
  opacity: 0;
  animation: ${fadeInBottom} 0.3s cubic-bezier(.39, .575, .565, 1) both;
`

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Image = styled(ImageShift)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export default function({
  children,
  className,
  date,
  html: __html,
  linkTo,
  title,
  next,
  prev,
  ...rest
}) {
  const isPost = (truthy, falsy = null) => {
    if (linkTo === '/') {
      return truthy;
    }
    return falsy;
  };

  return (
    <Post className={[`post`].concat(className || []).join(' ')} {...rest}>
      <Container>
        <ImageContainer>

          <WorkItem src={particles}
            title='Particles & Shaders'
            details='Interactive Particles'
          />

          <WorkItem src={ikea}
            title='IKEA'
            details='T-shirts'
          />

          <WorkItem src={buy}
            title='3D Store'
            details='Interactive Product'
          />

          <WorkItem src={candycrush}
            title='Candy Crush'
            details='Soda Saga - King Laundrette'
          />

          <WorkItem src={spinningglobe}
            title='Spinning Globe'
            details='Data Visualization'
          />

          <WorkItem src={ferrero}
            title='Ferrero Rocher'
            details='Magic Tree'
          />

          <WorkItem src={envportal}
            title='Virtual House Tour'
            details='Interactive VR Experience'
          />

          <WorkItem src={johnlewis}
            title='John Lewis'
            details='Christmas Advert 2016'
          />

          <WorkItem src={bankvis}
            title='3D Interior Design'
            details='Interactive VR Experience'
          />

          <WorkItem src={mclaren}
            title='McLaren'
            details='Black Swan Moments'
          />

        </ImageContainer>
      </Container>
    </Post>
  );
}