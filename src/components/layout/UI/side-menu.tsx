import useIsMobile from '@/hooks/useIsMobile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, ClickAwayListener, Popover, Stack, styled } from '@mui/material';
import { useCallback, useState } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { NavLinks } from '.';

const InfoComponent = () => {
  return (
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
  );
};
const SideMenu = () => {
  const initialValue = JSON.parse(localStorage.getItem('CollapsedMenu') ?? '{}');
  const { isMobile } = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(typeof initialValue === 'boolean' && initialValue);
  const toggleMenuCollapse = useCallback(() => {
    localStorage.setItem('isSideMenuCollapsed', String(!isCollapsed));
    setIsCollapsed((prev) => !prev);
  }, [isCollapsed]);
  const [showCollapseBtn, setShowCollapseBtn] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
          gap={4}
          color={'white'}
          sx={{
            justifyContent: 'space-between',
            height: '100%',
            paddingLeft: '0.75rem',
            paddingRight: '0.5rem',
            paddingTop: '1rem',
          }}
        >
          <Stack
            sx={{
              flex: 0.5,
              minHeight: '4.5rem',
            }}
          >
            <Box
              sx={{
                marginInline: 'auto',
              }}
            >
              <Link
                to={'/'}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img alt="kk2-logo" src={'/imgs/kk2_Logo.png'} />
                {!isCollapsed && !isMobile && (
                  <img
                    alt="kk2-logo"
                    src={'/imgs/kk2_logo_text.png'}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      opacity: isCollapsed || isMobile ? 0 : 1,
                      transform: `scale(${isCollapsed || isMobile ? 0 : 1})`,
                      transition: 'opacity 0.75s ease-out, transform 0.75s ease-out',
                    }}
                  />
                )}
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
            <NavLinks isCollapsed={isCollapsed} />
          </Stack>
          <ContactBox>
            {!isCollapsed ? (
              <InfoComponent />
            ) : (
              <Stack
                sx={{
                  alignItems: 'center',
                }}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <InfoCircle size={20} color="white" />
              </Stack>
            )}
          </ContactBox>
          <Popover
            id="info-popover"
            sx={{
              pointerEvents: 'none',
              '& .MuiPaper-root': {
                paddingInline: '1rem',
                paddingBlock: '0.5rem',
                maxWidth: '12rem',
              },
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <InfoComponent />
          </Popover>
        </Stack>
      </StyledMenu>
    </ClickAwayListener>
  );
};
export default SideMenu;
const StyledMenu = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: '100vh',
  width: '100%',
}));
const ContactBox = styled(Box)(({ theme }) => ({
  flex: 1,
  color: theme.palette.whitey?.light,
  fontWeight: 600,
  fontSize: '13px',
  textWrap: 'nowrap',
  minHeight: '8rem',
  textAlign: 'center',
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
