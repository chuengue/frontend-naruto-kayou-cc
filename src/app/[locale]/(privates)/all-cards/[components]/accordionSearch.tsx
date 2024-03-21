import Input from '@/components/input';
import { raritiesCards } from '@/services/requests/rarities/types';
import { FilterAltOutlined, Search } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  styled
} from '@mui/material';
import { useState } from 'react';

const AccordionSummaryStyled = styled(AccordionSummary)(() => ({
  '&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-focusVisible': {
    backgroundColor: 'transparent !important'
  }
}));

export interface AccordionSearchProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allRarities: raritiesCards[];
  selectedRarities: string[];
  onClickRarities: (rarity: raritiesCards) => void;
  searchParams: {
    page: number;
    limit: number;
  };
  searchPayload: {
    box: string[];
    name: string;
    rarity: string[];
    code: string;
    searchQuery: string;
  };
}
function AccordionSearch({
  onInputChange,
  searchParams,
  searchPayload,
  allRarities,
  onClickRarities,
  selectedRarities
}: AccordionSearchProps) {
  const [expandedFilters, setExpandedFilters] = useState(false);

  return (
    <Accordion
      disableGutters
      expanded={expandedFilters}
      sx={{
        width: '100%'
      }}
      elevation={0}
    >
      <AccordionSummaryStyled expandIcon={<></>}>
        <Stack width="100%" justifyContent="center" alignItems="center">
          <Stack
            direction="row"
            justifyContent="center"
            width={{ xs: '100%', sm: '100%', md: '80%', lg: '80%' }}
          >
            <Input
              placeholder="Busque por Nome/código"
              onChange={onInputChange}
              value={searchPayload.searchQuery || ''}
              fullWidth
              startContent={<Search sx={{ paddingRight: 1 }} />}
            />

            <IconButton
              onClick={() => {
                setExpandedFilters(!expandedFilters);
              }}
            >
              <FilterAltOutlined />
            </IconButton>
          </Stack>
        </Stack>
      </AccordionSummaryStyled>
      <AccordionDetails>
        <Stack>
          <Stack>
            <ToggleButtonGroup
              value={selectedRarities}
              aria-label="text formatting"
            >
              {allRarities.map(rarity => {
                return (
                  <ToggleButton
                    key={rarity.id}
                    value={rarity.name}
                    onClick={() => onClickRarities(rarity)}
                  >
                    {rarity.name}
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionSearch;
