export const getCategoryById = (categoryId, categories) => {
    const categoryObj = categories.find((category)  => {
        return categoryId === category.id;
    });

    return categoryObj;
}

export const getCategoryIdBySlugs = (slug, categories) => {
    const categoryObj = categories.find((category)  => {
        return category.indexOf(slug);
    });

    return categoryObj;
}