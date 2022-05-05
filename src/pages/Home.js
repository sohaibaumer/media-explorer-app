import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import mobFrame from '../images/mobileframe1.png';
import '../fonts/Billabong.ttf';
import landscapes from '../images/landscapes.png';
import flowers from '../images/flowers.png';
import animals from '../images/animals.png';
import technology from '../images/technology.png';
import cars from '../images/cars.png';
import food from '../images/food.png';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const images = useMemo(
    () => [
      { src: landscapes, alt: 'landscapes' },
      { src: flowers, alt: 'flowers' },
      { src: animals, alt: 'animals' },
      { src: technology, alt: 'technology' },
      { src: cars, alt: 'cars' },
      { src: food, alt: 'food' },
    ],
    []
  );

  const mode = searchParams.get('mode');

  useEffect(() => {
    setSearchParams({ mode: 'Login' });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (currentImageIndex) => (currentImageIndex + 1) % images.length
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="mx-auto my-auto 2xs:m-auto flex justify-center items-center basis-2 ">
      <div className="hidden relative h-[600px] w-[300px] my-2 md:block ">
        <img
          src={mobFrame}
          alt="phone frame"
          className="w-[300px] h-[600px] absolute top-0 left-0"
        />
        <img
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          className="w-[95%] h-[96%] absolute top-2 left-2 z-[-10] "
        />
      </div>
      <div className="my-auto mx-auto 2xs:mx-4 flex flex-col items-center w-screen 2xs:w-[320px] border-0 xs:border xs:border-black px-2 py-8 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
          <path d="m13.15 34.85 14.5-7.15 7.15-14.5-14.5 7.15ZM24 26q-.85 0-1.425-.575Q22 24.85 22 24q0-.85.575-1.425Q23.15 22 24 22q.85 0 1.425.575Q26 23.15 26 24q0 .85-.575 1.425Q24.85 26 24 26Zm0 18q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" />
        </svg>
        <h3 className="font-[Billabong] text-4xl py-8 2xs:p-8">
          Media Explorer
        </h3>
        {mode === 'Login' && <Login />}
        {mode === 'Signup' && <Signup />}
      </div>
    </div>
  );
};

export default HomePage;
