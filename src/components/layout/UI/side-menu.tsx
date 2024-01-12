import useIsMobile from '@/hooks/useIsMobile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, ClickAwayListener, Stack, styled } from '@mui/material';
import { useCallback, useState } from 'react';
import { Shield } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const imgLink = '/imgs/kapitalkontrol-logo.png';

const SideMenu = () => {
  const initialValue = JSON.parse(localStorage.getItem('CollapsedMenu') ?? '{}');
  const { isMobile } = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(typeof initialValue === 'boolean' && initialValue);
  const toggleMenuCollapse = useCallback(() => {
    localStorage.setItem('isSideMenuCollapsed', String(!isCollapsed));
    setIsCollapsed((prev) => !prev);
  }, [isCollapsed]);
  const [showCollapseBtn, setShowCollapseBtn] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => (isMobile ? setIsCollapsed(true) : () => {})}>
      <StyledMenu
        onMouseEnter={() => (!isMobile ? setShowCollapseBtn(true) : setIsCollapsed(false))}
        onMouseLeave={() => setShowCollapseBtn(false)}
        sx={{
          maxWidth: !isCollapsed ? '14rem' : '5rem',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        {!isMobile && (
          <CollapseButton
            onClick={() => {
              toggleMenuCollapse();
            }}
            collapsedisplay={showCollapseBtn ? 'flex' : 'none'}
            collapseleft={isCollapsed ? 40 : 217}
          >
            {isCollapsed ? <ArrowForwardIcon /> : <ArrowBackIcon />}
          </CollapseButton>
        )}
        <Stack
          p={2}
          gap={4}
          color={'white'}
          sx={{
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Stack
            sx={{
              flex: 0.5,
            }}
          >
            <Box>
              <Link to={'/'}>
                <img alt="kk2-logo" src={isCollapsed || isMobile ? '/imgs/kk_Logo.png' : imgLink} />
              </Link>
            </Box>
          </Stack>
          <Stack
            sx={{
              justifyContent: 'flex-start',
              height: '100%',
              gap: '2rem',
              flex: 3.5,
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Stack key={index} gap={1}>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <Stack key={idx} direction={'row'} justifyContent={'space-between'} minHeight={'1.5rem'}>
                    <Stack flexDirection={'row'} gap={2} fontWeight={600}>
                      <Shield size={20} />
                      {!isCollapsed && <Box>Administration</Box>}
                    </Stack>
                    <Box fontSize={'14'} fontWeight={'300'}>
                      (A)
                    </Box>
                  </Stack>
                ))}
              </Stack>
            ))}
          </Stack>
          <ContactBox>
            {!isCollapsed && (
              <>
                KapitalKontroll AS
                <br />
                Hovfaret 10
                <br />
                0275 Oslo
                <br />
                Org.nr: 920 854 028
                <br />
                support@kapitalkontroll.no
              </>
            )}
          </ContactBox>
        </Stack>
      </StyledMenu>
    </ClickAwayListener>
  );
};
export default SideMenu;
const StyledMenu = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // rgb(41, 77, 138)
  height: '100vh',
  width: '100%',
}));
const ContactBox = styled(Box)(({ theme }) => ({
  flex: 1,
  color: theme.palette.whitey?.light,
  fontWeight: 600,
  fontSize: '13px',
  textWrap: 'nowrap',
}));

interface CollapseButtonProps {
  collapsedisplay: string;
  collapseleft: number;
}

export const CollapseButton = styled(Box)<CollapseButtonProps>(({ theme, collapsedisplay, collapseleft }) => ({
  display: collapsedisplay,
  left: collapseleft,
  color: 'white',
  position: 'absolute',
  width: '40px',
  height: '40px',
  backgroundColor: theme.palette.primary.main,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  right: '-20px',
  top: 'calc((100vh - 50px) / 2)',
  cursor: 'pointer',
  zIndex: 2002,
}));
