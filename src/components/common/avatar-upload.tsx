import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const AvatarUpload = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error(t('common.feedback.no.image.selected'));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result as string);
    };
    reader.readAsDataURL(file);

    toast.success(t('common.feedback.image.uploaded'));
  };
  return (
    <Box
      sx={{
        cursor: 'pointer',
      }}
    >
      <label htmlFor="avatar-input">
        <Avatar
          alt="User Avatar"
          variant="square"
          src={selectedFile ?? '/favicon/apple-touch-icon-144x144.png'}
          sx={{
            p: 1,
            width: 120,
            height: 120,
            cursor: 'pointer',
            '&.MuiAvatar-img': {
              objectFit: 'contain',
            },
            border: '1px solid',
            borderColor: (theme) => theme.palette.divider,
            boxShadow: (theme) => `0 0 0 1px ${theme.palette.divider} inset`,
          }}
        />
        <input accept="image/*" id="avatar-input" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          sx={{ position: 'absolute', bottom: 0, right: 0 }}
        >
          <PhotoCamera width={25} height={25} />
        </IconButton>
      </label>
      <Typography variant="caption" color="textSecondary" sx={{ marginTop: 1 }}>
        {t('common.image.upload')}
      </Typography>
    </Box>
  );
};
export default AvatarUpload;
