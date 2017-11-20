import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import loadWebFonts from '../services/web-fonts';

import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';

// NAVIGATION HAMBURGER
import Hamburger from '../components/hamburger';
import Menu from '../components/menu';

import '../css/base.css';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default class Template extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuActive: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  static propTypes = {
    children: PropTypes.func,
  };

  componentDidMount() {
    loadWebFonts();
  }

  toggleMenu(isVisible) {
    this.setState({ menuActive: typeof isVisible === 'undefined' ? !this.state.menuActive : isVisible });
  }

  render() {
    const { children, location } = this.props;
    const isPost =
      location.pathname !== '/' && !location.pathname.match(/^\/blog\/?$/);
    const { menuActive } = this.state;

    return (
      <Root>
        <Helmet
          title="Shaderism - Blog"
          meta={[
            {
              name: 'description',
              content: 'Shaderism is a design studio specialized in WebGL. We create interactive websites, VR experiences and more!',
            },
            {
              name: 'keywords',
              content:
                'developer, javascript, opengl, webgl, glsl, threejs, a-frame, programming, vr, graphics, finland, helsinki',
            },
          ]}
        />

        <Hamburger onClick={() => this.toggleMenu()} active={menuActive} className={'styles.hamburger'} />

        <Menu onNavClick={() => this.toggleMenu(false)} active={menuActive} />

        <Header isPost={isPost} />
        <Content isPost={isPost} Footer={Footer}>
          {children()}
        </Content>
      </Root>
    );
  }
}
