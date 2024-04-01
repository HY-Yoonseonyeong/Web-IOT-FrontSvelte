<script>
  import { onMount } from "svelte";
  import { PUBLIC_API_URL } from "$env/static/public";
  import NavSide from "../../component/nav/NavSide.svelte";
  import NavTop from "../../component/nav/NavTop.svelte";
  import Footer from "../../component/nav/Footer.svelte";

  let mobiusAPI = "";
  let mobiusApiList = "";

  let MobiusAeList = "";

  let isLoading = false;

  onMount(async () => {
    await queryMobiusData();
  });

  const TableAeChange = () => {
    queryMobiusAeList();
  };

  const queryMobiusData = async () => {
    isLoading = true; // 로딩 시작
    try {
      const response = await fetch(`${PUBLIC_API_URL}/mobius/v2/api`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      mobiusApiList = data;
    } catch (error) {
      console.error("error", error);
    } finally {
      isLoading = false; // 로딩 종료
    }
  };
  const queryMobiusAeList = async () => {
    const response = await fetch(
      `${PUBLIC_API_URL}/mobius/v2/ae?api=${mobiusAPI}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    MobiusAeList = data;

    console.log(MobiusAeList);
  };
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
            {#if isLoading}
              <div class="loading-box">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            {:else}
              <select
                class="form-select"
                bind:value={mobiusAPI}
                on:change={TableAeChange}
              >
                <option value="" hidden>API-ID를 선택하세요.</option>
                {#each mobiusApiList as item}
                  <option value={item.api}>{item.api}</option>
                {/each}
              </select>
            {/if}
          </div>
        </div>
        <div class="card-footer text-end" />
      </div>
      <div class="card mb-3">
        <div class="card-header">
          <div class="row align-items-center">
            <div class="col">
              <h5 class="mb-0">AE 조회 결과</h5>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive scrollbar">
            <table class="table">
              <thead>
                <tr class="text-black bg-200">
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
              <tbody>
                {#each MobiusAeList as item}
                  <tr>
                    <td class="text-nowrap">{item.ri}</td>
                    <td class="text-nowrap">{item.apn}</td>
                    <td class="text-nowrap">{item.api}</td>
                    <td class="text-nowrap">{item.aei}</td>
                    <td class="text-nowrap">{item.poa}</td>
                    <td class="text-nowrap">{item.or}</td>
                    <td class="text-nowrap">{item.rr}</td>
                    <td class="text-nowrap">{item.nl}</td>
                    <td class="text-nowrap">{item.csz}</td>
                    <td class="text-nowrap">{item.srv}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer text-end" />
      </div>
      <Footer />
    </div>
  </div>
</main>

<style>
  table {
    text-align: center;
  }
  table th {
    cursor: default;
  }

  .loading-box{
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
