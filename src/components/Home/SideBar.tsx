import { Box, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import sidebar from "../data/sidebar";
import FlexBox from "../FlexBox";

const SideBar = () => {
  const router = useRouter();

  return (
    <Box
      p={"20px"}
      sx={{
        display: {
          md: "block",
          xs: "none",
        },
      }}
    >
      {sidebar?.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.url} href={item.url}>
            <a>
              <FlexBox py={"8px"}>
                <Button
                  size='large'
                  startIcon={<Icon />}
                  variant={router.pathname == item.url ? "contained" : "text"}
                >
                  {item.title}
                </Button>
              </FlexBox>
            </a>
          </Link>
        );
      })}
    </Box>
  );
};

export default SideBar;
