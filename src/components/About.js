import React from 'react';
import styled from "@emotion/styled";
import { injectGlobal } from "emotion";
import PostTitle from './PostTitle';
import { rhythm } from '../utils/typography';
import { fadeInBottom } from '../css/animations'

import ImageShift from '../components/ImageShift'

import annix from '../images/clients/annix.png'
import ekkomedia from '../images/clients/ekkomedia.png'
import flow314 from '../images/clients/flow314.png'
import ivar from '../images/clients/ivar.png'
import jms from '../images/clients/jms.png'
import pupil from '../images/clients/pupil.png'
import signlab from '../images/clients/signlab.png'
import vividly from '../images/clients/vividly.png'
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
  padding: 0 2vw;
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
      <PostTitle title={title} to={isPost(false, linkTo)}></PostTitle>
      <PostContents>
        <div className="post-content" dangerouslySetInnerHTML={{ __html }} />
        {children}
      </PostContents>
      <Divider />
      <br/>
      <Container>
        <h1 className="clients">Clients & Partners</h1>
        <ImageContainer>
          <Image src={annix} />
          <Image src={ekkomedia} />
          <Image src={flow314} />
          <Image src={ivar} />
          <Image src={jms} />
          <Image src={pupil} />
          <Image src={signlab} />
          <Image src={vividly} />
        </ImageContainer>
      </Container>
    </Post>
  );
}
