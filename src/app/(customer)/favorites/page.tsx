import { Metadata } from 'next';

import Favorites from './Favorites';
import { NO_INDEX_PAGE } from '@/constants/app.constants';

export const metadata: Metadata = {
  title: 'Favorites',
  ...NO_INDEX_PAGE,
};

export default function FavoritesPage() {
  return <Favorites />;
}
