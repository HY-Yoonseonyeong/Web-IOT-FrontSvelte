<script>
    import '../../scss/theme.scss'
    import {goto} from "$app/navigation";
    import {onMount, onDestroy} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";
    import {MobiusTrafficGrid} from "./MobiusTrafficGrid.svelte";

    const clickTemp = () => {
        goto("../test2")
    }

    let trafficData = new Array()

    onMount(() => {
        queryMobiusHit().then((data) => {
            trafficData = data
            console.log("trafficData")
            console.log(trafficData)
        })
    })

    onDestroy(() => {
    })



    const queryMobiusHit = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/mobius/hit`, {
            headers: {"Content-Type": "application/json",}
        })
        const fetchData = await response.json()
        // console.log(fetchData)
        return fetchData;
    }

</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app"/>
</svelte:head>

<!--<TempHumid aei='test2F230102_01'/>-->
<button on:click={clickTemp}>test</button>

<!--<MobiusTrafficGrid/>-->

<style>
    .chart-lab {
        width: 900px;
        height: 500px;
        background-color: floralwhite;
    }
</style>



