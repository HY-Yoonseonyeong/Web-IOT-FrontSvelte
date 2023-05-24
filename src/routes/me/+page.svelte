<script>
    function onclick() {
        console.log("click me");


        // console.log(localStorage.getItem('token'))

        const fetchData = (async () => {

            const response = await fetch('http://127.0.0.1:8183/users/me', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('hynuxiot-token')
                },
            });

            console.log(response)
            const fetchData = response.json();
            console.log(fetchData)
            console.log("1")
        })()

        console.log("2")


        return false
    }
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app"/>
</svelte:head>

<div class="text-column">
    <button on:click={onclick}>click me</button>
</div>

