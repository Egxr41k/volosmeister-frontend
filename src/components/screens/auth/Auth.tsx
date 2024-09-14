'use client'
import Spinner from '@/components/Spinner'
import Heading from '@/components/ui/Heading'
import Meta from '@/components/ui/Meta'
import Button from '@/components/ui/button/Button'
import Field from '@/components/ui/input/Field'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { IEmailPassword } from '@/store/user/user.interface'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'

const Auth: FC = () => {
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
			console.log(data)
		}

		reset()
	}

	return (
		<Meta title="Auth">
			<section className="flex h-screen bg-white">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="m-auto rounded-lg border border-solid border-gray-300 bg-white p-8 text-black shadow-sm"
				>
					<Heading className="mb-4 text-center capitalize">{type}</Heading>

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
							<Button variant="orange">Lets go!</Button>
							<div>
								<button
									type="button"
									className="mt-3 inline-block text-sm opacity-20"
									onClick={() =>
										setType(type === 'login' ? 'register' : 'login')
									}
								>
									{type === 'login' ? 'Register' : 'Login'}
								</button>
							</div>
						</>
					)}
				</form>
			</section>
		</Meta>
	)
}

export default Auth
