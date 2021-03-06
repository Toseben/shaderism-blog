import React from 'react';
import styled from "@emotion/styled";
import { injectGlobal } from "emotion";
// import PostTitle from './PostTitle';
import { rhythm } from '../utils/typography';
import { fadeInBottom } from '../css/animations'

// import ImageShift from '../components/ImageShift'
import WorkItem from '../components/WorkItem'

// import envportal from '../images/work/envportal.jpg'
import storyboarder from '../images/work/storyboarder.mp4'
import modulor from '../images/work/modulor.mp4'
import audioReactive from '../images/work/audioReactive.mp4'
import spotifyDataviz from "../images/work/spotifyDataviz.mp4";
import virtualShopping from "../images/work/virtualShopping.mp4";
// import bankvis from '../images/work/bankvis.jpg'

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
  background-color: rgba(0, 0, 0, 0.125);
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  outline: 1px solid rgba(0, 0, 0, 0.125);
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

// const PostContents = styled.div`
//   max-width: 100%;
//   padding: ${rhythm(3 / 4)} ${rhythm(1)};
//   @media only screen and (min-width: 768px) {
//     padding: ${rhythm(1)} ${rhythm(2)};
//     padding-top: ${rhythm(1)};
//   }
// `;

// const Divider = styled.hr`
//   border: 0;
//   width: 75%;
//   margin: ${rhythm(1 / 2)} auto;
//   border-bottom: 1px solid #eee;
// `;

const Container = styled.div`
  background-color: white;
  max-width: 840px;
  margin: 0 auto;
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

// const Image = styled(ImageShift)`
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
// `

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
  // const isPost = (truthy, falsy = null) => {
  //   if (linkTo === '/') {
  //     return truthy;
  //   }
  //   return falsy;
  // };

  return (
    <Post className={[`post`].concat(className || []).join(' ')} {...rest}>
      <Container>
        <ImageContainer>

          <WorkItem src={audioReactive}
            title='Audio Reactive'
            details='Interactive Music Visualiser'
            href="https://audio-reactive-animations.netlify.app/"
            imgScale={1.15}
          />

          {/* <WorkItem src={particles}
            title='Particles & Shaders'
            details='Interactive Particles'
            href="http://arttukoskela.com/particles/"
          /> */}

          <WorkItem src={ikea}
            title='IKEA'
            details='T-shirts'
            href="https://www.youtube.com/embed/GQsU_2p4atU?rel=0&autoplay=1"
          />

          <WorkItem src={storyboarder}
            title='Storyboarder'
            details='The best way to visualize your story'
            href="https://youtu.be/UITowIxaC3o"
          />

          <WorkItem src={candycrush}
            title='Candy Crush'
            details='Soda Saga - King Laundrette'
            href="https://www.youtube.com/embed/9IEHWYEB-2o?rel=0&autoplay=1"
          />

          <WorkItem src={virtualShopping}
            title='Virtual Shopping'
            details='Interactive Multiuser Ecommerce'
            href="http://virtual-shopping.netlify.app/"
            imgScale={1.15}
          />

          <WorkItem src={ferrero}
            title='Ferrero Rocher'
            details='Magic Tree'
            href="https://vimeo.com/113725194?autoplay=1"
          />

          {/* <WorkItem src={envportal}
            title='Virtual House Tour'
            details='Interactive VR Experience'
            href="http://arttukoskela.com/tour/"
          /> */}

          <WorkItem src={spotifyDataviz}
            title='Spotify Data Vis'
            details='Interactive Playlist Visualiser'
            href="https://spotify-dataviz.herokuapp.com/"
            imgScale={1.2}
          />

          <WorkItem src={johnlewis}
            title='John Lewis'
            details='Christmas Advert 2016'
            href="https://www.youtube.com/embed/4qo27xcVS5I?rel=0&autoplay=1"
          />

          <WorkItem src={modulor}
            title='Furniture Store'
            details='Interactive Product'
            href="https://www.modulor.de/tische/konfigurator-tisch-y/?setup=state:configure,size:1600x800,tableTop:linoleum,panelHeight:20,panelHeightM:19,surfaceColorL:violetgrey,edgeL:multiplex90,edgeBandL:multiplex90,tableCoreL:multiplex90,tableEdgeBevel:90,radius:50mm,surfaceColorM:whitepearl,edgeM:multiplex_birke,edgeMWood:multiplex_birke,edgeMPlastic:,tableLeg:rs20,tableLeg75:rs20,tableLeg100:null,height:75,tableLegColor:black,tableLegColorDefault:black,tableLegColorSpecial:,tableLegColorType:Default,zarge:650,verbinder:y,tableLegWood:ash_tree_whitened,cableOutlet:noEdging,cableOutletType:noEdging,cableOutletPosition:90x90"
            imgScale={1.0}
          />

          <WorkItem src={mclaren}
            title='McLaren'
            details='Black Swan Moments'
            href="https://www.youtube.com/embed/5Qm2yFx3C-M?rel=0&autoplay=1"
          />

        </ImageContainer>
      </Container>
    </Post>
  );
}