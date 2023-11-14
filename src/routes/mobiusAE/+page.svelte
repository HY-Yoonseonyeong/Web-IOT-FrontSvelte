<script>
  import NavSide from "../../component/nav/NavSide.svelte";
  import NavTop from "../../component/nav/NavTop.svelte";
  import Footer from "../../component/nav/Footer.svelte";
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
            <select class="form-select" aria-label="Default select example">
              <option selected="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
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
        <div class="card-body bg-light border-top">
          <div class="table-responsive scrollbar">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" title="resourceID">ri</th>
                  <th scope="col" title="appName">apn</th>
                  <th scope="col" title="App-ID">api</th>
                  <th scope="col" title="AE-ID">aei</th>
                  <th scope="col" title="pointOfAccess">poa</th>
                  <th scope="col" title="ontologyRef">or</th>
                  <th scope="col" title="requestReachability">rr</th>
                  <th scope="col" title="nodeLink">nl</th>
                  <th scope="col" title="contentSerialization">csz</th>
                  <th scope="col" title="supportedReleaseVersion">srv</th>
                </tr>
              </thead>
              <tbody />
            </table>
          </div>
        </div>
        <div class="card-footer border-top text-end" />
      </div>
      <Footer />
    </div>
  </div>
</main>
