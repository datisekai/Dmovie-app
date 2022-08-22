import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC, useMemo } from "react";
import { IMAGE_500 } from "../config";
import styleLineClamp from "../utils/styleLineClamp";

interface SlideReviewProps {
  data: any;
  media_type: string;
}

const SlideReview: FC<SlideReviewProps> = ({ data, media_type }) => {
  const movie = useMemo(() => {
    const randomMovie: any = () => {
      const random = Math.floor(Math.random() * data.length);
      if (!data[random].overview) {
        return randomMovie();
      }
      return data[random];
    };
    return randomMovie();
  }, [data]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${IMAGE_500}/${movie.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        mb: 2,
        width: "100%",
        aspectRatio: {
          md: "16/6",
          xs: "16/9",
        },
        borderRadius: "10px",
        "&::after": {
          content: '""',
          inset: 0,
          backgroundColor: "rgba(51,51,51,.712)",
          position: "absolute",
          zIndex: 1,
          borderRadius: "10px",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          top: "50%",
          transform: "translateY(-50%)",
          px: 5,
        }}
      >
        <Typography
          sx={styleLineClamp(2)}
          mt={1}
          fontSize={{ md: 30, xs: 22 }}
          color='#fff'
        >
          {movie.title ||
            movie.original_title ||
            movie.name ||
            movie.original_name ||
            "Not found title"}
        </Typography>
        <Typography
          color='#fff'
          sx={{
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            opacity: 0.9,
            display: {
              md: "-webkit-box",
              xs: "none",
            },
          }}
          mt={1}
        >
          {movie.overview}
        </Typography>
        <Link href={`/${media_type}/${movie.id}`}>
          <Button sx={{ mt: 2 }} variant='contained'>
            Xem ngay
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default SlideReview;
