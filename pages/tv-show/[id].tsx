import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import { IsBrowser } from "../../src/components/IsBrowser";
import MainLayout from "../../src/components/layout/MainLayout";
import WidthLayout from "../../src/components/layout/WidthLayout";

interface TVShowProps {
  id: string;
}

const TVShow: FC<TVShowProps> = ({ id }) => {
  return (
    <IsBrowser>
      <MainLayout>
        <WidthLayout>TvShow ID {id}</WidthLayout>
      </MainLayout>
    </IsBrowser>
  );
};

export default TVShow;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  return {
    props: {
      id,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
