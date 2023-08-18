import {resolve} from "chart.js/helpers";
import {goto} from "$app/navigation";

/** @type {import('./$types').PageLoad} */
export function load({}) {
    console.log("load")

    // const tokentest =  localStorage.getItem('hynuxiot-token')

    const wait=(ms:any)=>new Promise(resolve => setTimeout(resolve, ms));

    function failureCallback(){
        console.log("This is failure callback");
    }

    wait(4*1000).then(() => {
        console.log("waited for 4 seconds");
        throw new Error("error occurred");
    }).catch(() => {
        failureCallback();
    });

    wait(2*1000).then(() => console.log("waited for 2 seconds"));

    /*    (async () => {
            console.time("Slept for")
            await sleep(3000)
            console.timeEnd("Slept for")
        })()*/


    function test() {
        return new Promise((resolve) => {
            setTimeout(resolve, 3000);
        })
    }

    (async () => {
        await test()
    })()
    // return test()

    let fufu = new Promise(function (resolve, reject) {
        setTimeout(
            function () {
                resolve("whatever");
            }, 3000)
    });

    fufu.then(()=>{console.log("hellow")});
/*
    const fetchData = (async () => {

        const response = await fetch('http://127.0.0.1:8183/users/me', {
            method: "GET"
            /!*headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('hynuxiot-token')
            },*!/
        });

        console.log(response)
        const fetchData = response.json();
        console.log(fetchData)
        console.log("1")
    })()*/
}