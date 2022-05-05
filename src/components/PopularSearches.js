import React from 'react';
import { Link } from 'react-router-dom';

const PopularSearches = ({ searchTerm }) => {
  const popularSearches = [
    'Ramadan',
    'Mosque',
    'Flowers',
    'Nature',
    'Beach',
    'Car',
    'Food',
    'Landscape',
    'Technology',
    'Business',
    'Sky',
    'Dark',
    'Moon',
    'Space',
    'Texture',
    'Forest',
    'Water',
  ];

  return (
    <>
      <h1 className="font-bold text-lg text-black mb-2 mx-auto">Popular Searches</h1>
      <div className="max-w-[600px] flex flex-wrap justify-center gap-1">
        {popularSearches.map((search) => (
          <Link
            key={search}
            to="?mode=Search"
            onClick={() => searchTerm(search)}
            className="border border-black px-2 rounded-full text-black hover:bg-black hover:text-white hover:font-bold"
          >
            {search}
          </Link>
        ))}
      </div>
    </>
  );
};

export default PopularSearches;
