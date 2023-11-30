<script>
  import { onMount } from "svelte";
  import { PUBLIC_API_URL } from "$env/static/public";
  import NavSide from "../../component/nav/NavSide.svelte";
  import NavTop from "../../component/nav/NavTop.svelte";
  import Footer from "../../component/nav/Footer.svelte";
  import TemphumidEx from "../dashboard/TemphumidEx.svelte";

  let TempHumList = "";

  onMount(async () => {
    await getTempHum();
  });

  const getTempHum = async () => {
    const url = `${PUBLIC_API_URL}/mobius/v2/group`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (200 == response.status) {
      const data = await response.json();
      TempHumList = data;

      console.log(TempHumList);
    } else {
        alert ("조회 실패")
    }
  };
</script>

<svelte:head>
  <title>온습도 | HYNUX-IOT</title>
  <meta name="" content="" />
</svelte:head>

<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide />

    <div class="content">
      <NavTop />
      {#if TempHumList}
        <div class="row g-3 mb-3">
          {#each TempHumList.slice(0, 20) as item}
            <TemphumidEx aei={item.rn} />
          {/each}
        </div>
      {/if}
      <Footer />
    </div>
  </div>
</main>
