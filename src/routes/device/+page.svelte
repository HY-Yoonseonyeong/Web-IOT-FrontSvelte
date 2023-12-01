<script>
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    onMount(() => {
        goto('./device/temphumid')
    })
</script>

<svelte:head>
  <title>Kolas 기간조회 | HYNUX-IOT</title>
  <meta name="HYNUX" content="HYNUX"/>
</svelte:head>





