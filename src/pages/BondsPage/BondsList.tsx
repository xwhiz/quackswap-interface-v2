import React from 'react';
import { useFetchBonds } from 'hooks/bond/useFetchBonds';
import useParsedQueryString from 'hooks/useParsedQueryString';
import Loader from 'components/Loader';
import BondItem from './BondItem';
import { Box } from '@material-ui/core';

interface BondsListProps {
  search: string;
}

const BondsList: React.FC<BondsListProps> = ({ search }) => {
  const parsedQuery = useParsedQueryString();
  const bondsStatus =
    parsedQuery && parsedQuery.status
      ? (parsedQuery.status as string)
      : 'available';
  const bondsType =
    parsedQuery && parsedQuery.bondType
      ? (parsedQuery.bondType as string)
      : 'availableBonds';

  const { loading, data: bonds } = useFetchBonds();

  return (
    <Box pb={2} px={3}>
      {loading && (
        <Box className='flex justify-center items-center' height='100px'>
          <Loader size='32px' />
        </Box>
      )}
      {bonds && bonds?.length > 0 && (
        <>
          {bonds.map((bond) => (
            <BondItem key={bond.index} bond={bond} />
          ))}
        </>
      )}
    </Box>
  );
};

export default BondsList;
