const styleLineClamp = (line: number) => {
  return {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: line,
  };
};

export default styleLineClamp;
