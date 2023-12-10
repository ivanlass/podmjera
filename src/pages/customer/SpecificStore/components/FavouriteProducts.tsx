import React from 'react';
import { Box, IconButton, Text, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import { articlesInterface } from '../../../../interfaces/articles.interface';
import ProductCard from '../../../../components/ProductCard';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface Props {
  articles: articlesInterface[];
  title: string;
}

const FavouriteProducts = ({ articles, title }: Props) => {
  const [isLessThan600] = useMediaQuery('(max-width: 600px)');
  const [isLargerThan1300] = useMediaQuery('(min-width: 1300px)');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 5,
    slides: { perView: isLessThan600 ? 2 : isLargerThan1300 ? 5 : 3, spacing: 5 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },

    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      {articles && (
        <Box mx='4' my='16' p={{ base: 0, md: '8' }} position='relative'>
          <Text fontSize='xl' mb='4'>
            {title}
          </Text>
          {loaded && instanceRef.current && !isLessThan600 && (
            <>
              <IconButton
                icon={<AiOutlineLeft size='20px' />}
                aria-label='go back'
                position='absolute'
                left='10px'
                top='50%'
                borderRadius='full'
                zIndex={1}
                transform='translate(0, -50%)'
                onClick={(e) => instanceRef.current?.prev()}
              />
              <IconButton
                icon={<AiOutlineRight size='20px' />}
                aria-label='go next'
                position='absolute'
                right='10px'
                top='50%'
                borderRadius='full'
                zIndex={1}
                transform='translate(0, -50%)'
                onClick={(e) => instanceRef.current?.next()}
              />
            </>
          )}
          <Box ref={sliderRef} className='keen-slider'>
            {articles.map((article: articlesInterface) => (
              <Box className='keen-slider__slide' mr='2' key={article._id} scrollSnapAlign='start' mb='4'>
                <ProductCard product={article} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default FavouriteProducts;
