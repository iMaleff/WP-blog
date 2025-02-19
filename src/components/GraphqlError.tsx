import { ApolloError } from '@apollo/client'
import { FC } from 'react'
import { RefetchBtn } from './RefetchBtn'


interface GraphqlErrorProps {
	error?: ApolloError
	refetch: () => void
	loading?: boolean
	hasRefetchBtn?: boolean
	className?: string
}

const GraphqlError: FC<GraphqlErrorProps> = ({
	className = 'text-center my-5',
	error,
	hasRefetchBtn = true,
	loading,
	refetch,
}) => {
	if (!error) return null

	

	let title = 'Что-то пошло не так'
	let message = 'Пожалуйста, попробуйте еще раз позже'
	if (error?.networkError) {
		title = 'Ошибка сети'
		message = error?.networkError.message
	} else if (!!error?.graphQLErrors?.length) {
		const graphQLError = error?.graphQLErrors[0]
		title = 'Ошибка GraphQL'
		message = graphQLError?.message || 'Пожалуйста, попробуйте еще раз позже'
	} else {
		message = error?.message || 'Пожалуйста, попробуйте еще раз позже'
	}

	return (
		<div className={className}>
			<svg
				className="mx-auto h-12 w-12 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1}
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
				/>
			</svg>

			<h3 className="mt-2 text-sm font-medium">{title}</h3>
			<p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">{message}</p>
			{!!hasRefetchBtn && (
				<div className="mt-6">
					<RefetchBtn disabled={loading} onClick={() => refetch?.()} />
				</div>
			)}
		</div>
	)
}

export default GraphqlError
