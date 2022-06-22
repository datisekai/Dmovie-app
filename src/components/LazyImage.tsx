import {
  bgcolor,
  borderRadius,
  BordersProps,
  compose,
  spacing,
  SpacingProps,
  styled,
} from "@mui/system";
import NextImage, { ImageProps } from "next/image";
import React from "react";
const LazyImage = styled<React.FC<ImageProps & BordersProps & SpacingProps>>(
  ({ borderRadius, ...rest }) => <NextImage {...rest} />
)(compose(spacing, borderRadius, bgcolor));
export default LazyImage;
