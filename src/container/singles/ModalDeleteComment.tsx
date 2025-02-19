'use client'

import React, { FC } from 'react'
import NcModal from '@/components/NcModal/NcModal'
import ButtonPrimary from '@/components/Button/ButtonPrimary'
import Button from '@/components/Button/Button'

export interface ModalDeleteCommentProps {
	show: boolean
	onCloseModalDeleteComment: () => void
	commentDatabaseId: number
	onSubmitDeletedComment?: (databaseId: number) => void
}

const ModalDeleteComment: FC<ModalDeleteCommentProps> = ({
	show,
	onCloseModalDeleteComment,
	commentDatabaseId,
	onSubmitDeletedComment,
}) => {
	const handleClickSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault && e.preventDefault()
		console.log('delete comment', { commentDatabaseId })
		onSubmitDeletedComment?.(commentDatabaseId)
	}

	const renderContent = () => {
		return (
			<form action="#" onSubmit={handleClickSubmitForm}>
				<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
					Удалить комментарий {commentDatabaseId || ''}
				</h3>
				<span className="text-sm">
					Вы уверены, что хотите удалить этот комментарий? Вы не сможете отменить это действие.
				</span>
				<div className="mt-6 space-x-3 rtl:space-x-reverse">
					<ButtonPrimary className="!bg-red-500" type="submit">
						Удалить
					</ButtonPrimary>
					<Button
						pattern="link"
						type="button"
						onClick={onCloseModalDeleteComment}
					>
						Отменить
					</Button>
				</div>
			</form>
		)
	}

	const renderTrigger = () => {
		return null
	}

	return (
		<NcModal
			isOpenProp={show}
			onCloseModal={onCloseModalDeleteComment}
			contentExtraClass="max-w-screen-sm"
			renderContent={renderContent}
			renderTrigger={renderTrigger}
			modalTitle=""
		/>
	)
}

export default ModalDeleteComment
