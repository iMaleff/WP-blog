import ButtonSecondary from '@/components/Button/ButtonSecondary'
import NcModal from '@/components/NcModal/NcModal'
import { FC } from 'react'
import ButtonPrimary from '../Button/ButtonPrimary'


interface Props {
	show: boolean
	onCloseModal: () => void
	onSubmit: () => void
}

const ModalDraftPost: FC<Props> = ({ show, onCloseModal, onSubmit }) => {
	const handleClickSubmitForm = () => {
		onSubmit()
	}



	const renderContent = () => {
		return (
			<div>
				<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
					'Отправить пост в черновик'
				</h3>
				<span className="text-sm">
					{
						'Пост будет изменен на черновик. Вы можете опубликовать его позже.'
					}
				</span>
				<div className="mt-4 space-x-3">
					<ButtonPrimary onClick={handleClickSubmitForm} type="submit">
						{'Отправить пост в черновик'}
					</ButtonPrimary>
					<ButtonSecondary type="button" onClick={onCloseModal}>
						{'Отменить'}
					</ButtonSecondary>
				</div>
			</div>
		)
	}

	return (
		<NcModal
			renderTrigger={() => null}
			isOpenProp={show}
			renderContent={renderContent}
			onCloseModal={onCloseModal}
			contentExtraClass="max-w-screen-sm"
			modalTitle=""
		/>
	)
}

export default ModalDraftPost
