'use client';
import { CardViewerList } from '@/components';
import { useCardsQuery } from '@/hooks/useCardQuery';

import { Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import AccordionSearch from './[components]/accordionSearch';

function AllCardsPage() {
  const [searchParams, setSearchParams] = useState({
    box: '',
    page: 1,
    limit: 20,
    name: '',
    rarity: '',
    code: '',
    searchQuery: ''
  });
  const { data, isError, isLoading, refetch, isFetching } =
    useCardsQuery(searchParams);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams(prevState => {
      return {
        ...prevState,
        page: value
      };
    });
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchParams(prevState => ({
      ...prevState,
      page: searchParams.page !== 1 ? 1 : prevState.page,
      searchQuery: value
    }));
  };
  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  return (
    <Stack height="100%" alignItems="center">
      <AccordionSearch
        onInputChange={handleChangeSearch}
        searchParams={searchParams}
      />
      <Stack>
        <CardViewerList
          cards={data?.results}
          isLoading={isLoading || isFetching}
          cardViewerProps={{ isAuthenticated: true, hasFavBtn: true }}
        />
      </Stack>

      <Stack my={5}>
        <Pagination
          count={data?.totalPages}
          page={searchParams['page']}
          onChange={handleChangePagination}
        />
      </Stack>
    </Stack>
  );
}

export default AllCardsPage;
