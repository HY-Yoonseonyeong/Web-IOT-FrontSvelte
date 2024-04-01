import {PUBLIC_MOBIUS_AZURE_URL} from "$env/static/public";


export const postMobiusGroup = async (rn) => {
    try {
        const response = await fetch(`${PUBLIC_MOBIUS_AZURE_URL}/Mobius/${rn}?rcn=1`, {
            method: "GET",
            headers: {
                'Accept': "application/json",
                'X-M2M-RI': 12345,
                'X-M2M-Origin': "webtest",
            },
        });

        const fetchData = await response.json();
        // _message = JSON.stringify(fetchData)

    } catch (e) {
        console.log(e.message)
    }
}
