import type { Handle } from '@sveltejs/kit'

console.log("HOOK handle!!!!!!!")

export const handle: Handle = async ({ event, resolve }) => {
    console.log("HOOK handle")
    console.log("HOOK handle")
    console.log("HOOK handle")
    console.log("HOOK handle")
    console.log("HOOK handle")

    return resolve(event)
}