import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import useChangeWidth from "../../hooks/useChangeWidth";
import GenresProps from "../../models/GenresProps";
import FlexBox from "../FlexBox";

const GenresMovie: FC<GenresProps> = ({ title, data }) => {
  const width = useChangeWidth();
  const [showAll, setShowAll] = useState(true);
  const router = useRouter();
  const handleFilterGenre = (id: string) => {
    router.push({
      query: {
        ...router.query,
        gm: id,
      },
    });
  };

  useEffect(() => {
    if (width !== 0 && width < 768) {
      setShowAll(false);
    }
  }, [width]);

  const gm = router.query.gm as string;
  const dataRender = showAll ? data : data.slice(0, 4);
  return (
    <Box>
      <FlexBox alignItems={"center"} justifyContent='space-between'>
        <Typography fontWeight={500} fontSize='18px'>
          {title}
        </Typography>
        <Button
          onClick={() => setShowAll(!showAll)}
          size='small'
          variant='outlined'
        >
          {showAll ? "Thu gọn" : "Xem tất cả"}
        </Button>
      </FlexBox>
      <FlexBox flexWrap={"wrap"} alignItems='center'>
        <Link href={"/search"}>
          <a>
            <Button
              sx={{ mt: "10px" }}
              variant={`${!gm ? "contained" : "text"}`}
            >
              Tất cả
            </Button>
          </a>
        </Link>
        {dataRender?.map((item: any, index: number) => (
          <Button
            onClick={() => handleFilterGenre(item.id)}
            sx={{ mt: "10px" }}
            key={item.id}
            variant={`${+gm == item.id ? "contained" : "text"}`}
          >
            {item.name}
          </Button>
        ))}
      </FlexBox>
    </Box>
  );
};

export default GenresMovie;
