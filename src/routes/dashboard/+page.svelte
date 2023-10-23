<script>
    import NavSide from "../../component/nav/NavSide.svelte"
    import NavTop from "../../component/nav/NavTop.svelte";
    import Footer from "../../component/nav/Footer.svelte";
    import TemphumidEx from "./TemphumidEx.svelte";
    import {onMount} from "svelte";
    import Weather from "./Weather.svelte";
    import ChartTempHumid from "./ChartTempHumid.svelte";
    import {goto} from "$app/navigation";
    import DeviceConChange from "./DeviceConChange.svelte";

    import {checkTokenThenLogin} from "$lib/hyToken.js";

    onMount(async () => {
        console.log("OnMount")
        await checkTokenThenLogin()
    })

    const clickLogout = () => {
        console.log("clickLogout")
        localStorage.removeItem('hynuxiot-token')
        goto('./')
    }
</script>


<svelte:head>
  <title>대시보드 | HYNUX-IOT</title>
  <meta name="" content=""/>
</svelte:head>

<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide/>

    <div class="content">
      <NavTop/>

      <!-- Row (온습도, 날씨)  -->
      <div class="row g-3 mb-3">
        <TemphumidEx aei='dn23100001'/>
        <TemphumidEx aei='dn23100002'/>
        <TemphumidEx aei='testB1F221205_01'/>
        <Weather/>
      </div>
      <!-- Row (차트)  -->
      <div class="row g-0">
        <ChartTempHumid conType="temp"/>
        <ChartTempHumid conType="humid"/>
      </div>
      <!-- Row (장치 로그)  -->
      <div class="row g-3 mb-3">
        <DeviceConChange/>
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


