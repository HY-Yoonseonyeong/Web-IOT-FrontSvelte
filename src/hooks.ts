import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
    console.log("Hello Hook!!!")

    // event.locals.test = "Hello Test"
    // const {headers : any} = event.request.headers;

    // console.log(event.request)

    return resolve(event)
}