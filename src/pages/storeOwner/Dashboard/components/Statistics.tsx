import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';

interface StatisticsProps {
  label: string;
  number: number;
  helpText?: string;
}

const Statistics = ({ label, number, helpText }: StatisticsProps) => {
  return (
    <Stat height={'100%'} bg='neutral.10' boxShadow='md' borderRadius='xl' p='4'>
      <StatLabel>{label}</StatLabel>
      <StatNumber fontSize={{ base: 'md', lg: '2xl' }}>{number.toFixed(2)} KM</StatNumber>
      <StatHelpText>{helpText}</StatHelpText>
    </Stat>
  );
};

export default Statistics;
