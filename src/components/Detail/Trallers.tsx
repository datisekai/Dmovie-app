import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropsData from "../../models/PropsData";
import TrallerCard from "./TrallerCard";
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectCoverflow,
} from "swiper";
import useChangeWidth from "../../hooks/useChangeWidth";
import useSlidesView from "../../hooks/useSlidesView";
import { useRouter } from "next/router";

const Trallers: FC<PropsData> = ({ data }) => {
  SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);
  const slidesView = useSlidesView();

  const router = useRouter();

  const handleChangeTraller = (key: string) => {
    router.push(`[id]?key=${key}`, `${router.query.id}?key=${key}`);
  };

  return (
    <Box sx={{ width: "100%", mt: "20px" }}>
      <Typography my='10px' fontWeight={500} fontSize='18px'>
        Xem thêm trailer
      </Typography>
      <Swiper navigation autoplay spaceBetween={20} slidesPerView={slidesView}>
        {data?.map((item: any) => (
          <SwiperSlide
            key={item.key}
            onClick={() => handleChangeTraller(item.key)}
          >
            <TrallerCard keyVideo={item.key} name={item.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Trallers;
