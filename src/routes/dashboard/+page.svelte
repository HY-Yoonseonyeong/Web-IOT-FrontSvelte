<script>
    import TemphumidEx from "./TemphumidEx.svelte";
    import {onMount} from "svelte";
    import Weather from "./Weather.svelte";
    import ChartTempHumid from "./ChartTempHumid.svelte";
    import {PUBLIC_API_URL} from '$env/static/public'
    import {goto} from "$app/navigation";
    import NavSide from "../../component/nav/NavSide.svelte"
    import NavTop from "../../component/nav/NavTop.svelte";
    import DeviceConChange from "./DeviceConChange.svelte";
    import Footer from "../../component/nav/Footer.svelte";
    import {checkTokenThenLogin} from "$lib/hyToken.js";

    function onclick() {
        const fetchData = (async () => {
            const response = await fetch(`${PUBLIC_API_URL}/users/me`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('hynuxiot-token')
                },
            });

            console.log(response)
            const fetchData = await response.json();
            console.log(fetchData)
        })()

        return false
    }

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
  <script src="assets/js/config.js"></script>
  <script src="vendors/simplebar/simplebar.min.js"></script>
  <script src="vendors/popper/popper.min.js"></script>
  <script src="vendors/anchorjs/anchor.min.js"></script>
  <script src="vendors/is/is.min.js"></script>
  <script src="vendors/echarts/echarts.min.js"></script>
  <script src="vendors/fontawesome/all.min.js"></script>
  <script src="vendors/lodash/lodash.min.js"></script>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
  <script src="assets/js/theme.js"></script>
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
        <!--<TempHumid aei='DHT22_LCD_0001'/>-->
        <TemphumidEx aei='DHT22_LCD_0001'/>
        <TemphumidEx aei='test2F230102_01'/>
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


