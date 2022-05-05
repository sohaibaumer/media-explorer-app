import { useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import Logout from './Logout';
import {
  Modal,
  Card,
  CardActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../fonts/Billabong.ttf';

function ExploreNavigation(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [searchParams] = useSearchParams();
  function handleMenu() {
    setOpenMenu((prevState) => {
      return !prevState;
    });
  }
  return (
    <>
      <nav className="w-screen px-0 h-[64px] text-[#262626] border-t flex items-center justify-center xs:justify-between  md:items-start md:w-[72px] md:h-screen md:py-8 md:px-2 md:border-t-0 md:border-r md:flex-col md:justify-between xl:w-[240px]">
        <div className="m-0 md:mx-auto px-0 xl:m-0 xl:px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[48px] h-[48px] scale-[0.8] m-0 md:mx-auto lg:mx-0 xl:hidden"
          >
            <path d="m13.15 34.85 14.5-7.15 7.15-14.5-14.5 7.15ZM24 26q-.85 0-1.425-.575Q22 24.85 22 24q0-.85.575-1.425Q23.15 22 24 22q.85 0 1.425.575Q26 23.15 26 24q0 .85-.575 1.425Q24.85 26 24 26Zm0 18q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
          </svg>
          <h3 className="hidden font-[Billabong] text-4xl xl:block">
            Media Explorer
          </h3>
          <p className="hidden text-xs pl-2 translate-y-[-5px] xl:block">
            by Sohaib Aumer
          </p>
        </div>
        <ul className="flex md:flex-col md:w-full">
          <li>
            <NavLink
              to="?mode=Images"
              className="flex items-center  py-4 px-2 2xs:px-4 md:py-6 rounded-[80px] group hover:transition-transform_duration-300 hover:bg-slate-50  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-[#262626] group-hover:scale-105"
              >
                <path
                  className={`group-active:hidden group-focus:hidden ${
                    searchParams.get('mode') === 'Images' ? 'hidden' : ''
                  }`}
                  d="M10.025 14h7.95q.325 0 .463-.275.137-.275-.063-.525l-2.425-3.175q-.15-.2-.4-.2t-.4.2l-1.9 2.475L12.1 11q-.15-.2-.4-.2t-.4.2l-1.675 2.2q-.2.25-.063.525.138.275.463.275ZM8 18q-.825 0-1.412-.587Q6 16.825 6 16V4q0-.825.588-1.413Q7.175 2 8 2h12q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.412-.587Q2 20.825 2 20V7q0-.425.288-.713Q2.575 6 3 6t.713.287Q4 6.575 4 7v13h13q.425 0 .712.288.288.287.288.712t-.288.712Q17.425 22 17 22ZM8 4v12V4Z"
                />
                <path
                  className={` group-active:inline-block group-focus:inline-block ${
                    searchParams.get('mode') === 'Images'
                      ? 'inline-block'
                      : 'hidden'
                  }`}
                  d="M9 14h10l-3.45-4.5-2.3 3-1.55-2Zm-1 4q-.825 0-1.412-.587Q6 16.825 6 16V4q0-.825.588-1.413Q7.175 2 8 2h12q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18Zm-4 4q-.825 0-1.412-.587Q2 20.825 2 20V6h2v14h14v2Z"
                />
              </svg>
              <p className="hidden pl-4 group-active:font-medium group-focus:font-medium xl:block">
                Images
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="?mode=Videos"
              className="flex items-center  py-4 px-2 2xs:px-4 md:py-6 rounded-[80px] group hover:transition-transform duration-300 hover:bg-slate-50 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-[#262626] group-hover:scale-105"
              >
                <path
                  className={`group-active:hidden group-focus:hidden ${
                    searchParams.get('mode') === 'Videos' ? 'hidden' : ''
                  }`}
                  d="m13.05 13.5 4.15-2.65q.475-.275.475-.85t-.475-.85L13.05 6.5q-.5-.325-1.025-.05-.525.275-.525.875v5.35q0 .6.525.875t1.025-.05ZM8 18q-.825 0-1.412-.587Q6 16.825 6 16V4q0-.825.588-1.413Q7.175 2 8 2h12q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18Zm0-2h12V4H8v12Zm-4 6q-.825 0-1.412-.587Q2 20.825 2 20V7q0-.425.288-.713Q2.575 6 3 6t.713.287Q4 6.575 4 7v13h13q.425 0 .712.288.288.287.288.712t-.288.712Q17.425 22 17 22ZM8 4v12V4Z"
                />
                <path
                  className={` group-active:inline-block group-focus:inline-block ${
                    searchParams.get('mode') === 'Videos'
                      ? 'inline-block'
                      : 'hidden'
                  }`}
                  d="m11.5 14.5 7-4.5-7-4.5ZM8 18q-.825 0-1.412-.587Q6 16.825 6 16V4q0-.825.588-1.413Q7.175 2 8 2h12q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18Zm-4 4q-.825 0-1.412-.587Q2 20.825 2 20V6h2v14h14v2Z"
                />
              </svg>
              <p className="hidden pl-4 group-active:font-medium group-focus:font-medium xl:block">
                Videos
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="?mode=Search"
              className="flex items-center  py-4 px-2 2xs:px-4 md:py-6 rounded-[80px] group hover:transition-transform duration-300 hover:bg-slate-50 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-[#262626] group-hover:scale-105"
              >
                <path
                  className={`group-active:hidden group-focus:hidden ${
                    searchParams.get('mode') === 'Search' ? 'hidden' : ''
                  }`}
                  d="M12 15q.825 0 1.413-.588Q14 13.825 14 13t-.587-1.413Q12.825 11 12 11q-.825 0-1.412.587Q10 12.175 10 13q0 .825.588 1.412Q11.175 15 12 15Zm5.6 5-3.575-3.575q-.425.275-.937.425Q12.575 17 12 17q-1.65 0-2.825-1.175Q8 14.65 8 13q0-1.65 1.175-2.825Q10.35 9 12 9q1.65 0 2.825 1.175Q16 11.35 16 13q0 .575-.15 1.075t-.425.925L18 17.575v-8.85L14.05 4H6v16ZM6 22q-.825 0-1.412-.587Q4 20.825 4 20V4q0-.825.588-1.413Q5.175 2 6 2h9l5 6v12q0 .825-.587 1.413Q18.825 22 18 22Zm7-9.2Z"
                />
                <path
                  className={` group-active:inline-block group-focus:inline-block ${
                    searchParams.get('mode') === 'Search'
                      ? 'inline-block'
                      : 'hidden'
                  }`}
                  d="M12 15q.825 0 1.413-.588Q14 13.825 14 13t-.587-1.413Q12.825 11 12 11q-.825 0-1.412.587Q10 12.175 10 13q0 .825.588 1.412Q11.175 15 12 15Zm-6 7q-.825 0-1.412-.587Q4 20.825 4 20V4q0-.825.588-1.413Q5.175 2 6 2h9l5 6v11.575L15.425 15q.275-.425.425-.925.15-.5.15-1.075 0-1.65-1.175-2.825Q13.65 9 12 9q-1.65 0-2.825 1.175Q8 11.35 8 13q0 1.65 1.175 2.825Q10.35 17 12 17q.575 0 1.088-.15.512-.15.937-.425L19.2 21.6q-.225.2-.575.3-.35.1-.625.1Z"
                />
              </svg>
              <p className="hidden pl-4 group-active:font-medium group-focus:font-medium xl:block">
                Search
              </p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="?mode=Profile"
              className="flex items-center py-4 px-2 2xs:px-4 md:py-6 rounded-[80px] group hover:transition-transform duration-300 hover:bg-slate-50 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-[#262626] group-hover:scale-105"
              >
                <path
                  className={`group-active:hidden group-focus:hidden ${
                    searchParams.get('mode') === 'Profile' ? 'hidden' : ''
                  }`}
                  d="M5 17.85q1.35-1.325 3.138-2.088Q9.925 15 12 15t3.863.762q1.787.763 3.137 2.088V5H5ZM12 13q1.45 0 2.475-1.025Q15.5 10.95 15.5 9.5q0-1.45-1.025-2.475Q13.45 6 12 6q-1.45 0-2.475 1.025Q8.5 8.05 8.5 9.5q0 1.45 1.025 2.475Q10.55 13 12 13Zm-7 8q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm2-2h10v-.25q-1.05-.875-2.325-1.312Q13.4 17 12 17t-2.675.438Q8.05 17.875 7 18.75V19Zm5-8q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062Q11.375 8 12 8t1.062.438q.438.437.438 1.062t-.438 1.062Q12.625 11 12 11Zm0 .425Z"
                />
                <path
                  className={` group-active:inline-block group-focus:inline-block ${
                    searchParams.get('mode') === 'Profile'
                      ? 'inline-block'
                      : 'hidden'
                  }`}
                  d="M12 13q1.45 0 2.475-1.025Q15.5 10.95 15.5 9.5q0-1.45-1.025-2.475Q13.45 6 12 6q-1.45 0-2.475 1.025Q8.5 8.05 8.5 9.5q0 1.45 1.025 2.475Q10.55 13 12 13Zm-7 8q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14v-1.15q-1.35-1.325-3.137-2.088Q14.075 15 12 15t-3.862.762Q6.35 16.525 5 17.85V19Z"
                />
              </svg>
              <p className="hidden pl-4 group-active:font-medium group-focus:font-medium xl:block">
                Profile
              </p>
            </NavLink>
          </li>
        </ul>
        <button
          onClick={handleMenu}
          className="flex items-center  py-4 px-2 2xs:px-4 rounded-[80px] md:w-full group hover:transition-transform duration-300 hover:bg-slate-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 fill-[#262626] group-hover:scale-105"
          >
            <path d="M4 18q-.425 0-.712-.288Q3 17.425 3 17t.288-.712Q3.575 16 4 16h16q.425 0 .712.288.288.287.288.712t-.288.712Q20.425 18 20 18Zm0-5q-.425 0-.712-.288Q3 12.425 3 12t.288-.713Q3.575 11 4 11h16q.425 0 .712.287.288.288.288.713t-.288.712Q20.425 13 20 13Zm0-5q-.425 0-.712-.287Q3 7.425 3 7t.288-.713Q3.575 6 4 6h16q.425 0 .712.287Q21 6.575 21 7t-.288.713Q20.425 8 20 8Z" />
          </svg>
          <p className="hidden pl-4 group-active:font-medium group-focus:font-medium xl:block">
            More
          </p>
        </button>
      </nav>
      <Modal
        open={openMenu}
        onClose={handleMenu}
        BackdropProps={{ style: { backgroundColor: 'rgb(0,0,0,0.9)' } }}
      >
        <Card className="w-[240px] h-[48px] fixed right-[16px] bottom-[70px] md:left-[16px] flex">
          <CardActions className="w-full h-full flex justify-between items-center">
            <Logout />
            <IconButton onClick={handleMenu} sx={{ color: '#262626' }}>
              <CloseIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}

export default ExploreNavigation;
