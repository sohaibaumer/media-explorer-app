import React from 'react';

const SearchLabel = () => {
  return (
    <div className="flex mx-auto flex-col justify-center items-center w-full h-24 sm:h-32">
      <p className="h-full font-extrabold text-transparent text-xl mx-2 xs:mx-0 xs:text-2xl md:text-3xl bg-clip-text bg-gradient-to-t from-[#b5b5b5] via-black to-[#b5b5b5] flex justify-center items-center">
        Search&nbsp;
        <span className="bg-black opacity-70 text-white p-0.5 sm:p-1 md:p-2 rounded-lg">
          Images
        </span>
        &nbsp;or&nbsp;
        <span className="bg-black opacity-70 text-white p-0.5 sm:p-1 md:p-2 rounded-lg">
          Videos
        </span>
      </p>
    </div>
  );
};

export default SearchLabel;
