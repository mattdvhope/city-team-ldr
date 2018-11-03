import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import styled from "styled-components";

import 'font-awesome/css/font-awesome.min.css';

const FontStyler = styled.div`
  font-family:'Neue Frutiger W31 Trad Light', Trirong;
`

export default class Layout extends Component {
  constructor(props) {
    super(props);
      this.state = {
        window: undefined
      };
  }

  componentDidMount() {
    if (!window.localStorage.language) {
      window.localStorage.setItem("language", "thai" );
    }

    this.setState({ window: window });
  }

  handleChangeToThai(event) {
    console.log("in handleChangeToThai");
    event.preventDefault();
    this.state.window.localStorage.setItem("language", "thai" );
    this.setState(this.state);
    location.reload();
    // navigateTo('/');
  }

  handleChangeToEnglish(event) {
    console.log("in handleChangeToEnglish");
    event.preventDefault();
    this.state.window.localStorage.setItem("language", "englll" );
    this.setState(this.state);
    location.reload();
    // navigateTo('/');
  }

  render() {
    const { data } = this.props;

    return (
      <FontStyler>
        <Helmet title={data.site.siteMetadata.title} >

          <link type="text/css" rel="stylesheet" href="//fast.fonts.net/cssapi/50070ebd-d81b-4d29-acc0-f8abd9040636.css"/>

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />

          <link href="https://fonts.googleapis.com/css?family=Athiti|Chonburi|Kanit|Maitree|Prompt|Sriracha|Taviraj|Trirong|Josefin+Sans" rel="stylesheet" />
        </Helmet>

        {this.props.children()}

      </FontStyler>
    )
  }
}

//// Fix this soon!!  Technical debt...
Layout.propTypes = {
  children: PropTypes.func,
}

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
