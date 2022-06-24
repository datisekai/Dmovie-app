import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import GenresProps from "../../models/GenresProps";
import FlexBox from "../FlexBox";

const GenresTv: FC<GenresProps> = ({ title, data }) => {
  const router = useRouter();
  const handleFilterGenre = (id: string) => {
    router.push({
      query: {
        ...router.query,
        gt: id,
      },
    });
  };

  const gt = router.query.gt as string;

  return (
    <Box>
      <Typography fontWeight={500} fontSize='18px'>
        {title}
      </Typography>
      <FlexBox flexWrap={"wrap"} alignItems='center'>
        <Link href={"/search"}>
          <a>
            <Button
              sx={{ mt: "10px" }}
              variant={`${!gt ? "contained" : "text"}`}
            >
              Tất cả
            </Button>
          </a>
        </Link>
        {data?.map((item: any, index: number) => (
          <Button
            onClick={() => handleFilterGenre(item.id)}
            sx={{ mt: "10px" }}
            key={item.id}
            variant={`${+gt == item.id ? "contained" : "text"}`}
          >
            {item.name}
          </Button>
        ))}
      </FlexBox>
    </Box>
  );
};

export default GenresTv;
