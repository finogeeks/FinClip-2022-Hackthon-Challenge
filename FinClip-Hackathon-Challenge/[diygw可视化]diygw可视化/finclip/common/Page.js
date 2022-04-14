import ValidateClazz from './Validate'
export const Validate = (rules, messages) => new ValidateClazz(rules, messages)

export function setData(dataset) {
	for (let key in dataset) {
		this[key] = dataset[key]
	}
}
