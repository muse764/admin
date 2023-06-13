'use client';
import { Navigation } from '@mui/icons-material';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Albums', href: '/albums' },
  { name: 'Genres', href: '/genres' },
  { name: 'Images', href: '/images' },
  { name: 'Playlists', href: '/playlists' },
  { name: 'Tracks', href: '/tracks' },
  { name: 'Users', href: '/users' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="sidebar">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={`sidebar__item ${
            pathname === item.href ? 'sidebar__item--active' : ''
          }`}
        >
          <Navigation />
          {item.name}
        </a>
      ))}
    </div>
  );
}
