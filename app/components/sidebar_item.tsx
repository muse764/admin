import { Box, ButtonBase } from '@mui/material';
import NextLink from 'next/link';

export default function SidebarItem({
  active,
  icon,
  path,
  title,
}: {
  active: boolean;
  icon: any;
  path: string;
  title: string;
}) {
  const linkprops = path
    ? {
        component: NextLink,
        href: path,
      }
    : {};
  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        }}
        {...linkprops}
      >
        <Box
          component="span"
          sx={{
            alignItems: 'center',
            color: 'neutral.400',
            display: 'inline-flex',
            justifyContent: 'center',
            mr: 2,
            ...(active && {
              color: 'primary.main',
            }),
          }}
        >
          {icon}
        </Box>
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white',
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
}
