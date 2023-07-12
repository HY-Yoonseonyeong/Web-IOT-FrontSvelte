<script>
    import '../../scss/theme.scss'
    import './NavSide.svelte'
    import {onMount, onDestroy} from "svelte";
    import NavSide from "../../component/nav/NavSide.svelte"
    import NavTop from "../../component/nav/NavTop.svelte";
    import ChartHitDaily from "./ChartHitDaily.svelte";
    import ChartPieHit from "./ChartPieHit.svelte";
    import {PUBLIC_API_URL} from '$env/static/public'
    import {testStore} from "../test3/test";
    import MobiusTrafficGrid from "../test3/MobiusTrafficGrid.svelte";
    import {trafficDataStore} from "../test3/trafficDataStore";

    let userCount = 0  // 가입자수
    let rqCount = 0  // 요청 건수
    let aeCount = 0  //  mobius ae count
    let usedDiskSize = 0 // mobius used disk size

    testStore.subscribe(value => {
        console.log(value)
    })

    const trafficDataSub = trafficDataStore.subscribe(value => {
        rqCount = value;
    })

    //MobiusTrafficGrid.trafficLastData.sub
    // trafficLastData.subscribe(value => {
    // })

    onMount(async () => {
        console.log("OnMount")

        var navbarPosition = localStorage.getItem('navbarPosition');
        var navbarVertical = document.querySelector('.navbar-vertical');
        var navbarTopVertical = document.querySelector('.content .navbar-top');
        var navbarTop = document.querySelector('[data-layout] .navbar-top:not([data-double-top-nav]');
        var navbarDoubleTop = document.querySelector('[data-double-top-nav]');
        var navbarTopCombo = document.querySelector('.content [data-navbar-top="combo"]');

        /*
        navbarVertical.removeAttribute('style');
        navbarTop.remove(navbarTop);
        navbarTopVertical.remove(navbarTopVertical);
        navbarTopCombo.removeAttribute('style');
        navbarDoubleTop.remove(navbarDoubleTop);*/
        /*navbarVertical.removeAttribute('style');
        navbarTopVertical.removeAttribute('style');*/
        // navbarTop.remove(navbarTop);
        //navbarDoubleTop.remove(navbarDoubleTop);
        // navbarTopCombo.remove(navbarTopCombo);


        queryUserCount().then((data) => {
            userCount = data['user_count'];
        })

        queryAECount().then((data) => {
            aeCount = data['ae_count'];
        })

        queryUsedDiskSize().then((data) => {
            usedDiskSize = Math.round((data / 1024) / 1024);
        })
    })

    onDestroy(() => {
        trafficDataSub()
    })

    //
    const queryUserCount = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/users/count`, {headers: {"Content-Type": "application/json"}})
        const fetchData = await response.json()
        return fetchData
    }

    const queryRQCount = async () => {
    }

    const queryAECount = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/mobius`, {headers: {"Content-Type": "application/json"}})
        const fetchData = await response.json()
        return fetchData;
    }

    const queryUsedDiskSize = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/mobius/cbs`, {headers: {"Content-Type": "application/json"}})
        const fetchData = await response.json()
        return fetchData['sum(cbs)'];
    }

</script>

<!--<script context="module">
    import _load from 'vendors/bootstrap/bootstrap.min.js';
    export const load = _load;
</script>-->

<svelte:head>
  <title>Dashboard2 | HYNUX-IOT</title>

</svelte:head>

<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <!-- Side Menu Bar-->
    <NavSide/>
    <div class="content">
      <NavTop/>
      <div class="card mb-3">
        <div class="card-body px-xxl-0 pt-4">
          <div class="row g-0">
            <div class="col-xxl-3 col-md-6 px-3 text-center border-end-md border-bottom border-bottom-xxl-0 pb-3 p-xxl-0 ps-md-0">
              <div class="icon-circle">
                User
              </div>
              <h4 class="mb-1 font-sans-serif"><span class="text-700 mx-2">{userCount.toLocaleString()}</span>
                <span class="fw-normal text-600">명</span></h4>
              <p class="fs--1 fw-semi-bold mb-0">가입자 수<span class="text-600 fw-normal"></span></p>
            </div>
            <div class="col-xxl-3 col-md-6 px-3 text-center border-end-xxl border-bottom border-bottom-xxl-0 pb-3 pt-4 pt-md-0 pe-md-0 p-xxl-0">
              <div class="icon-circle icon-circle-info">
                RQ
              </div>
              <h4 class="mb-1 font-sans-serif">
                <!--<span class="text-700 mx-2" data-countup='{"endValue":"324"}'>0</span>-->
                <span class="text-700 mx-2" data-countup=''>{rqCount.toLocaleString()}</span>
                <span class="fw-normal text-600"></span></h4>
              <p class="fs--1 fw-semi-bold mb-0">조회건수<span class="text-600 fw-normal"></span></p>
            </div>
            <div class="col-xxl-3 col-md-6 px-3 text-center border-end-md border-bottom border-bottom-md-0 pb-3 pt-4 p-xxl-0 pb-md-0 ps-md-0">
              <div class="icon-circle icon-circle-success">
                AE
              </div>
              <h4 class="mb-1 font-sans-serif">
                <!--<span class="text-700 mx-2" data-countup='{"endValue":"3712"}'>0</span>-->
                <span class="text-700 mx-2" id="mobius-ae-count">{aeCount.toLocaleString()}</span>
                <span class="fw-normal text-600">개</span>
              </h4>
              <p class="fs--1 fw-semi-bold mb-0">Mobius AE 갯수<span class="text-600 fw-normal"></span></p>
            </div>
            <div class="col-xxl-3 col-md-6 px-3 text-center pt-4 p-xxl-0 pb-0 pe-md-0">
              <div class="icon-circle icon-circle-warning">
                Disk
              </div>
              <h4 class="mb-1 font-sans-serif">
                <!--<span class="text-700 mx-2" data-countup='{"endValue":"1054"}'>0</span>-->
                <span class="text-700 mx-2" data-countup=''>{usedDiskSize.toLocaleString()}</span>
                <span class="fw-normal text-600">M</span></h4>
              <p class="fs--1 fw-semi-bold mb-0">Mobius 사용량<span class="text-600 fw-normal"></span></p>
            </div>
          </div>
        </div>
      </div>


      <div class="row mb-3 g-3">
        <!-- Hit 일간 차트 -->
        <div class="col-md-12 col-xxl-8">
          <div class="card h-100">
            <div class="card-header d-flex flex-between-center border-bottom border-200 py-2">
              <h6 class="mb-0">RQ 일간 조회 데이터</h6>
              <div class="dropdown font-sans-serif btn-reveal-trigger">
                <button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button">
                  <span class="fas fa-ellipsis-h fs--2"></span>
                </button>
                <!--<div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="crm-deal-forecast-bar">
                  <a class="dropdown-item" href="./">View</a>
                  <a class="dropdown-item" href="./">Export</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item text-danger" href="./">Remove</a>
                </div>-->
              </div>
            </div>
            <div class="card-body d-flex align-items-center">
              <div class="w-100">
                <!--<h3 class="text-700 mb-6">$90,439</h3>
                <div class="progress-stacked overflow-visible rounded-5 font-sans-serif fw-medium fs&#45;&#45;1 mt-xxl-auto">
                  <div class="progress" style="width: 50%; height: 20px;" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar overflow-visible bg-progress-gradient border-end border-white border-2 rounded-end rounded-pill text-start">
                      <span class="text-700 mt-n6">$47.8k</span>
                    </div>
                  </div>
                  <div class="progress" style="width: 20%; height: 20px;" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar overflow-visible bg-primary-subtle border-end border-white border-2 text-start">
                      <span class="text-700 mt-n6">$20.2k</span>
                    </div>
                  </div>
                  <div class="progress" style="width: 15%; height: 20px;" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar overflow-visible bg-info-subtle border-end border-white border-2 text-start">
                      <span class="text-700 mt-n6">$18k</span>
                    </div>
                  </div>
                  <div class="progress" style="width: 15%; height: 20px;" role="progressbar" aria-valuenow="15" aria-valuemin="15" aria-valuemax="100">
                    <div class="progress-bar overflow-visible bg-info rounded-start rounded-pill text-start">
                      <span class="text-700 mt-n6">$16k</span>
                    </div>
                  </div>
                </div>
                <div class="row fs&#45;&#45;1 fw-semi-bold text-500 mt-3 g-0 mt-3 mt-xxl-4">
                  <div class="col-auto d-flex align-items-center pe-3"><span class="dot bg-primary"></span><span>Closed won</span><span class="d-none d-md-inline-block d-lg-none d-xxl-inline-block">(100%)</span></div>
                  <div class="col-auto d-flex align-items-center pe-3"><span class="dot bg-primary-subtle"></span><span>Contact sent</span><span class="d-none d-md-inline-block d-lg-none d-xxl-inline-block">(5%)</span></div>
                  <div class="col-auto d-flex align-items-center pe-3"><span class="dot bg-info-subtle"></span><span>Pending</span><span class="d-none d-md-inline-block d-lg-none d-xxl-inline-block">(5%)</span></div>
                  <div class="col-auto d-flex align-items-center"><span class="dot bg-info"></span><span>Qualified</span><span class="d-none d-md-inline-block d-lg-none d-xxl-inline-block">(20%)</span></div>
                </div>-->
                <ChartHitDaily/>
              </div>
            </div>
          </div>
        </div>
        <!-- Hit 당일 파이 차트 -->
        <div class="col-xxl-4">
          <div class="card h-100">
            <div class="card-header d-flex flex-between-center border-bottom py-2">
              <h6 class="mb-0">RQ 당일 데이터</h6>
              <a class="btn btn-link btn-sm px-0 shadow-none"><span class="fas fa-chevron-right ms-1 fs--2"></span></a>
            </div>
            <div class="card-body">
              <div class="w-100">
                <ChartPieHit/>
              </div>
                <!--<div class="row rtl-row-reverse g-1">
                  <div class="col">
                    <div class="d-flex flex-between-center rtl-row-reverse">
                      <h6 class="fs&#45;&#45;2 text-500">Deal Stage</h6>
                      <h6 class="fs&#45;&#45;2 text-500">Count of Deals</h6>
                    </div>
                  </div>
                  <div class="col-auto">
                    <h6 class="fs&#45;&#45;2 text-500">Conversion </h6>
                  </div>
                </div>--><!-- Find the JS file for the following chart at: src/js/charts/echarts/deal-storage-funnel.js-->
                <!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                <!--<div class="echart-deal-storage-funnel" data-echart-responsive="true" data-options=''></div>-->
              </div>
            </div>
          </div>
        </div>

        <MobiusTrafficGrid/>

        <footer class="footer">
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
                <div class="form-check"><input class="form-check-input" type="checkbox"
                                               id="modal-auth-register-checkbox"/><label class="form-label"
                                                                                         for="modal-auth-register-checkbox">I
                  accept the <a href="#">terms </a>and <a href="#">privacy policy</a></label></div>
                <div class="mb-3">
                  <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">
                    Register
                  </button>
                </div>
              </form>
              <div class="position-relative mt-5">
                <hr/>
                <div class="divider-content-center">or register with</div>
              </div>
              <div class="row g-2 mt-2">
                <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100"
                                         href="#"><span class="fab fa-google-plus-g me-2"
                                                        data-fa-transform="grow-8"></span> google</a></div>
                <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100"
                                         href="#"><span class="fab fa-facebook-square me-2"
                                                        data-fa-transform="grow-8"></span> facebook</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</main><!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->