import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Box, TextInput, ResponsiveContext } from "grommet";

import SearchButton from "./SearchButton";

export class SearchBox extends PureComponent {
  state = { searchValue: "", suggestions: [] };

  searchTimeout = null;

  onSelect = event => {
    this.setState({ searchValue: event.suggestion }, () => {
      this.search();
    });
  };

  onChange = event => {
    const value = event.target.value;

    let savedSuggestions = sessionStorage.getItem("suggestions");
    if (typeof savedSuggestions === "string") {
      savedSuggestions = savedSuggestions.split(",");
    } else {
      savedSuggestions = [];
    }

    let suggestions = [];

    for (let i = 0, len = savedSuggestions.length; i < len; i++) {
      if (savedSuggestions[i].indexOf(value) === 0) {
        suggestions.push(savedSuggestions[i]);
      }
    }

    this.setState(
      { searchValue: value, suggestions: suggestions },
      this.setTimeoutSearch
    );
  };

  onKeyDown = event => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  search = () => {
    const { searchValue } = this.state;
    const { startSearch } = this.props;

    let savedSuggestions = sessionStorage.getItem("suggestions");
    if (typeof savedSuggestions === "string") {
      savedSuggestions = savedSuggestions.split(",");
    } else {
      savedSuggestions = [];
    }

    savedSuggestions.push(searchValue);
    sessionStorage.setItem("suggestions", savedSuggestions.join(","));

    clearTimeout(this.searchTimeout);
    startSearch(searchValue);
  };

  setTimeoutSearch = () => {
    const { searchValue } = this.state;
    const { startSearch } = this.props;

    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      startSearch(searchValue);
    }, 1000);
  };

  render() {
    const { searchValue, suggestions } = this.state;

    return (
      <Box pad={"large"}>
        <ResponsiveContext.Consumer>
          {size => (
            <Box
              direction="row"
              alignSelf="center"
              align="center"
              border={{
                color: "brand",
                size: "small",
                side: "all"
              }}
              pad={{ left: "medium" }}
              width={size !== "small" ? "large" : "full"}
              background="light-1"
            >
              <TextInput
                plain
                placeholder="people, sea, flower"
                value={searchValue}
                onChange={this.onChange}
                onSelect={this.onSelect}
                onKeyDown={this.onKeyDown}
                suggestions={suggestions}
              />
              <SearchButton onClick={this.search} />
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Box>
    );
  }
}

export default SearchBox;

SearchBox.propTypes = {
  startSearch: PropTypes.func.isRequired
};
