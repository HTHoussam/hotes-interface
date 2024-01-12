import { languages } from '@/libs';
import { useLocaleLanguageStore } from '@/stores/variables-store';
import { MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { FlagIcon } from 'react-flag-kit';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  const { setLanguageCode } = useLocaleLanguageStore();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);

  const handleLanguageChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const langCode = event.target.value;
      setSelectedLanguage(langCode);
      changeLanguage(langCode);
      setLanguageCode(langCode);
    },
    [changeLanguage, setLanguageCode],
  );
  return (
    <Select
      labelId="language-select"
      onChange={handleLanguageChange}
      id="language-selector"
      native={false}
      value={selectedLanguage}
      MenuProps={{
        sx: {
          width: 'fit-content',
        },
      }}
      sx={{
        width: '100%',
        maxWidth: '10rem',
        maxHeight: '2rem',
        height: '100%',
      }}
    >
      {languages.map((lang) => (
        <MenuItem value={lang.id} key={lang.id}>
          <Stack direction={'row'} alignItems={'center'} gap={2}>
            <FlagIcon code={lang.code} size={15} />
            <Typography>{lang.label}</Typography>
          </Stack>
        </MenuItem>
      ))}
    </Select>
  );
};
export default LanguageSelector;
