<script>
    import NavSide from "../../../component/nav/NavSide.svelte"
    import NavTop from "../../../component/nav/NavTop.svelte";
    import Footer from "../../../component/nav/Footer.svelte";
    import TemphumidEx2 from "./TemphumidEx2.svelte";
    import ChartTempHumid2 from "./ChartTempHumid2.svelte";
    import DeviceConChange2 from "./DeviceConChange2.svelte";
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    let deviceIds = []
    let selected;

    onMount(() => {
        getTempHum()
    })

    const getTempHum = async () => {
        const url = `${PUBLIC_API_URL}/mobius/v2/group`;
        const response = await fetch(url, {
            method: "GET",
        });

        if (200 == response.status) {
            const data = await response.json();
            deviceIds = data

        } else {
            alert("조회 실패")
        }
    };
</script>

<svelte:head>
  <title>온습도 개별조회 | HYNUX-IOT</title>
  <meta name="HYNUX" content="HYNUX"/>
</svelte:head>

<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide/>

    <div class="content">
      <NavTop/>

      <div class="row g-3 mb-2">
        <div style="min-width: 200px">
          <select class="form-select-sm select-month me-2" bind:value={selected}>
            {#each deviceIds as id}
              <option value={id.rn}>
                {id.rn}
              </option>
            {/each}
          </select>
        </div>
      </div>

      <!-- Row (온습도, 날씨)  -->
      <div class="row g-3 mb-3">
        <TemphumidEx2 aei={selected}/>
        <!--<Weather/>&ndash;&gt;-->
      </div>
      <!-- Row (차트)  -->
      <div class="row g-0">
        <ChartTempHumid2 conType="temp" ae="{selected}"/>
        <ChartTempHumid2 conType="humid" ae="{selected}"/>
      </div>
      <!-- Row (장치 로그)  -->
      <div class="row g-3 mb-3">
        <DeviceConChange2/>
        <!--<div class="col-xxl-3 col-md-6 col-lg-5">
          <div class="card shopping-cart-bar-min-height h-100">
            <div class="card-header d-flex flex-between-center">
              <h6 class="mb-0">-</h6>
              <div class="dropdown font-sans-serif btn-reveal-trigger">
                <button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
                        type="button" id="dropdown-shopping-cart-bar" data-bs-toggle="dropdown"
                        data-boundary="viewport" aria-haspopup="true" aria-expanded="false">
                  <span class="fas fa-ellipsis-h fs&#45;&#45;2"></span>
                </button>
              </div>
            </div>
          </div>
        </div>-->
      </div>

      <Footer/>
    </div>
  </div>
</main>
<!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->


