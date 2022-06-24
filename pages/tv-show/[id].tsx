import { Box } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";
import tv from "../../src/actions/tv";
import DetailEpisode from "../../src/components/Detail/DetailEpisode";
import DetailVideo from "../../src/components/Detail/DetailVideo";
import Seasons from "../../src/components/Detail/Seasons";
import Similars from "../../src/components/Detail/Similars";
import VideoCard from "../../src/components/Detail/VideoCard";
import { IsBrowser } from "../../src/components/IsBrowser";
import MainLayout from "../../src/components/layout/MainLayout";
import WidthLayout from "../../src/components/layout/WidthLayout";
import Meta from "../../src/components/Meta";
import { getTvShow2Embed, IMAGE_500 } from "../../src/config";
import TvShowProps from "../../src/models/TvShowProps";

const TVShow: FC<TvShowProps> = ({ episodeSeasons, detail, similars }) => {
  const router = useRouter();
  const season = router.query.s;
  const episode = router.query.e;

  const embed =
    season && episode
      ? getTvShow2Embed(
          router.query.id as string,
          season.toString(),
          episode.toString()
        )
      : getTvShow2Embed(router.query.id as string, "1", "1");

  let detailEpisode: any = null;
  if (season && episode) {
    const episodes = episodeSeasons.find((item: any) => {
      return item.season_number == season;
    });

    if (episodes) {
      detailEpisode = episodes.episodes.find(
        (item: any) => item.episode_number == episode
      );
    }
  }

  const renderMeta = () => {
    if (season && episode && detailEpisode) {
      return (
        <Meta
          image={`${IMAGE_500}${detailEpisode.still_path}`}
          title={detailEpisode.name || detailEpisode.original_name}
          description={detailEpisode.overview}
        />
      );
    }

    return (
      <Meta
        image={`${IMAGE_500}${detail.backdrop_path}`}
        title={
          detail.title ||
          detail.original_title ||
          detail.name ||
          detail.original_name
        }
        description={detail.overview}
      />
    );
  };

  return (
    <>
      {renderMeta()}
      <IsBrowser>
        <MainLayout>
          <WidthLayout>
            <Box
              p='20px'
              sx={{
                display: "flex",
                flexDirection: {
                  md: "row",
                  xs: "column",
                },
              }}
            >
              <Box
                sx={{
                  width: {
                    md: "75%",
                    xs: "100%",
                  },
                }}
              >
                <VideoCard keyVideo={embed} />
                {season && episode && detailEpisode && (
                  <DetailEpisode
                    name={detailEpisode.name}
                    air_date={detailEpisode.air_date}
                    overview={detailEpisode.overview}
                    season={season.toString()}
                    episode={episode.toString()}
                  />
                )}
                <DetailVideo data={detail} />
                <Box>
                  {episodeSeasons?.map((item: any, index: number) => {
                    return (
                      <Seasons
                        key={index}
                        data={item.episodes}
                        number={index}
                      />
                    );
                  })}
                </Box>
              </Box>

              <Similars data={similars} media_type='tv-show' />
            </Box>
          </WidthLayout>
        </MainLayout>
      </IsBrowser>
    </>
  );
};

export default TVShow;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  const dataSimilars = await tv.getSimilars(id);
  const dataDetail = await tv.getDetail(id);
  const dataEpisode = await tv.getEpisodeSeason(id, dataDetail.seasons);

  return {
    props: {
      similars: dataSimilars.results,
      detail: dataDetail,
      episodeSeasons: dataEpisode,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
