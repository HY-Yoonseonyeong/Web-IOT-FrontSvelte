<script>
  import NavSide from "../../component/nav/NavSide.svelte";
  import NavTop from "../../component/nav/NavTop.svelte";
  import Footer from "../../component/nav/Footer.svelte";
</script>

<svelte:head>
  <title>mobius AE | HYNUX-IOT</title>
  <meta name="description" content="About this app" />
</svelte:head>

<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide />
    <div class="content">
      <NavTop />
      <div class="card mb-3">
        <div class="card-header">
          <div class="row flex-between-end">
            <div class="col-auto align-self-center">
              <h5 class="mb-0" data-anchor="data-anchor">AE 조회</h5>
            </div>
          </div>
        </div>
        <div class="card-body bg-light">
          <div class="tab-content">
            <!-- select -->
          </div>
        </div>
        <div class="card-footer border-top text-end" />
      </div>
      <div class="card mb-3">
        <div class="card-header">
          <div class="row align-items-center">
            <div class="col">
              <h5 class="mb-0">AE 조회 결과</h5>
            </div>
          </div>
        </div>
        <div class="card-body bg-light border-top" />
        <div class="card-footer border-top text-end">
          <!-- table -->
        </div>
      </div>
      <Footer />
    </div>
  </div>
</main>
