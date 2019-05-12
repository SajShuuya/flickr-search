import React from "react";
import { Search } from "grommet-icons";
import { Button } from "grommet";

const SearchButton = ({ onClick }) => {
  return (
    <Button icon={<Search color="brand" />} onClick={onClick} hoverIndicator />
  );
};

export default SearchButton;
