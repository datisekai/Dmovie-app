import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import useDebounce from "../hooks/useDebounce";
import movie from "../actions/movie";
import search from "../actions/search";
import SearchNameCard from "./SearchNameCard";
import FlexBox from "./FlexBox";
import { IMAGE_300 } from "../config";
import Image from "next/image";
import Link from "next/link";
const SearchName = () => {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!debounceValue.trim()) {
      getNoDebounce();
    } else {
      getDebounce(debounceValue);
    }
  }, [debounceValue]);

  const getNoDebounce = async () => {
    const data = await movie.getTrending();
    setResults(data.results);
  };

  const getDebounce = async (query: string) => {
    const data = await search.getSearchByName(query);
    setResults(data.results);
  };

  const handleChange = (e: any) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    <Box>
      <HeadlessTippy
        interactive
        visible={focus}
        onClickOutside={() => setFocus(false)}
        render={(attrs) => (
          <Box
            {...attrs}
            bgcolor='white'
            width={"500px"}
            border='1px solid #ccc'
            p='20px'
            sx={{
              transition: "0.8s",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            borderRadius='5px'
            id='searchNameBox'
            maxHeight={350}
          >
            <Typography fontWeight={500} fontSize='18px'>
              Tìm kiếm hàng đầu
            </Typography>
            {results.length > 0 && (
              <Grid sx={{ mt: "10px" }} container spacing='10px'>
                {results.map((item: any) => (
                  <Grid key={item.id} item md={6} sx={{ cursor: "pointer" }}>
                    <Link
                      href={`/${
                        item.media_type == "movie" ? item.media_type : "tv-show"
                      }/${item.id}`}
                    >
                      <a>
                        <SearchNameCard
                          date={item.release_date || item.first_air_date}
                          image={item.poster_path || item.backdrop_path}
                          media_type={item.media_type || "Movie"}
                          name={
                            item.title ||
                            item.name ||
                            item.original_title ||
                            item.original_name
                          }
                        />
                      </a>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}
            {results.length < 1 && (
              <Typography mt='10px' align='center'>
                Không tìm thấy kết quả
              </Typography>
            )}
          </Box>
        )}
      >
        <TextField
          size='small'
          id='outlined-basic'
          label='Tìm kiếm'
          value={searchValue}
          onChange={handleChange}
          fullWidth
          onFocus={() => setFocus(true)}
          ref={inputRef}
          sx={{
            display: {
              md: "inline-block",
              xs: "none",
            },
            width: "500px",
          }}
          variant='outlined'
        />
      </HeadlessTippy>
    </Box>
  );
};

export default SearchName;
