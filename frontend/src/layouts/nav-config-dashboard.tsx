import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Inici',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Items',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Comandes',
    path: '/comanda',
    icon: icon('ic-cart'),
  },
];
