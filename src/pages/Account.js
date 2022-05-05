import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import CuratedPhotos from '../components/CuratedPhotos';
import Videos from '../components/Videos';
import ExploreNavigation from '../components/ExploreNavigation';
import { Modal, Card, CardMedia, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import ToggleSwitch from '../components/ToggleSwitch';
import SearchIcon from '@mui/icons-material/Search';
import Profile from '../components/Profile';
import SearchLabel from '../components/SearchLabel';
import PopularSearches from '../components/PopularSearches';

function AccountPage() {
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [imageData, setImageData] = useState();
  const [videoData, setVideoData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState(null);
  const [switchState, setSwitchState] = useState(false);

  const mode = searchParams.get('mode');

  useEffect(() => {
    setSearchParams({ mode: 'Images' });
  }, []);

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    setSearchInput(searchInputRef.current.value);
    searchInputRef.current.value = '';
  };

  useEffect(() => {
    if (mode !== 'Search') {
      setSearchInput(null);
    }
  }, [mode]);

  function switchHandler(checked) {
    setSwitchState(checked);
  }

  const imageModal = (
    <Modal
      open={openModal}
      onClose={closeModalHandler}
      className="rounded-[1%] sm:m-[10vh_10vw] flex"
      BackdropProps={{ style: { backgroundColor: 'rgb(0,0,0,0.9)' } }}
    >
      <Card
        raised
        className="w-[98vw] outline-none rounded-none m-auto md:max-w-[60vw] md:max-h-[60vh] md:rounded-[1%]"
      >
        <CardMedia
          image={imageData && imageData.urls.landscape}
          className="h-[60vh] relative bg-black"
        >
          <IconButton
            aria-label="close"
            sx={{ position: 'absolute', right: '0' }}
            onClick={closeModalHandler}
          >
            <CancelIcon
              sx={{
                color: 'white',
                backgroundColor: 'rgb(0,0,0,0.5)',
                borderRadius: '50%',
                padding: '0.5px',
                '&:hover': {
                  backgroundColor: 'rgb(0,0,0,0.8)',
                  color: 'rgb(255,255,255,0.5)',
                },
              }}
            />
          </IconButton>
          <div className="w-full h-full flex flex-col justify-end  2xs:flex-row items-end content-end 2xs:justify-center md:justify-end">
            <Link
              to={mode === 'Search' ? '?mode=Search' : '?mode=Images'}
              className="text-md text-white mx-0 2xs:mx-2 my-0.5 2xs:my-0 bg-black/50 pr-2 pl-1 rounded-sm hover:bg-black/80 hover:text-white/50"
              onClick={() => {
                downloadImage(
                  imageData.urls.original,
                  `${imageData.id}-original.jpg`
                );
              }}
            >
              <DownloadIcon sx={{ fontSize: 'medium' }} />
              Original
            </Link>
            <Link
              to={mode === 'Search' ? '?mode=Search' : '?mode=Images'}
              className="text-md text-white mx-0 my-0.5 2xs:my-0 2xs:mx-2 bg-black/50 pr-2 pl-1 rounded-sm hover:bg-black/80 hover:text-white/50"
              onClick={() => {
                downloadImage(
                  imageData.urls.landscape,
                  `${imageData.id}-landscape.jpg`
                );
              }}
            >
              <DownloadIcon sx={{ fontSize: 'medium' }} />
              Landscape
            </Link>
            <Link
              to={mode === 'Search' ? '?mode=Search' : '?mode=Images'}
              className="text-md text-white mx-0 2xs:mx-2 my-0.5 2xs:my-0 bg-black/50 pr-2 pl-1 rounded-sm hover:bg-black/80 hover:text-white/50"
              onClick={() => {
                downloadImage(
                  imageData.urls.portrait,
                  `${imageData.id}-portrait.jpg`
                );
              }}
            >
              <DownloadIcon sx={{ fontSize: 'medium' }} />
              Portrait
            </Link>
          </div>
        </CardMedia>
      </Card>
    </Modal>
  );

  const videoModal = (
    <Modal
      open={openModal}
      onClose={closeModalHandler}
      className="rounded-[1%] flex"
      BackdropProps={{ style: { backgroundColor: 'rgb(0,0,0,0.9)' } }}
    >
      <div className="relative m-auto">
        <IconButton
          aria-label="close"
          sx={{ position: 'absolute', right: '0', top: '0', zIndex: '200' }}
          onClick={closeModalHandler}
        >
          <CancelIcon
            sx={{
              color: 'white',
              '&:hover': {
                color: 'rgb(255,255,255,0.7)',
              },
            }}
          />
        </IconButton>
        <video
          src={videoData && videoData.video_files[0].link}
          type={videoData && videoData.video_files[0].file_type}
          controls
          autoPlay
          className="m-auto max-w-[98vw] max-h-[80vh] md:max-w-[80vw] md:max-h-[80vh]"
        />
      </div>
    </Modal>
  );

  const navigate = useNavigate();

  function openModalHandler() {
    setOpenModal(true);
  }

  function closeModalHandler() {
    setOpenModal(false);
  }

  function getImageData(data) {
    setImageData(data);
  }

  function getVideoData(data) {
    setVideoData(data);
  }

  function downloadImage(url, fileName) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      responseType: 'blob',
    })
      .then((response) => {
        response.blob().then((blob) => {
          let url = window.URL.createObjectURL(new Blob([blob]));
          let a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(a);
          }, 200);
        });
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    const loggedInUsersFromLocalStorage =
      JSON.parse(localStorage.getItem('loggedInUsers')) || [];
    setLoggedInUsers(loggedInUsersFromLocalStorage);

    window.addEventListener('popstate', handlePopstate);

    const stateObj = { page: 'account' };
    window.history.pushState(stateObj, '', '');

    return () => window.removeEventListener('popstate', handlePopstate);
  }, []);

  function handlePopstate() {
    window.history.pushState(null, '', '');
    navigate(-1);
  }

  return (
    <div className="relative w-screen">
      <div className="fixed bottom-0 left-0 z-[1000] md:top-0 md:left-0 md:z-0">
        <ExploreNavigation />
      </div>

      {mode === 'Images' && imageData && imageModal}
      {mode === 'Videos' && videoData && videoModal}
      {mode === 'Search' && !switchState && imageData && imageModal}
      {mode === 'Search' && switchState && videoData && videoModal}
      {mode === 'Images' && (
        <div className="flex flex-col items-center md:ml-[72px] xl:ml-[240px]">
          <CuratedPhotos
            onClick={openModalHandler}
            onGetImageData={getImageData}
            onSearchInput={!switchState && searchInput && searchInput}
          />
        </div>
      )}
      {mode === 'Videos' && (
        <div className="flex flex-col items-center md:ml-[72px] xl:ml-[240px]">
          <Videos
            onClick={openModalHandler}
            onGetVideoData={getVideoData}
            onSearchInput={switchState && searchInput && searchInput}
          />
        </div>
      )}
      {mode === 'Search' && (
        <div
          className={`flex flex-col items-center ${
            !searchInput && 'h-screen justify-center'
          } mx-2 md:ml-[72px] xl:ml-[240px]`}
        >
          {!searchInput && <SearchLabel />}
          <div className=" h-[48px] w-[100%] rounded-lg border border-black xs:w-[80%] xs:rounded-3xl lg:w-[600px] my-4 sm:my-6 mx-auto hover:shadow-[0px_1px_6px_rgba(32,33,36,.28)] hover:border-[rgba(223,225,229,0)] ">
            <form
              className="flex w-full h-full pr-2 items-center "
              onSubmit={searchSubmitHandler}
            >
              <IconButton type="submit" variant="contained">
                <SearchIcon sx={{ color: '#262626' }} />
              </IconButton>
              <label htmlFor="search" />
              <input
                className="outline-none bg-transparent focus:bg-transparent w-[60%] 2xs:w-[75%] sm:w-[80%]"
                placeholder="Search"
                id="search"
                ref={searchInputRef}
              />
              <ToggleSwitch onGetSwitchState={switchHandler} />
            </form>
          </div>
          {!searchInput && (
            <PopularSearches searchTerm={(search) => setSearchInput(search)} />
          )}
          {!switchState && searchInput && (
            <CuratedPhotos
              onClick={openModalHandler}
              onGetImageData={getImageData}
              onSearchInput={!switchState && searchInput && searchInput}
            />
          )}
          {switchState && searchInput && (
            <Videos
              onClick={openModalHandler}
              onGetVideoData={getVideoData}
              onSearchInput={switchState && searchInput && searchInput}
            />
          )}
        </div>
      )}
      {mode === 'Profile' && (
        <div className="h-screen mx-4 md:ml-[72px] md:mr-0 xl:ml-[240px] xl:mr-0">
          <Profile />
        </div>
      )}
    </div>
  );
}

export default AccountPage;
