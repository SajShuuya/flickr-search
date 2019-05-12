import React from "react";
import { Box, Image, Text, Heading } from "grommet";

const ImageBox = ({ src, author, tags, title, link }) => {
  return (
    <Box width="medium" background="light-1" margin="small">
      <Box pad={{ horizontal: "small" }}>
        <Heading level={4} wordBreak="break-word">
          {author}
        </Heading>
      </Box>
      <a href={link}>
        <Box>
          <Image src={src} />
        </Box>
      </a>
      <Box margin={"small"}>
        <Text alignSelf="center">{title}</Text>
      </Box>
      {tags ? (
        <Box border={"top"} margin={{ top: "small" }} pad={"small"}>
          <Text wordBreak="break-word">
            <Text color="brand">Tags:</Text> {tags}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};

export default ImageBox;
