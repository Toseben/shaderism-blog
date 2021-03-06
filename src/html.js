import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

export default class HTML extends React.Component {
  static propTypes = {
    body: PropTypes.string
  };

  render() {
    const head = Helmet.rewind();

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta httpEquiv="Cache-control" content="public" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="google-site-verification" content="9uMdelCsHAECNkyYHY-tMO3tyME2TzQe_O1lZ8USN5g" />
          {this.props.headComponents}
        </head>
        <body>
          <div id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
