'use client';

import { useQuery } from '@tanstack/react-query';

import Heading from '@/ui/Heading';

import { convertPrice } from '@/utils/convertPrice';

import { OrderService } from '@/services/order.service';

export default function MyOrders() {
  const { data: orders } = useQuery(
    ['my orders'],
    () => OrderService.getByUserId(),
    { select: ({ data }) => data },
  );

  return (
    <>
      <Heading>My order</Heading>

      <section>
        {orders?.length ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg bg-white shadow flex gap-10 p-7 my-7"
            >
              <span>#{order.id}</span>
              <span>{order.status}</span>
              <span>
                {new Date(order.craetedAt).toLocaleDateString('ru-RU')}
              </span>
              <span>{convertPrice(order.total)}</span>
            </div>
          ))
        ) : (
          <div>Orders not found</div>
        )}
      </section>
    </>
  );
}
