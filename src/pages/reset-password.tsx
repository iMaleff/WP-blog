import { gql } from '@/__generated__'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Error from '@/components/Error'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'
import LoginLayout from '@/container/login/LoginLayout'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function ResetPassWord() {
	const [username, setUsername] = useState('')


	const [mutationsendPasswordResetEmail, { loading, data, error, called }] =
		useMutation(
			gql(/* GraphQL */ `
				mutation mutationSendPasswordResetEmail($username: String = "") {
					sendPasswordResetEmail(input: { username: $username }) {
						clientMutationId
						success
					}
				}
			`),
			{
				onCompleted: (data) => {
					if (data?.sendPasswordResetEmail?.success) {
						toast.success(
							'A password reset link has been sent to your email!',
							{
								position: 'bottom-center',
							},
						)
					}
				},
				onError: (error) => {
					toast.error(error.message, {
						position: 'bottom-center',
					})
				},
			},
		)

	const handleRegister = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!username) {
			toast.error('Email или имя пользователя обязательны!', {
				position: 'bottom-center',
			})
			return
		}
		mutationsendPasswordResetEmail({
			variables: {
				username,
			},
		})
	}

	const renderSuccess = () => {
		return (
			<div className="text-center">
				<p className="text-sm text-green-600">
					Ссылка для сброса пароля отправлена на ваш email!
				</p>

				<p className="mt-4 text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400">
					<Link
						href="/"
						className="text-primary-600 underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-400"
					>
						На главную
					</Link>
					<span className="mx-1">|</span>
					<Link
						href="/login"
						className="text-primary-600 underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-400"
					>
						Вход
					</Link>
				</p>
			</div>
		)
	}

	const renderForm = () => {
		return (
			<>
				<div className="grid gap-6">
					<form onSubmit={handleRegister}>
						<div className="grid gap-4">
							<div className="grid gap-1.5">
								<Label htmlFor="username">Email или имя пользователя</Label>
								<Input
									id="username"
									placeholder="Email или имя пользователя"
									autoCapitalize="none"
									autoCorrect="off"
									type="text"
									required
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>

							<div className="grid">
								<ButtonPrimary loading={loading}>
									Сбросить пароль
								</ButtonPrimary>

								{!!error?.message && (
									<Error className="mt-2 text-center" error={error.message} />
								)}
							</div>
						</div>
					</form>
				</div>

				<p className="text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400">
					<Link
						href="/login"
						className="text-primary-600 underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-400"
					>
						Вход
					</Link>
				</p>
			</>
		)
	}

	return (
		<LoginLayout
			isResetPasswordPage
			rightBtn={{
				text: 'Вход',
				href: '/login',
			}}
		>
			{called && data?.sendPasswordResetEmail?.success
				? renderSuccess()
				: renderForm()}
		</LoginLayout>
	)
}
