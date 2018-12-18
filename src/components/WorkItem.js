import React, { Component } from "react";
import styled from "@emotion/styled";
// import debounce from 'lodash.debounce';
import noiseImg from "../images/noise.png";

const WorkItemContainer = styled.a`
  overflow: hidden;
  position: relative;
  width: 50%;
  float: left;
  &:hover .overlay-wrap {
    background: rgba(186, 151, 61, 0.5) !important;
  }
  h2 {
    font-family: "Montserrat", "Helvetica", sans-serif !important;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    ${"" /* .overlay-text h2 {
      font-size : calc(6px + 2vmin);
    }

    .overlay-text p {
      font-size : calc(6px + 1vmin);
    } */}

    .overlay-text {
      top: auto;
      bottom: 25px;
      margin-left: 0px;
      padding: 0 25px;
      opacity: 1;
    }

    .overlay-wrap:hover .overlay-text {
      margin-left: 0px;
      padding: 0 50px;
    }

    .overlay-wrap:hover h2,
    .overlay-wrap:hover p {
      color: #fff;
      transition: all 0.4s ease-in-out;
    }
    .overlay-wrap {
      background: rgba(4, 4, 4, 0.125) !important;
    }
  }
`;

const OverlayWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  float: left;
  background: rgba(128, 128, 128, 0);
  transition: all 0.4s ease-in-out;
  &:hover .overlay-text {
    margin-left: 2.5vw;
    opacity: 1;
  }
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(${noiseImg});
    background-repeat: repeat;
    background-size: 20vh;
  }
`;

const OverlayText = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 2.5vw;
  width: 100%;
  float: left;
  margin-left: 0px;
  color: #fff;
  opacity: 0;
  text-decoration: none;
  transition: all 0.4s ease-in-out;
  h2,
  p {
    margin: 0;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    line-height: 1.5;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }
  p {
    font-size: 0.8rem;
    font-weight: 300;
  }
  @media only screen and (max-width: 767px) {
    p {
      text-shadow: 0 0 4px rgba(4, 4, 4, 0.5);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  float: left;
  margin: 0;
`;

export default class WorkItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      scrollTop: 0,
      scrollHeight: 0
    };
  }

  componentDidMount() {
    this.setState({
      mounted: true
    });
    // this.scrollListener = this.handleScroll();
    // this.handleResize = this.handlePageResize();
    // window.addeventlistener('scroll', this.scrollListener);
    // window.addeventlistener('resize', this.handleResize);
  }

  componentWillUnmount() {
    // window.removeeventListener('scroll', this.scrollListener);
    // window.removeeventListener('resize', this.handleResize);
  }

  // handleScroll() {
  //   return debounce(() => {
  //     requestAnimationFrame(() => {
  //       this.setState({
  //         scrollTop: document.body.scrollTop,
  //       });
  //     });
  //   }, 20);
  // }

  // handlePageResize() {
  //   return debounce(() => {
  //     this.setHeight();
  //   }, 25);
  // }

  setHeight() {
    const { documentElement: html, body } = document;

    this.setState({
      scrollHeight: Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    });
  }

  getImageStyle(state = this.state) {
    const { mounted, scrollTop, scrollHeight } = state;
    if (mounted) {
      const { clientHeight } = document.body;
      const maxHeight = Math.max(scrollHeight - clientHeight, 0);
      let grayscale = 0;
      let blur = 0;
      if (scrollHeight !== clientHeight) {
        grayscale = scrollTop / maxHeight;
        blur = grayscale * 5;
      }
      return {
        filter: `grayscale(${grayscale}) blur(${blur}px)`
      };
    }
    return {};
  }

  render() {
    const { src, title, details, href } = this.props;
    const style = this.getImageStyle();

    return (
      <WorkItemContainer target="_blank" href={href}>
        <Image src={src} style={style} onLoad={() => this.setHeight()} />
        <OverlayWrap className="overlay-wrap">
          <OverlayText className="overlay-text">
            <h2>{title}</h2>
            <p>{details}</p>
          </OverlayText>
        </OverlayWrap>
      </WorkItemContainer>
    );
  }
}
