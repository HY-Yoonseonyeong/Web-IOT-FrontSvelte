<script>
    function onclick() {
        const fetchData = (async () => {

            const response = await fetch('http://127.0.0.1:8183/users/me', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('hynuxiot-token')
                },
            });

            const fetchData = response.json();
        })()

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

