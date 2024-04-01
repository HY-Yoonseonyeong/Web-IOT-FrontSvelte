<script>
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";

    /**
     * 토큰 테스트
     */

    onMount(async () => {
        const response = await fetch(`${PUBLIC_API_URL}/token`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('hynuxiot-token')
            },
        });

        const fetchData = await response.json();
    })

</script>

<svelte:head>
  <title>토큰 테스트</title>
  <meta name="토큰" content="토큰 테스트"/>
</svelte:head>

<div>

</div>
