import {
	OrderEnum,
	PostObjectsConnectionOrderbyEnum,
} from '@/__generated__/graphql'


const avatarColors = [
	'#ffdd00',
	'#fbb034',
	'#ff4c4c',
	'#c1d82f',
	'#f48924',
	'#7ac143',
	'#30c39e',
	'#06BCAE',
	'#0695BC',
	'#037ef3',
	'#146eb4',
	'#8e43e7',
	'#ea1d5d',
	'#fc636b',
	'#ff6319',
	'#e01f3d',
	'#a0ac48',
	'#00d1b2',
	'#472f92',
	'#388ed1',
	'#a6192e',
	'#4a8594',
	'#7B9FAB',
	'#1393BD',
	'#5E13BD',
	'#E208A7',
]

export const FILTERS_OPTIONS: {
	name: string
	value: `${PostObjectsConnectionOrderbyEnum}/${OrderEnum}`
}[] = [
	{ name: 'От новых к старым', value: 'DATE/DESC' },
	{ name: 'От старых к новым', value: 'DATE/ASC' },
	{ name: 'От А до Я', value: 'TITLE/ASC' },
	{ name: 'От Я до А', value: 'TITLE/DESC' },
	{ name: 'Просмотры', value: 'VIEWS_COUNT/DESC' },
	{ name: 'Лайки', value: 'LIKES_COUNT/DESC' },
	{ name: 'Комментарии ↓', value: 'COMMENT_COUNT/DESC' },
	{ name: 'Комментарии ↑', value: 'COMMENT_COUNT/ASC' },
]

export const GET_POSTS_FIRST_COMMON_FOR_DASHBOARD = 30
export const GET_POSTS_FIRST_COMMON = 16
export const GET_USERS_FIRST_COMMON = 10
export const GET_CATEGORIES_FIRST_COMMON = 15

//
export const REVALIDATE_TIME = 900

export { avatarColors }
