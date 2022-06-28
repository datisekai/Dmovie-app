import { Box, Grid, styled, TextField, Typography } from "@mui/material";
import HeadlessTippy from "@tippyjs/react/headless";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import movie from "../actions/movie";
import search from "../actions/search";
import useDebounce from "../hooks/useDebounce";
import { RootState } from "../redux/store";
import SearchNameCard from "./Card/SearchNameCard";
const SearchName = () => {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef<any>(null);
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);
  const [results, setResults] = useState([]);

  const theme = useSelector((state: RootState) => state.theme.theme);

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
    <Box width={"100%"}>
      <HeadlessTippy
        interactive
        visible={focus}
        onClickOutside={() => setFocus(false)}
        render={(attrs) => (
          <Box
            {...attrs}
            width={{
              md: "500px",
              xs: "95%",
            }}
            border='1px solid #ccc'
            p='20px'
            sx={{
              transition: "0.8s",
              overflowY: "scroll",
              overflowX: "hidden",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25);",
            }}
            borderRadius='5px'
            id={theme}
            maxHeight={350}
          >
            <Typography fontWeight={500} fontSize='18px'>
              Tìm kiếm hàng đầu
            </Typography>
            {results.length > 0 && (
              <Grid sx={{ mt: "10px" }} container spacing='10px'>
                {results.map((item: any) => (
                  <Grid
                    key={item.id}
                    item
                    md={6}
                    xs={12}
                    sx={{ cursor: "pointer" }}
                  >
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
        <input
          type='text'
          value={searchValue}
          onChange={handleChange}
          ref={inputRef}
          onFocus={() => setFocus(true)}
          id='inputSearch'
          placeholder='Tìm kiếm'
          style={{
            backgroundColor: `${theme === "dark" ? "#2a2a2a" : "#f2f2f2"}`,
            color: `${theme === "dark" ? "#ccc" : "#333"}`,
          }}
        />
      </HeadlessTippy>
    </Box>
  );
};

export default SearchName;
