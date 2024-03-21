'use client';
import { CardViewerList } from '@/components';

import { api } from '@/services/api';
import { allCards } from '@/services/requests/cards/get';
import { getRarities } from '@/services/requests/rarities/get';
import { raritiesCards } from '@/services/requests/rarities/types';
import { Pagination, Stack } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AccordionSearch, {
  AccordionSearchProps
} from './[components]/accordionSearch';

function AllCardsPage() {
  const [allRarities, setAllRarities] = useState<raritiesCards[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<
    AccordionSearchProps['searchParams']
  >({
    page: 1,
    limit: 20
  });
  const [allCardsPayload, SetAllCardsPayload] = useState<
    AccordionSearchProps['searchPayload']
  >({
    box: [],
    name: '',
    rarity: [],
    code: '',
    searchQuery: ''
  });
  const { data: allRaritiesData } = useQuery({
    queryKey: ['all-rarities'],
    queryFn: () => getRarities(api)
  });

  useEffect(() => {
    if (allRaritiesData?.results) {
      setAllRarities(allRaritiesData?.results);
    }
  }, [allRaritiesData]);

  const handleClickRarity = (rarity: raritiesCards) => {
    if (selectedRarities.includes(rarity.name)) {
      setSelectedRarities(selectedRarities.filter(id => id !== rarity.name));
      SetAllCardsPayload(prevState => ({
        ...prevState,
        rarity: prevState.rarity.filter(id => id !== rarity.name)
      }));
    } else {
      const newSelectedRarities = [...selectedRarities, rarity.name];
      setSelectedRarities(newSelectedRarities);
      SetAllCardsPayload(prevState => ({
        ...prevState,
        rarity: newSelectedRarities
      }));
    }
  };

  const { data, mutate, isPending } = useMutation({
    mutationKey: ['all_cards'],
    mutationFn: () => allCards(api, allCardsPayload, searchParams)
  });

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
    SetAllCardsPayload(prevState => ({
      ...prevState,
      searchQuery: value
    }));
    setSearchParams(prevState => ({
      ...prevState,
      page: searchParams.page !== 1 ? 1 : prevState.page
    }));
  };
  useEffect(() => {
    mutate();
  }, [searchParams, mutate, allCardsPayload]);

  return (
    <Stack height="100%" alignItems="center">
      <AccordionSearch
        selectedRarities={selectedRarities}
        allRarities={allRarities}
        onClickRarities={handleClickRarity}
        onInputChange={handleChangeSearch}
        searchParams={searchParams}
        searchPayload={allCardsPayload}
      />
      <Stack>
        <CardViewerList
          cards={data?.results}
          isLoading={isPending}
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
