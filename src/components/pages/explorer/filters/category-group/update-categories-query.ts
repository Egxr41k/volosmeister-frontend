export function updateCategoriesQuery(
	currentCategories: string,
	newCategories: string[]
) {
	const categoriesArray = currentCategories
		? String(currentCategories).split('|')
		: []

	newCategories.forEach(category => {
		const categoryIndex = categoriesArray.indexOf(category)
		if (categoryIndex === -1) {
			categoriesArray.push(category)
		} else {
			categoriesArray.splice(categoryIndex, 1)
		}
	})

	return categoriesArray.join('|')
}
