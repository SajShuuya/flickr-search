import React from "react";
import { Box, Heading, ResponsiveContext } from "grommet";
import PropTypes from "prop-types";
import get from "lodash.get";

import { loadStates } from "../homeActions";
import ImageBox from "./ImageBox";

const SearchList = ({ searchResults, loadState }) => {
  if (loadState === loadStates.STAND_BY) {
    return null;
  }

  if (loadState === loadStates.COMPLETED && searchResults.length === 0) {
    return (
      <Box alignSelf="center">
        <Heading textAlign="center" level={3}>
          No result
        </Heading>
      </Box>
    );
  }
  return (
    <ResponsiveContext.Consumer>
      {size => {
        let width = 0;
        switch (size) {
          case "large":
            width = "1632px";
            break;
          case "medium":
            width = "1224px";
            break;
          case "small":
            width = "396px";
            break;
          default:
            break;
        }
        return (
          <Box
            alignSelf="center"
            width={width}
            direction="row"
            responsive
            margin={{ horizontal: "large" }}
            wrap
          >
            {searchResults.map((e, index) => (
              <ImageBox
                key={index}
                src={get(e, "media.m", "")}
                author={e.author}
                tags={e.tags}
                link={e.link}
                title={e.title}
              />
            ))}
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
  );
};

export default SearchList;

SearchList.propTypes = {
  searchResults: PropTypes.array.isRequired,
  loadState: PropTypes.string.isRequired
};
