import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const API_KEY = process.env.REACT_APP_API_KEY || '';

const popVdosUrl = 'https://api.pexels.com/videos/popular?per_page=78';

function Videos({ onClick, onGetVideoData, onSearchInput }) {
  const [videos, setVideos] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [searchSubmission, setSearchSubmission] = useState('');
  const [modalData, setModalData] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    if (mode === 'Videos') {
      setLoading(true);
      axios
        .get(popVdosUrl, {
          headers: {
            Authorization: API_KEY,
          },
        })
        .then((response) => {
          setVideos(response.data.videos);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (searchSubmission || onSearchInput) {
      setLoading(true);
      const searchVdosUrl = `https://api.pexels.com/videos/search?query=${
        onSearchInput ? onSearchInput : searchSubmission
      }&per_page=80`;

      axios
        .get(searchVdosUrl, {
          headers: {
            Authorization: API_KEY,
          },
        })
        .then((response) => {
          setVideos(response.data.videos);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [searchSubmission, onSearchInput]);

  const submitHandler = (event) => {
    event.preventDefault();
    setSearchSubmission(search);
  };

  useEffect(() => {
    onGetVideoData(modalData);
  }, [modalData]);

  if (error) {
    return `Error: ${error.message}`;
  }

  if (loading) {
    return (
      <>
        {mode === 'Videos' && (
          <div className="animate-pulse h-[48px] w-[100%] bg-gray-200 m-6 xs:w-[80%] xs:rounded-3xl lg:w-[600px] my-8 mx-auto "></div>
        )}
        <ul className="grid grid-cols-1 gap-0.5 xs:grid-cols-2 sm:gap-1.5 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => (
            <li key={i}>
              <div className="animate-pulse h-[300px] w-[300px] bg-gray-200 xs:rounded-[3%]"></div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  const videosMap = (
    <ul className="mx-auto grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-1.5 lg:grid-cols-3">
      {videos.map((vdo) => {
        const [baseUrl, queryString] = vdo.image.split('?');
        const updatedQueryString =
          'auto=compress&cs=tinysrgb&fit=crop&h=300&w=300';
        const updatedImageUrl = `${baseUrl}?${updatedQueryString}`;
        return (
          <li
            key={vdo.id}
            className="mx-auto w-[100vw] h-[100vw] 2xs:w-[300px] 2xs:h-[300px]"
          >
            <Link
              to={mode === 'Search' ? '?mode=Search' : '?mode=Videos'}
              onClick={onClick}
              className="inline-block w-full h-full relative"
            >
              <div className="w-full h-full absolute top-0 left-0 z-[50] bg-transparent 2xs:rounded-[3%]">
                <svg
                  className="w-7 h-7 mt-2 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  height="36"
                  viewBox="0 96 960 960"
                  width="36"
                  fill="white"
                >
                  <path d="m382 750 272-174-272-174v348ZM165 887q-30.938 0-52.969-22.031Q90 842.938 90 812V340q0-30.938 22.031-52.969Q134.062 265 165 265h630q30.938 0 52.969 22.031Q870 309.062 870 340v472q0 30.938-22.031 52.969Q825.938 887 795 887H165Zm0-75h630V340H165v472Zm0 0V340v472Z" />
                </svg>
              </div>
              <div
                className="absolute w-full h-full bg-black/50 z-[100] flex flex-col items-center justify-center gap-y-1 2xs:rounded-[3%] opacity-0 hover:opacity-100 sm:flex-row sm:gap-x-6"
                onClick={() => {
                  setModalData(vdo);
                }}
              >
                <div className="flex items-center gap-x-1">
                  <svg
                    className="w-[60%] h-[60%] xs:w-[75%] xs:h-[75%] sm:w-full sm:h-full"
                    color="#ffffff"
                    viewBox="0 0 24 24"
                    width="24"
                    fill="#ffffff"
                  >
                    <path
                      className="w-full h-full"
                      color="#ffffff"
                      d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                    ></path>
                  </svg>
                  <span className="text-white text-sm">
                    {parseInt(Math.random() * 100)}
                  </span>
                </div>
                <div className="flex items-center gap-x-1">
                  <svg
                    className="w-[60%] h-[60%] xs:w-[75%] xs:h-[75%] sm:w-full sm:h-full"
                    color="rgb(255, 255, 255)"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      className="w-full h-full"
                      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <span className="text-white text-sm">
                    {parseInt(Math.random() * 100)}
                  </span>
                </div>
              </div>
              <img src={updatedImageUrl} className="2xs:rounded-[3%]" alt='thumbnail'/>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex-column">
      {mode === 'Videos' && (
        <div className=" h-[48px] w-[96%] mx-auto xs:mx-auto rounded-lg border border-black xs:w-[80%] xs:rounded-3xl lg:w-[600px] my-8 hover:shadow-[0px_1px_6px_rgba(32,33,36,.28)] hover:border-[rgba(223,225,229,0)]">
          <form
            className="flex w-full h-full xs:pr-2 items-center "
            onSubmit={submitHandler}
          >
            <IconButton type="submit" variant="contained">
              <SearchIcon sx={{ color: '#262626' }} />
            </IconButton>
            <label htmlFor="search" />
            <input
              className="outline-none bg-transparent focus:bg-transparent w-[60%] 2xs:w-[75%] sm:w-[80%]"
              placeholder="Search"
              id="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
        </div>
      )}
      {!loading && !error && videos.length === 0 && (
        <p className="text-center">Found no relevant videos!</p>
      )}
      {!loading && error && <p> Something went wrong! {error}.</p>}
      {!loading && videos.length > 0 && <div>{videosMap}</div>}
    </div>
  );
}

export default Videos;
