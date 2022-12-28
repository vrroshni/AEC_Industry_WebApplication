import axios from "axios";

export async function getCharacter(value) {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    console.log(value,'hhhhhhhhhhhhhhhh')
    const { data } = await axios.post('/search/', { value }, config)
    console.log(data,'sdtata')
    return data
}