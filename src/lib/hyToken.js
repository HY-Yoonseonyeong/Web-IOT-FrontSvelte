import {goto} from "$app/navigation";

export const getHyToken = () => {
    return localStorage.getItem('hynuxiot-token')
}

export const checkHyToken = () => {
    if (localStorage.getItem('hynuxiot-token')) {
        return true
    }

    return false
}

export const checkTokenThenLogin = () => {
    if (!localStorage.getItem('hynuxiot-token')) {
        goto('/login')
    }
}