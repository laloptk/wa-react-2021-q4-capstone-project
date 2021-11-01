export const fetchData = async (file) => {
    let data = {};
    
    try {
        let response = await fetch(file, {
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        data = await response.json();
        
        return data;
    } catch(err) {
        console.log(err);
    }

    return false;
}

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