import { IconDropdown } from '@/components';
import { usePathname, useRouter } from '@/navigation';
import { HdrWeak, Translate } from '@mui/icons-material';
import { CircularProgress, Tooltip } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { HeaderMenuOptionProps } from '../header.types';

function SwitchLocale() {
  const t = useTranslations('header');

  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();
  function onSelectChange(nextLocale: string) {
    if (locale === nextLocale) return;
    startTransition(() => {
      replace(pathname, { locale: nextLocale });
    });
  }
  const translateMenuOptions: HeaderMenuOptionProps[] = [
    {
      title: 'Ingles',
      icon: <HdrWeak />,
      selected: locale === 'en',
      onClick: () => onSelectChange('en')
    },
    {
      title: 'Portuguese',
      onClick: () => onSelectChange('pt'),
      selected: locale === 'pt',
      icon: <HdrWeak />
    }
  ];
  return (
    <>
      {isPending ? (
        <CircularProgress size={20} color="secondary" sx={{ mr: 1 }} />
      ) : (
        <Tooltip title={t('changeTranslateTooltip')}>
          <div>
            <IconDropdown options={translateMenuOptions} icon={<Translate />} />
          </div>
        </Tooltip>
      )}
    </>
  );
}
export default SwitchLocale;
