import React, { FC } from "react";

import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as LinkMUI } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import categoryData from "./data/category";
import { stringify } from "querystring";

interface NavigationProps {
  hasEndLink: linkType;
}

interface linkType {
  url: string;
  title: string;
}

const Breadcrumb: FC<NavigationProps> = ({ hasEndLink }) => {
  const router = useRouter();

  let arrayLink = [];
  for (var key in router.query) {
    if (key != "page") {
      arrayLink.push(router.query[key]);
    }
  }

  let linkRender: Array<linkType> = [];

  arrayLink.forEach((item) => {
    const link = categoryData.find(
      (category) =>
        category.url === `/${item}` && category.url !== hasEndLink.url
    );
    if (link) {
      linkRender.push(link);
    }
  });

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <Link href={"/"}>
        <LinkMUI underline='hover' color='inherit'>
          Trang chủ
        </LinkMUI>
      </Link>

      {linkRender?.map((item) => (
        <Link key={item.url} href={`${item.url}`}>
          <LinkMUI underline='hover' color='inherit'>
            {item.title}
          </LinkMUI>
        </Link>
      ))}
      <Typography color='text.primary'>{hasEndLink.title}</Typography>
    </Breadcrumbs>
  );
};

export default Breadcrumb;
