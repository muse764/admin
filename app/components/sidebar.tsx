'use client';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { items } from './config';
import Logo from './logo';
import { Scrollbar } from './scrollbar';
import SidebarItem from './sidebar_item';

export default function Sidebar({
  open,
  onClose,
}: {
  open: any;
  onClose: any;
}) {
  const pathname = usePathname();
  const theme = useTheme();
  const lgup = useMediaQuery(theme.breakpoints.up('lg'));

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {items.map((item) => {
              const active = pathname === item.path;
              return (
                <SidebarItem
                  active={active}
                  icon={item.icon}
                  path={item.path}
                  title={item.title}
                  key={item.title}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgup) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'rgb(28, 37, 54)',
            color: 'common.white',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'rgb(28, 37, 54)',
          color: 'common.white',
          width: 280,
        },
      }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}
