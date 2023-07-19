import { Box } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

const shakeAnimation = keyframes`
  0% {
    transform: translateX(0);
    outline:4px solid red;
    box-shadow: 0 0 10px red;
  }
  5% {
    transform: translateX(-10px);
    outline:4px solid red;
    box-shadow: 0 0 10px red;
  }
  10% {
    transform: translateX(10px);
    outline:4px solid red;
    box-shadow: 0 0 10px red;
  }
  15% {
    transform: translateX(-10px);
    outline:4px solid red;
    box-shadow: 0 0 10px red;
  }
  20% {
    transform: translateX(10px);
    outline:4px solid red;
    box-shadow: 0 0 10px red;
  }
  25% {
    transform: translateX(0);
    outline:4px solid red;
    box-shadow: 0 0 10px red;
  }
  100% {
    transform: translateX(0);
    outline:4px solid red;
    box-shadow: 0 0 10px red;
  }
`;

interface Props {
  shake: boolean;
  setShake: (shake: boolean) => void;
  children: React.ReactNode;
}

const ShakeBox = ({ shake, setShake, children }: Props) => {
  return (
    <Box p={4} mb={8} bg='neutral.10' borderRadius='xl' boxShadow='md' animation={`${shake ? shakeAnimation : ''} 2s linear`} onAnimationEnd={() => setShake(false)}>
      {children}
    </Box>
  );
};

export default ShakeBox;
