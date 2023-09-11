export const getHyToken = () => {
    return localStorage.getItem('hynuxiot-token')
}

export const checkHyToken = () => {
    if (localStorage.getItem('hynuxiot-token')) {
        return true
    }

    return false
}
