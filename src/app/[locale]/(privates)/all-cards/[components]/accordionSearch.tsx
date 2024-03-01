import Input from '@/components/input';
import { FilterAltOutlined, Search } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Stack,
  styled
} from '@mui/material';
import { useState } from 'react';
import page from '../page';

const AccordionSummaryStyled = styled(AccordionSummary)(() => ({
  '&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-focusVisible': {
    backgroundColor: 'transparent !important'
  }
}));

export interface AccordionSearchProps {
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchParams: {
    box: string;
    page: number;
    limit: number;
    name: string;
    rarity: string;
    code: string;
    searchQuery: string;
  };
}
function AccordionSearch({
  onInputChange,
  searchParams
}: AccordionSearchProps) {
  const [expandedFilters, setExpandedFilters] = useState(false);
  console.log(page);

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
              value={searchParams.searchQuery}
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
        <Input
          placeholder="Buscar"
          sx={{ ml: '14px' }}
          startContent={<Search sx={{ paddingRight: 1 }} />}
        />
        <Input
          placeholder="Buscar"
          sx={{ ml: '14px' }}
          startContent={<Search sx={{ paddingRight: 1 }} />}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionSearch;
