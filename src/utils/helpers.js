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