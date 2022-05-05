import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addSnackbar } from '../store/index';
import classes from './CuratedPhotos.module.css';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import testImg from '../images/300w400h.png';

const API_KEY = process.env.REACT_APP_API_KEY || '';

function CuratedPhotos({ onSearchInput, onClick, onGetImageData }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [searchSubmission, setSearchSubmission] = useState('');
  const [modalData, setModalData] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    if (mode === 'Images') {
      setIsLoading(true);
      setError(null);
      fetch('https://api.pexels.com/v1/curated?per_page=80', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: API_KEY,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setImages(data.photos);
          setIsLoading(false);
        })
        .catch((error) => {
          dispatch(addSnackbar({ message: error.message, style: 'failure' }));

          setError(error.message);
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (searchSubmission || onSearchInput) {
      setIsLoading(true);
      const SEARCH_URL = `https://api.pexels.com/v1/search?query=${
        onSearchInput ? onSearchInput : searchSubmission
      }&per_page=80"`;
      fetch(SEARCH_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: API_KEY,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setImages(data.photos);
          setIsLoading(false);
        })
        .catch((error) => {
          dispatch(addSnackbar({ message: error.message, style: 'failure' }));

          setError(error.message);
          setIsLoading(false);
        });
    }
  }, [searchSubmission, onSearchInput]);

  const sequencedImages = [];
  const submitHandler = (event) => {
    event.preventDefault();
    setSearchSubmission(search);
  };
  if (images.length > 0) {
    for (let i = 0; i <= 79; i += 10) {
      sequencedImages.push({
        urls: images[i].src,
        alt: images[i].alt,
        id: images[i].id,
        rows: 2,
      });
      sequencedImages.push({
        urls: images[i + 1].src,
        alt: images[i + 1].alt,
        id: images[i + 1].id,
      });
      sequencedImages.push({
        urls: images[i + 2].src,
        alt: images[i + 2].alt,
        id: images[i + 2].id,
      });
      sequencedImages.push({
        urls: images[i + 3].src,
        alt: images[i + 3].alt,
        id: images[i + 3].id,
      });
      sequencedImages.push({
        urls: images[i + 4].src,
        alt: images[i + 4].alt,
        id: images[i + 4].id,
      });
      sequencedImages.push({
        urls: images[i + 5].src,
        alt: images[i + 5].alt,
        id: images[i + 5].id,
      });
      sequencedImages.push({
        urls: images[i + 6].src,
        alt: images[i + 6].alt,
        id: images[i + 6].id,
      });
      sequencedImages.push({
        urls: images[i + 7].src,
        alt: images[i + 7].alt,
        id: images[i + 7].id,
        rows: 2,
      });
      sequencedImages.push({
        urls: images[i + 8].src,
        alt: images[i + 8].alt,
        id: images[i + 8].id,
      });
      sequencedImages.push({
        urls: images[i + 9].src,
        alt: images[i + 9].alt,
        id: images[i + 9].id,
      });
    }
  }

  useEffect(() => {
    onGetImageData(modalData);
  }, [modalData]);

  const skeletonImages = [];
  for (let i = 0; i <= 79; i += 10) {
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
      rows: 2,
    });
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
    });
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
    });
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
    });
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
    });
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
    });
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
    });
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
      rows: 2,
    });
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
    });
    skeletonImages.push({
      url: testImg,
      alt: Math.random().toString(),
      id: Math.random(),
    });
  }

  const imagesMap = (
    <ul className={classes.imagesList}>
      {sequencedImages.map((image) => {
        return (
          <li key={image.id} className={image.rows ? `${classes.double} ` : ``}>
            <Link
              to={mode === 'Search' ? '?mode=Search' : '?mode=Images'}
              onClick={onClick}
            >
              <div
                onClick={() => {
                  setModalData(image);
                }}
              >
                <div>
                  <svg
                    color="#ffffff"
                    viewBox="0 0 24 24"
                    width="24"
                    fill="#ffffff"
                  >
                    <path
                      color="#ffffff"
                      d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"
                    ></path>
                  </svg>
                  <span>{parseInt(Math.random() * 100)}</span>
                </div>
                <div>
                  <svg
                    color="rgb(255, 255, 255)"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <span>{parseInt(Math.random() * 100)}</span>
                </div>
              </div>
              <img src={image.urls.portrait} alt={image.alt} />
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const imagesMapSkeleton = (
    <ul className={classes.imagesList}>
      {skeletonImages.map((image) => {
        return (
          <li key={image.id} className={image.rows ? `${classes.double} ` : ``}>
            <Link to="#" onClick={onClick} className={classes.imageThumbnail}>
              <img src={image.url} alt={image.alt} />
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="flex-column">
      {mode === 'Images' && (
        <div className=" h-[48px] w-[98%] rounded-lg border border-[#dfe1e5] xs:w-[80%] xs:rounded-3xl lg:w-[600px] my-8 mx-auto hover:shadow-[0px_1px_6px_rgba(32,33,36,.28)] hover:border-[rgba(223,225,229,0)]">
          <form
            className="flex w-full h-full mx-auto items-center "
            onSubmit={submitHandler}
          >
            <IconButton type="submit" variant="contained">
              <SearchIcon sx={{ color: '#262626' }} />
            </IconButton>
            <label htmlFor="search" />
            <input
              className="outline-none w-[60%] 2xs:w-[75%] sm:w-[80%]"
              placeholder="Search"
              id="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
        </div>
      )}
      {!isLoading && !error && images.length === 0 && (
        <p className="text-center">Found no relevant images!</p>
      )}
      {/* {!isLoading && error && <p> An error occurred: {error}</p>} */}
      {!isLoading && images.length > 0 && <div className="">{imagesMap}</div>}
      {isLoading && <div>{imagesMapSkeleton}</div>}
    </div>
  );
}

export default CuratedPhotos;
