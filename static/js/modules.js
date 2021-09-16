export async function safeGet(get_route) {
    try {
        let response = await fetch(get_route);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
        } catch(e) {
        console.log(e);
    }
}


export async function safePost(url, data) {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch(e) {
        console.log(e);
    }
}