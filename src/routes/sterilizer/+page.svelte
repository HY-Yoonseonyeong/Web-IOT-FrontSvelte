<script>
  import NavSide from "../../component/nav/NavSide.svelte";
  import NavTop from "../../component/nav/NavTop.svelte";
  import Footer from "../../component/nav/Footer.svelte";
  import Sterilizer from "./sterilizerCondition.svelte"
</script>

<svelte:head>
  <title>모비우스 AE | HYNUX-IOT</title>
  <meta name="description" content="About this app" />
</svelte:head>

<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide />
    <div class="content">
      <NavTop />
      <Sterilizer />
      <Footer />
    </div>
  </div>
</main>


