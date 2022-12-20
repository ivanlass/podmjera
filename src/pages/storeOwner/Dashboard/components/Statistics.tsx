import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';

interface StatisticsProps {
  label: string;
  number: number;
  helpText?: string;
}

const Statistics = ({ label, number, helpText }: StatisticsProps) => {
  return (
    <Stat bg='neutral.10' boxShadow='base' borderRadius='md' p='4'>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{number} KM</StatNumber>
      <StatHelpText>{helpText}</StatHelpText>
    </Stat>
  );
};

export default Statistics;
