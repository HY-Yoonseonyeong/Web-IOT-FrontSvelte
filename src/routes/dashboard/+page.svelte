<script>
    import '../../scss/theme.scss'
    import TempHumid from "./Temphumid.svelte";
    import TemphumidEx  from "./TemphumidEx.svelte";
    import {onMount} from "svelte";
    import Weather from "./Weather.svelte";
    import ChartTemp from "./ChartTemp.svelte";
    import ChartHumid from "./ChartHumid.svelte";
    import ChartTempHumid from "./ChartTempHumid.svelte";
    import DeviceStatusGrid from "./DeviceStatusGrid.svelte";
    import {PUBLIC_API_URL} from '$env/static/public'
    import {goto} from "$app/navigation";
    import NavSide from "../../component/nav/NavSide.svelte"
    import NavTop from "../../component/nav/NavTop.svelte";
    import DeviceConChange from "./DeviceConChange.svelte";


    /*import '../../../static/vendors/list.js'*/

    function onclick() {
        console.log("click me");

        // console.log(localStorage.getItem('token'))

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

        // navbar-vertical
        //

        /*var navbarPosition = localStorage.getItem('navbarPosition');
        var navbarVertical = document.querySelector('.navbar-vertical');
        var navbarTopVertical = document.querySelector('.content .navbar-top');
        var navbarTop = document.querySelector('[data-layout] .navbar-top:not([data-double-top-nav]');
        var navbarDoubleTop = document.querySelector('[data-double-top-nav]');
        var navbarTopCombo = document.querySelector('.content [data-navbar-top="combo"]');*/

        /*        navbarVertical.removeAttribute('style');
                navbarTopCombo.removeAttribute('style');
                navbarTop.remove(navbarTop);
                navbarTopVertical.remove(navbarTopVertical);
                navbarDoubleTop.remove(navbarDoubleTop);*/

        /*navbarVertical.removeAttribute('style');
        navbarTopVertical.removeAttribute('style');
        navbarTop.remove(navbarTop);
        navbarDoubleTop.remove(navbarDoubleTop);
        navbarTopCombo.remove(navbarTopCombo);*/
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
  <!--<script src="constval.js"></script>-->
  <script src="vendors/popper/popper.min.js"></script>
  <!--<script src="vendors/bootstrap/bootstrap.min.js"></script>-->
  <script src="vendors/anchorjs/anchor.min.js"></script>
  <script src="vendors/is/is.min.js"></script>
  <script src="vendors/echarts/echarts.min.js"></script>
  <script src="vendors/fontawesome/all.min.js"></script>
  <script src="vendors/lodash/lodash.min.js"></script>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
  <!--<script src="vendors/list.js/list.min.js"></script>-->
  <script src="assets/js/theme.js"></script>
</svelte:head>

<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <script>
        var isFluid = JSON.parse(localStorage.getItem('isFluid'));
        if (isFluid) {
            var container = document.querySelector('[data-layout]');
            container.classList.remove('container');
            container.classList.add('container-fluid');
        }
    </script>
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
        <div class="col-xxl-3 col-md-6 col-lg-5">
          <div class="card shopping-cart-bar-min-height h-100">
            <div class="card-header d-flex flex-between-center">
              <h6 class="mb-0">-</h6>
              <div class="dropdown font-sans-serif btn-reveal-trigger">
                <button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
                        type="button" id="dropdown-shopping-cart-bar" data-bs-toggle="dropdown"
                        data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span
                        class="fas fa-ellipsis-h fs--2"></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <footer class="footer">
        <div class="row g-0 justify-content-between fs--1 mt-4 mb-3">
          <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 text-600">HYNUX-IOT
              <span class="d-none d-sm-inline-block">| </span><br class="d-sm-none"/> 2023 &copy;
              <a href="https://hynux.co.kr">HYNUX</a>
            </p>
          </div>
          <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 text-600">v3.16.0</p>
          </div>
        </div>
      </footer>
    </div>
    <div class="modal fade" id="authentication-modal" tabindex="-1" role="dialog"
         aria-labelledby="authentication-modal-label" aria-hidden="true">
      <div class="modal-dialog mt-6" role="document">
        <div class="modal-content border-0">
          <div class="modal-header px-5 position-relative modal-shape-header bg-shape">
            <div class="position-relative z-1" data-bs-theme="light">
              <h4 class="mb-0 text-white" id="authentication-modal-label">Register</h4>
              <p class="fs--1 mb-0 text-white">Please create your free Falcon account</p>
            </div>
            <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2"
                    data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body py-4 px-5">
            <form>
              <div class="mb-3"><label class="form-label" for="modal-auth-name">Name</label><input
                      class="form-control" type="text" autocomplete="on" id="modal-auth-name"/></div>
              <div class="mb-3"><label class="form-label" for="modal-auth-email">Email
                address</label><input class="form-control" type="email" autocomplete="on"
                                      id="modal-auth-email"/></div>
              <div class="row gx-2">
                <div class="mb-3 col-sm-6"><label class="form-label"
                                                  for="modal-auth-password">Password</label><input
                        class="form-control" type="password" autocomplete="on"
                        id="modal-auth-password"/></div>
                <div class="mb-3 col-sm-6"><label class="form-label" for="modal-auth-confirm-password">Confirm
                  Password</label><input class="form-control" type="password" autocomplete="on"
                                         id="modal-auth-confirm-password"/></div>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="modal-auth-register-checkbox"/>
                <label class="form-label" for="modal-auth-register-checkbox">I accept the <a href="/">terms </a>and <a href="/">privacy policy</a></label>
              </div>
              <div class="mb-3">
                <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Register</button>
              </div>
            </form>
            <div class="position-relative mt-5">
              <hr/>
              <div class="divider-content-center">or register with</div>
            </div>
            <div class="row g-2 mt-2">
              <div class="col-sm-6">
                <a class="btn btn-outline-google-plus btn-sm d-block w-100" href="/">
                  <span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google
                </a>
              </div>
              <div class="col-sm-6">
                <a class="btn btn-outline-facebook btn-sm d-block w-100" href="/">
                  <span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->


