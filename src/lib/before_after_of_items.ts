import { weighings } from './weighings.json'

const itemTypes = ["shirt", "shorts", "plateau"] as const
type itemType = (typeof itemTypes)[number]

export function getItems(): {type: itemType, i: number}[] {
	const results : {type: itemType, i: number}[] = []
	const lastWeighing = weighings[weighings.length - 1]

	itemTypes.forEach(type => {
		for (let i = 0; i < lastWeighing[type]; i++) {
			results.push({type, i})
		}
	})

	return results
}

export function getIndicesForItem(item: {type: itemType, i: number}): {first: number, last: number} {
	const values = weighings.map(w => w[item.type]);
	return {
		first: values.indexOf(item.i),
		last: values.lastIndexOf(item.i),
	}
}
