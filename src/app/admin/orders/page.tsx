import { Metadata } from 'next';

import Orders from './Orders';
import { NO_INDEX_PAGE } from '@/constants/app.constants';

export const metadata: Metadata = {
  title: 'Orders',
  ...NO_INDEX_PAGE,
};

export default function OrdersPage() {
  return <Orders />;
}
