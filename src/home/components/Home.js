import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, Box, Image, ResponsiveContext } from "grommet";
import spinner from "../../img/spinner.svg";

import SearchBox from "./SearchBox";
import SearchList from "./SearchList";
import { loadStates } from "../homeActions";

export default class Home extends Component {
  componentDidMount() {
    this.props.startSearch();
  }

  render() {
    const { loadState, searchResults, searchError, startSearch } = this.props;
    return (
      <Box>
        {loadState === loadStates.LOADING ? (
          <ResponsiveContext.Consumer>
            {size =>
              size !== "small" ? (
                <Box style={{ position: "fixed", top: 0, right: 0 }}>
                  <Image fit="contain" src={spinner} />
                </Box>
              ) : (
                <Box
                  fill
                  style={{ position: "fixed", top: 0, right: 0 }}
                  align="center"
                  justify="center"
                >
                  <Box height="100px" width="100px">
                    <Image fit="contain" src={spinner} />
                  </Box>
                </Box>
              )
            }
          </ResponsiveContext.Consumer>
        ) : null}

        <SearchBox startSearch={startSearch} />

        {loadState === loadStates.ERROR ? (
          <Text color="status-error">{searchError}</Text>
        ) : null}
        <SearchList searchResults={searchResults} loadState={loadState} />
      </Box>
    );
  }
}

Home.propTypes = {
  loadState: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  searchError: PropTypes.string,
  startSearch: PropTypes.func.isRequired
};
