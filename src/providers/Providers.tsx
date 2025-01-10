'use client'

import { PropsWithChildren } from 'react'
import AuthProvider from './auth-provider/AuthProvider'
import QueryProvider from './QueryProvider'
import StoreProvider from './StoreProvider'

export default function Providers({ children }: PropsWithChildren<unknown>) {
	return (
		<QueryProvider>
			<StoreProvider>
				<AuthProvider>{children}</AuthProvider>
			</StoreProvider>
		</QueryProvider>
	)
}
