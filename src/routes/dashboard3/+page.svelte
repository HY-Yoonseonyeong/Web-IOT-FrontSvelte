<script>
    import {onMount, onDestroy} from "svelte";
    import NavSide from "../../component/nav/NavSide.svelte"
    import NavTop from "../../component/nav/NavTop.svelte";
    import ChartHitDaily from "./ChartHitDaily.svelte";
    import ChartPieHit from "./ChartPieHit.svelte";
    import {PUBLIC_API_URL} from '$env/static/public'
    import MobiusTrafficGrid from "../test3/MobiusTrafficGrid.svelte";
    import {trafficDataStore} from "../test3/trafficDataStore";
    import {checkTokenThenLogin} from "$lib/hyToken.js";

    let userCount = 0  // 가입자수
    let rqCount = 0  // 요청 건수
    let aeCount = 0  //  mobius ae count
    let usedDiskSize = 0 // mobius used disk size


    const trafficDataSub = trafficDataStore.subscribe(value => {
        rqCount = value;
    })

    onMount(async () => {
        checkTokenThenLogin()

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


<svelte:head>
  <title>Mobius | HYNUX-IOT</title>
  <meta name="HYNUX-IOT" content="HYNUX-IOT"/>
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
              </div>
            </div>
            <div class="card-body d-flex align-items-center">
              <div class="w-100">
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
            </div>
          </div>
        </div>
      </div>
      <MobiusTrafficGrid/>

      <footer class="footer">
      </footer>
    </div>
  </div>
</main>
<!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->