import React, { FC, useEffect, useState } from "react";
import { reactionImage } from "../data/reaction";
import FlexBox from "../FlexBox";

interface InfoReactions {
  data: any[];
}

const InfoReactions: FC<InfoReactions> = ({ data }) => {
  const [iconImage, setIconImage] = useState<any[]>([]);

  useEffect(() => {
    let icons: any[] = [];
    data.forEach((item: any) => {
      if (!icons.includes(item.iconId)) {
        icons.push(item.iconId);
      }
    });
    setIconImage(icons);
  }, [data]);
  return (
    <FlexBox alignItems={"center"}>
      {iconImage.map((item: any, index: number) => {
        return (
          <img
            key={index}
            src={reactionImage[item]}
            style={{
              width: "15px",
              height: "15px",
              marginLeft: "2px",
            }}
          />
        );
      })}
    </FlexBox>
  );
};

export default InfoReactions;
