<script>
  import NavSide from "../NavSide.svelte";
  import NavTop from "../../../component/nav/NavTop.svelte";
  import Footer from "../../../component/nav/Footer.svelte";
  import Privacy from "./privacy.svelte";
</script>

<svelte:head>
  <title>개인정보처리방침 | HYNUX-IOT</title>
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
