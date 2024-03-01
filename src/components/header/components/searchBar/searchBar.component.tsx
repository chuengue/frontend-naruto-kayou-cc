import { ItemList } from '@/components';
import Input from '@/components/input';
import { api } from '@/services/api';
import { allCards } from '@/services/requests/cards/get';
import { getPublicCollections } from '@/services/requests/collections/get';
import { Search } from '@mui/icons-material';
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

function SearchBar() {
  const inputRef = useRef(null);
  const [searchParams, setSearchParams] = useState({
    box: '',
    page: 1,
    limit: 20,
    name: '',
    rarity: '',
    code: '',
    searchQuery: ''
  });
  const [onfocusInput, setOnfocusInput] = useState(false);
  const [inputWidth, setInputWidth] = useState('100%');
  const [typeSearch, setTypeSearch] = useState<string>('all-cards');

  const {
    data: allCardsData,
    refetch: allCardsRefetch,
    isLoading: allCardsIslLoading
  } = useQuery({
    queryKey: ['all_cards_search'],
    queryFn: () => allCards(api, searchParams),
    refetchOnWindowFocus: false
  });

  const {
    data: collectionsData,
    refetch: collectionsRefetch,
    isLoading: collectionsIsLoading
  } = useQuery({
    queryKey: ['public_collection_search'],
    queryFn: () =>
      getPublicCollections(api, {
        searchQuery: searchParams.searchQuery
      }),
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (onfocusInput) {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [onfocusInput]);

  useEffect(() => {
    if (typeSearch === 'all-cards') {
      allCardsRefetch();
    }
    if (typeSearch === 'collections') {
      collectionsRefetch();
    }
  }, [searchParams, allCardsRefetch, collectionsRefetch, typeSearch]);

  const handleResize = () => {
    if (inputRef.current) {
      setInputWidth(`${inputRef.current.clientWidth}px`);
    }
  };
  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    setTypeSearch(value);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '') {
      closeSearchList();
    } else {
      openSearchList();
    }

    if (typeSearch === 'all-cards') {
      setSearchParams(prevState => ({
        ...prevState,
        code: value
      }));
    } else if (typeSearch === 'collections') {
      setSearchParams(prevState => ({
        ...prevState,
        searchQuery: value
      }));
    }
  };
  const closeSearchList = () => {
    setOnfocusInput(false);
  };
  const openSearchList = () => {
    setOnfocusInput(true);
  };
  const handleFocusInput = () => {
    if (searchParams.code || searchParams.searchQuery) {
      return openSearchList();
    }
  };
  return (
    <>
      <Box ref={inputRef}>
        <Input
          key={'3'}
          placeholder="Buscar"
          label=""
          variant="filled"
          value={
            typeSearch === 'all-cards'
              ? searchParams.code
              : searchParams.searchQuery
          }
          onChange={handleChangeSearch}
          onFocus={handleFocusInput}
          onBlur={closeSearchList}
          endContent={
            <IconButton
              size="small"
              onClick={() => allCardsRefetch()}
              color="primary"
            >
              <Search />
            </IconButton>
          }
          startContent={
            <>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  value={typeSearch}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    }
                  }}
                >
                  <MenuItem value="all-cards">Cards</MenuItem>
                  <MenuItem value="collections">Coleções</MenuItem>
                </Select>
              </FormControl>
            </>
          }
        />
      </Box>
      <Box
        top={{ xs: '116px', sm: '116px', md: '58px' }}
        sx={{
          backgroundColor: 'offWhite.main',
          borderRadius: '0px 0px 12px 12px',
          transition: 'max-height 0.3s ease',
          maxHeight: onfocusInput ? '400px' : '0',
          overflow: 'scroll',
          position: 'absolute',
          // top: '58px',
          zIndex: 1,
          width: inputWidth,
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {typeSearch === 'all-cards' && (
          <>
            {allCardsData?.results.map((item, index) => (
              <Box key={item.code}>
                <ItemList
                  id={item.id}
                  title={item.code}
                  subtitle={item.box}
                  imgSrc={item.imgSrc}
                  isLoading={allCardsIslLoading}
                />
                <>
                  {index < allCardsData.results.length - 1 && (
                    <Divider orientation="horizontal" variant="middle" />
                  )}
                </>
              </Box>
            ))}
          </>
        )}
        {typeSearch === 'collections' && (
          <>
            {collectionsData?.results.collections.map((collection, index) => (
              <Box key={index}>
                <ItemList
                  id={collection.id}
                  title={collection.title}
                  subtitle={collection.description}
                  author={collection.userData.username}
                  isLoading={collectionsIsLoading}
                />
                {index < collectionsData?.results.collections.length - 1 && (
                  <Divider orientation="horizontal" variant="middle" />
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </>
  );
}

export default SearchBar;
