<script>
  import NavSide from "../../component/nav/NavSide.svelte";
  import NavTop from "../../component/nav/NavTop.svelte";
  import Footer from "../../component/nav/Footer.svelte";
  import Sterilizer from "./SterilizerCondition.svelte";
  import SterilizerDummy from "./SterilizerCondition_Dummy.svelte";
</script>

<svelte:head>
  <title>모비우스 멸균기 | HYNUX-IOT</title>
  <meta name="description" content="About this app" />
</svelte:head>

<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide />
    <div class="content">
      <NavTop />

      <div class="row g-3">
        <Sterilizer />
        <SterilizerDummy />
      </div>

      <Footer />
    </div>
  </div>
</main>
