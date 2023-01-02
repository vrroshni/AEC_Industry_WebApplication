import axios from "axios";

export async function getCharacter(value) {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const { data } = await axios.post('/search/', { value }, config)
    return data
}