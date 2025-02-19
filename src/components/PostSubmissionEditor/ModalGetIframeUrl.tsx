import ButtonPrimary from '@/components/Button/ButtonPrimary'
import ButtonSecondary from '@/components/Button/ButtonSecondary'
import Input from '@/components/Input/Input'
import Label from '@/components/Label/Label'
import NcModal from '@/components/NcModal/NcModal'
import { FC, useState } from 'react'
import Button from '../Button/Button'

interface Props {
	show: boolean
	onCloseModal: () => void
	onSubmit: (value: string) => void
}

const ModalGetIframeUrl: FC<Props> = ({ show, onCloseModal, onSubmit }) => {
	const [iframeUrl, setIframeUrl] = useState('')

	

	const handleClickSubmitForm = (e: any) => {
		e.preventDefault()
		onSubmit(iframeUrl)
		onCloseModal()
	}

	const renderContent = () => {
		return (
			<form action="/#" onSubmit={handleClickSubmitForm}>
				<Label>
					{'Введите URL iframe, который вы хотите вставить'}
				</Label>
				<Input
					required
					className="mt-1"
					type="url"
					onChange={(e) => setIframeUrl(e.currentTarget.value)}
					autoFocus
					data-autofocus
				/>

				<div className="mt-6 flex justify-between space-x-3">
					<Button pattern="link" type="button" onClick={onCloseModal}>
						{'Отменить'}
					</Button>
					<ButtonPrimary type="submit">{'Применить'}</ButtonPrimary>
				</div>
			</form>
		)
	}

	return (
		<NcModal
			renderTrigger={() => null}
			isOpenProp={show}
			renderContent={renderContent}
			onCloseModal={onCloseModal}
			contentExtraClass="max-w-screen-sm"
			modalTitle={'URL iframe'}
		/>
	)
}

export default ModalGetIframeUrl
