import { Avatar, Typography } from "@mui/material";
import React, { FC } from "react";
import { IMAGE_300 } from "../../config";
import FlexBox from "../FlexBox";

interface ProducerDetailProps {
  image: string;
  id: string;
  name: string;
}

const ProducerDetail: FC<ProducerDetailProps> = ({ image, id, name }) => {
  return (
    <FlexBox alignItems={"center"}>
      <Avatar alt={name} src={`${IMAGE_300}${image}`} />
      <Typography pl='10px' fontWeight={"500"}>
        {name}
      </Typography>
    </FlexBox>
  );
};

export default ProducerDetail;
