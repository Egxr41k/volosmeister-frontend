export function updateCategoriesQuery(
	currentCategories: string,
	newCategories: string[]
) {
	const categoriesArray = currentCategories
		? String(currentCategories).split('|')
		: []

	newCategories.forEach(category => {
		const existingCategory = categoriesArray.find(arrEl => arrEl === category)
		if (!existingCategory) {
			categoriesArray.push(category)
		} else {
			const existingCategoryIndex = categoriesArray.indexOf(existingCategory)
			categoriesArray.splice(existingCategoryIndex, 1)
		}
	})

	return categoriesArray.join('|')
}
