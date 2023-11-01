<script>
  import NavSide from "../NavSide.svelte";
  import NavTop from "../../../component/nav/NavTop.svelte";
  import Footer from "../../../component/nav/Footer.svelte";
  import Privacy from "./privacy.svelte";
</script>

<svelte:head>
  <title>대시보드 | HYNUX-IOT</title>
  <meta name="" content="" />
</svelte:head>

<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide />

    <div class="content">
      <NavTop />

      <Privacy/>

      <Footer />
    </div>
  </div>
</main>
<!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->
