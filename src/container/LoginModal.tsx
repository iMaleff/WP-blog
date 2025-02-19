import React, { FC, useEffect } from 'react'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Error from '@/components/Error'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'
import Logo from '@/components/Logo/Logo'
import { IS_CHISNGHIAX_DEMO_SITE } from '@/contains/site-settings'
import { useLogin } from '@faustwp/core'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useLoginModal } from '@/hooks/useLoginModal'
import NcModal from '@/components/NcModal/NcModal'
import { useRouter } from 'next/router'

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = () => {
	const { login, loading, data, error } = useLogin()
	const { closeLoginModal, isOpen, urlRiderect } = useLoginModal()
	const router = useRouter()
	

	useEffect(() => {
		if (!!data?.generateAuthorizationCode.error) {
			// remove html tags on error message
			const errorMessage = data?.generateAuthorizationCode.error.replace(
				/<[^>]+>/g,
				'',
			)
			toast.error(errorMessage, {
				position: 'bottom-center',
			})
			return
		}

		if (!!data?.generateAuthorizationCode.code) {
			toast.success(
				'Вход выполнен успешно, страница перезагружается для синхронизации...',
				{
					position: 'bottom-center',
					duration: 5000,
				},
			)

			// redirect to the urlRiderect or refresh
			!urlRiderect && router.reload()
			return
		}
	}, [data?.generateAuthorizationCode.code])

	const closeModal = closeLoginModal

	const errorMessage = error?.message || data?.generateAuthorizationCode.error

	const renderContent = () => {
		return (
			<div className="flex min-h-full flex-1 flex-col justify-center py-2.5 sm:p-6 lg:pb-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<Logo className="block w-full text-center" imageClassName="mx-auto" />
					<div className="text-center">
						<h2 className="mt-5 text-center text-xl font-semibold leading-9 tracking-tight text-neutral-900 sm:mt-7 md:text-2xl dark:text-neutral-200">
							Войти в аккаунт
						</h2>
					</div>
				</div>
				<div className="mt-5 sm:mx-auto sm:mt-10 sm:w-full sm:max-w-sm">
					<div className="grid gap-6">
						<form
							onSubmit={(e) => {
								e.preventDefault()

								if (
									!e.currentTarget.username?.value ||
									!e.currentTarget.password?.value
								) {
									toast.error('Требуется ввести имя пользователя и пароль!', {
										position: 'bottom-center',
									})
									return
								}

								login(
									e.currentTarget.username.value,
									e.currentTarget.password.value,
									urlRiderect,
								)
							}}
						>
							<div className="grid gap-4">
								<div className="grid gap-1.5">
									<Label htmlFor="email">Имя пользователя</Label>
									<Input
										id="username"
										name="username"
										placeholder="Email или имя пользователя"
										autoCapitalize="none"
										autoComplete="username"
										autoCorrect="off"
										type="text"
										required
										autoFocus
										data-autofocus
									/>
								</div>
								<div className="grid gap-1.5">
									<Label htmlFor="password">Пароль</Label>
									<Input
										id="password"
										type="password"
										required
									/>
								</div>
								<div className="grid">
									<ButtonPrimary loading={loading}>Войти</ButtonPrimary>
									{!!errorMessage && (
										<Error className="mt-2 text-center" error={errorMessage} />
									)}
								</div>
							</div>
						</form>
					</div>

					<div className="mt-10">
						<p className="text-center text-sm text-neutral-500">
							<Link
								className="font-semibold leading-6 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
								href="/reset-password"
								onClick={closeModal}
							>
								Забыли пароль?
							</Link>
						</p>
					</div>
				</div>
			</div>
		)
	}

	const renderModalLogin = () => {
		return (
			<NcModal
				isOpenProp={isOpen}
				onCloseModal={closeLoginModal}
				contentExtraClass="max-w-screen-md"
				renderContent={renderContent}
				renderTrigger={() => null}
				modalTitle=""
			/>
		)
	}

	return renderModalLogin()
}

export default LoginModal
