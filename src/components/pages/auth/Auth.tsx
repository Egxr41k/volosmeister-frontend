'use client'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { IEmailPassword } from '@/store/user/user.interface'
import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'
import Spinner from '@/ui/Spinner'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'

const Auth = () => {
	useAuthRedirect()

	const { isLoading } = useAuth()

	const { register, login } = useActions()

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IEmailPassword> = data => {
		if (type === 'login') {
			login(data)
		} else {
			register(data)
		}

		reset()
	}

	return (
		<section className="flex h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="m-auto rounded-lg bg-white p-8 shadow-sm"
			>
				<h1 className="mb-4 text-center text-3xl font-semibold capitalize">
					{type}
				</h1>
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<Field
							{...formRegister('email', {
								required: 'Email is required',
								pattern: {
									value: validEmail,
									message: 'Please enter a valid email address'
								}
							})}
							placeholder="Email"
							error={errors.email?.message}
						/>
						<Field
							{...formRegister('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min length should more 6 symbols'
								}
							})}
							type="password"
							placeholder="Password"
							error={errors.password?.message}
						/>
						<Button variant="selected">Lets go!</Button>
						<div>
							<button
								type="button"
								className="mt-3 inline-block text-sm opacity-20"
								onClick={() => setType(type === 'login' ? 'register' : 'login')}
							>
								{type === 'login' ? 'Register' : 'Login'}
							</button>
						</div>
					</>
				)}
			</form>
		</section>
	)
}

export default Auth
