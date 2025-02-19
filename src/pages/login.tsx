import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Error from '@/components/Error'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'
import LoginLayout from '@/container/login/LoginLayout'
import { IS_CHISNGHIAX_DEMO_SITE } from '@/contains/site-settings'
import { RootState } from '@/stores/store'
import { useLogin } from '@faustwp/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function Login() {
	const { isReady, isAuthenticated } = useSelector(
		(state: RootState) => state.viewer.authorizedUser,
	)
	const { login, loading, error, data } = useLogin()
	const router = useRouter()


	if (isReady && isAuthenticated) {
		router.replace('/')
	}

	const errorMessage = error?.message || data?.generateAuthorizationCode.error

	return (
		<LoginLayout
			isLoginPage
			rightBtn={null}
		>
			<>
				<div className="grid gap-6">
					<form
						onSubmit={(e) => {
							e.preventDefault()

							if (
								!e.currentTarget.username?.value ||
								!e.currentTarget.password?.value
							) {
								toast.error('Имя пользователя и пароль обязательны!', {
									position: 'bottom-center',
								})
								return
							}

							login(
								e.currentTarget.username.value,
								e.currentTarget.password.value,
								'/',
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
								<ButtonPrimary loading={loading}>Вход</ButtonPrimary>
								{!!errorMessage && (
									<Error className="mt-2 text-center" error={errorMessage} />
								)}
							</div>
						</div>
					</form>
				</div>

				<p className="text-center text-sm leading-6 text-neutral-500 dark:text-neutral-400">
					<Link
						href="/reset-password"
						className="text-primary-600 underline-offset-2 hover:text-primary-500 hover:underline dark:text-primary-400"
					>
						Забыли пароль?
					</Link>
				</p>
			</>
		</LoginLayout>
	)
}
