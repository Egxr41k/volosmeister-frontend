import { Metadata } from 'next';

import Reviews from './Reviews';
import { NO_INDEX_PAGE } from '@/constants/app.constants';

export const metadata: Metadata = {
  title: 'Reviews',
  ...NO_INDEX_PAGE,
};

export default function ReviewsPage() {
  return <Reviews />;
}
