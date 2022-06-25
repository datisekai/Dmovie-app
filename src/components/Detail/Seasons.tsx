import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC } from "react";
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  EffectCoverflow,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGE_300 } from "../../config";
import useSlidesView from "../../hooks/useSlidesView";
import PropsData from "../../models/PropsData";
import TrallerCard from "./TrallerCard";

interface SeasonsProps {
  data: any[];
  number: number;
}

const Seasons: FC<SeasonsProps> = ({ data, number }) => {
  SwiperCore.use([Navigation, Autoplay, Pagination, EffectCoverflow]);

  const slidesView = useSlidesView();

  const router = useRouter();

  const handleChangeEpisode = (episode: string) => {
    router.push(
      `[id]?s=${number}&e=${episode}`,
      `${router.query.id}?s=${number}&e=${episode}`
    );
  };

  console.log(slidesView);

  return (
    <Box sx={{ width: "100%", mt: "20px" }}>
      <Typography my='10px' fontWeight={500} fontSize='18px'>
        Season {number}
      </Typography>
      <Swiper navigation autoplay spaceBetween={20} slidesPerView={slidesView}>
        {data?.map((item: any, index: number) => (
          <SwiperSlide
            key={index}
            onClick={() => handleChangeEpisode(item.episode_number)}
          >
            <TrallerCard
              link={`${
                item.still_path
                  ? `${IMAGE_300}${item.still_path}`
                  : "https://fisnikde.com/wp-content/uploads/2019/01/broken-image.png"
              }`}
              keyVideo={item.key}
              name={`${item.episode_number}. ${
                item.name || item.original_name
              }`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Seasons;
