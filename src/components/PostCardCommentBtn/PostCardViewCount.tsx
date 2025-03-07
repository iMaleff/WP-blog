import Link from 'next/link'
import { FC } from 'react'
import { EyeIcon, ViewIcon } from '../Icons/Icons'

export interface PostCardViewCountProps {
	className?: string
	sizeClassName?: string
	viewCount?: number
}

const PostCardViewCount: FC<PostCardViewCountProps> = ({
	className = '',
	sizeClassName = 'w-9 h-9',
	viewCount = 1,
}) => {
	const renderContent = () => {
		return (
			<>
				<div
					className={`flex flex-shrink-0 items-center justify-center rounded-full bg-neutral-50 transition-colors duration-75 group-hover/PostCardViewCount:bg-indigo-50 dark:bg-neutral-800 dark:group-hover/PostCardViewCount:bg-indigo-100/10 ${sizeClassName}`}
				>
					<ViewIcon className="h-5 w-5" />
				</div>

				<span className="ms-2 min-w-[1.125rem] flex-shrink-0 text-start text-neutral-900 transition-colors duration-75 dark:text-neutral-200">
					{viewCount}
				</span>
			</>
		)
	}

	const classess = `nc-PostCardViewCount group/PostCardViewCount relative flex items-center text-neutral-600 transition-colors dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 ${className} text-xs`

	return (
		<div className={classess} title="Просмотры">
			{renderContent()}
		</div>
	)
}

export default PostCardViewCount
