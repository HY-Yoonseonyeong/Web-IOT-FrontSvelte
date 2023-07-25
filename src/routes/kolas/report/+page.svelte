<script>
    import '../../../scss/theme.scss'
    import NavTop from "../../../component/nav/NavTop.svelte";
    import NavSide from "../../../component/nav/NavSide.svelte";
    import Footer from "../../../component/nav/Footer.svelte";
    import Pagination from "./Pagination.svelte";
    import ChartReport from "./ChartReport.svelte";
    import {onMount, onDestroy} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";
    import flatpickr from "flatpickr";
    import {browser} from "$app/environment";

    let historyCount = 0
    let historyRows = new Array()
    let datePeriod
    let periodStart, periodEnd
    let _alias = "DHT22_LCD_0001"
    const queryParams = {};

    const aeList = new Array()
    aeList.push("DHT22_LCD_0001")
    aeList.push("test2F230102_01")
    aeList.push("testB1F221205_01")

    let pagination;
    let testNumber = 2;
    let pageInfo = {
        curIndex: 0,
        totalCount: 0
    }

    let timepicker3
    let ref;
    let calendarPicker

    onMount(async () => {
        calendarPicker = flatpickr(ref, {
            mode: "range",
            locale: {
                firstDayOfWeek: 1,
                weekdays: {
                    shorthand: ['일', '월', '화', '수', '목', '금', '토'],
                    longhand: ['일', '월', '화', '수', '목', '금', '토'],
                },
                months: {
                    shorthand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                    longhand: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                },
            },
            onChange: ([start, end]) => {
                if (start && end) {
                    console.log({start, end});
                    periodStart = start
                    periodEnd = end
                }
            }
        });

        await reqAeDeviceAlias()
        /*await reqKolasHistory();*/

        pagination.someFunc()
        testNumber = 15
    })

    onDestroy(async () => {
        /*calendarPicker.destroy()*/
        /*calendarPicker.destory()*/
        //
        // calendarPicker.destroy()
        //console.log("onDestroy")
    })

    //
    const reqKolasHistory = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/kolas/history`, {headers: {"Content-Type": "application/json"}})
        const data = await response.json()

        historyCount = data.count;
        historyRows = data.rows;

        pageInfo = {
            curIndex: 0,
            totalCount: historyCount
        }

        testNumber = 20
    }

    const reqAeDeviceAlias = async () => {
        const response1 = await fetch(`${PUBLIC_API_URL}/device/alias/${aeList[0]}`, {})
        let alias1 = await response1.json()

        if (alias1.length > 0) {
            aeList[0] = alias1[0].alias
            _alias = alias1[0].alias
        }

        const response2 = await fetch(`${PUBLIC_API_URL}/device/alias/${aeList[1]}`, {})
        let alias2 = await response2.json()

        if (alias2.length > 0) {
            aeList[1] = alias2[0].alias
        }

        const response3 = await fetch(`${PUBLIC_API_URL}/device/alias/${aeList[2]}`, {})
        let alias3 = await response3.json()

        if (alias3.length > 0) {
            aeList[1] = alias3[0].alias
        }
    }

    const clickPeriodQuery = async (e) => {
        const formData = new FormData(e.target);

        for (let field of formData) {
            const [key, value] = field;
            queryParams[key] = value;
        }

        let date = new Date(periodEnd)
        console.log(date)
        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)

        queryParams['periodStart'] = periodStart
        queryParams['periodEnd'] = date

        console.log(queryParams)

        if (queryParams['aei'] === "-1") {
            alert("디바이스를 선택해 주세요")
            return
        }

        const response = await fetch(`${PUBLIC_API_URL}/kolas/report`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(queryParams)
        });

        const data = await response.json()

        historyCount = data.count;
        historyRows = data.rows;

        testNumber = 20

        pageInfo = {
            curIndex: 0,
            totalCount: historyCount
        }
    }


    const clickExport = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/kolas/history`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(queryParams)
        })

        const data = await response.json()
    }

</script>

<svelte:head>
  <title>리포트 생성 | HYNUX-IOT</title>
  <meta name="description" content="About this app"/>
  <link href="../vendors/flatpickr/flatpickr.min.css" rel="stylesheet"/>
</svelte:head>

<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide/>
    <div class="content">
      <NavTop/>
      <div class="card mb-3">
        <div class="card-header">
          <div class="row flex-between-end">
            <div class="col-auto align-self-center">
              <h5 class="mb-0" data-anchor="data-anchor">리포트 생성</h5>
            </div>
          </div>
        </div>
        <div class="card-body bg-light">
          <div class="tab-content">
            <div class="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-26d05095-7b4a-4368-82bf-8f88f90c61f9" id="dom-26d05095-7b4a-4368-82bf-8f88f90c61f9">
              <form on:submit|preventDefault={clickPeriodQuery}>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">디바이스</label>
                  <div class="col-sm-10">
                    <select class="form-select" aria-label="Default select example" name="aei">
                      <option value="-1" selected="">디바이스를 선택해 주세요.</option>
                      <option value="DHT22_LCD_0001">{_alias}</option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">날짜 기간 설정</label>
                  <div class="col-sm-10">
                    <!--{#if browser}-->
                    <input class="form-control" bind:this={ref} placeholder="yyyy-mm-dd to yyyy-mm-dd"/>
                    <!--<input bind:this={ref} />-->
                    <!--{/if}-->
                  </div>
                </div>
                <fieldset>
                  <div class="row mb-3">
                    <label class="col-form-label col-sm-2 pt-0">조회 타입</label>
                    <div class="col-sm-10">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="gridRadios1" type="radio" name="periodType" value="1"/>
                        <label class="form-check-label" for="gridRadios1">1분</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="gridRadios2" type="radio" name="periodType" value="5"/>
                        <label class="form-check-label" for="gridRadios2">5분</label>
                      </div>
                      <div class="form-check form-check-inline disabled">
                        <input class="form-check-input" id="gridRadios3" type="radio" name="periodType" value="10"/>
                        <label class="form-check-label" for="gridRadios3">10분</label>
                      </div>
                      <div class="form-check form-check-inline disabled">
                        <input class="form-check-input" id="gridRadios4" type="radio" name="periodType" value="30" checked/>
                        <label class="form-check-label" for="gridRadios4">30분</label>
                      </div>
                      <div class="form-check form-check-inline disabled">
                        <input class="form-check-input" id="gridRadios5" type="radio" name="periodType" value="60"/>
                        <label class="form-check-label" for="gridRadios5">60분</label>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <button class="btn btn-primary" type="submit">기간 조회</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card" id="ticketsTable" data-list=''>
          <div class="card-header border-bottom border-200 px-0">
            <div class="d-lg-flex justify-content-between">
              <div class="row flex-between-center gy-2 px-x1">
                <div class="col-auto pe-0">
                  <h6 class="mb-0">조회건수 : <span>{historyCount} 건</span></h6>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-between justify-content-lg-end px-x1">
                <div class="d-flex align-items-center" id="table-ticket-replace-element">
                  <button class="btn btn-falcon-default btn-sm" type="button" on:click={clickExport}>
                    <span class="fas fa-external-link-alt" data-fa-transform="shrink-3"></span>
                    <span class="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive scrollbar">
              <table class="table table-sm mb-0 fs--1 table-view-tickets">
                <thead class="text-800 bg-light">
                <tr>
                  <th class=" align-middle ps-2">날짜/시간</th>
                  <th class=" align-middle">디바이스(AE)</th>
                  <th class=" align-middle ps-2" style="min-width: 100px">디바이스명</th>
                  <th class=" align-middle">온도(°)</th>
                  <th class=" align-middle">습도(%)</th>
                  <th class=" align-middle text-end"></th>
                </tr>
                </thead>
                <tbody class="list" id="table-ticket-body">
                {#each historyRows as row, index}
                  <tr>
                    <td class="align-middle client white-space-nowrap pe-3 pe-xxl-4 ps-2">{row.datetime}</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">{row.aei}</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">{row.alias}</td>
                    <td class="align-middle status fs-0 pe-4 white-space-nowrap"><h6 class="mb-0 text-700">{row.temp}°</h6></td>
                    <td class="align-middle priority pe-4 white-space-nowrap"><h6 class="mb-0 text-700">{row.humid}%</h6></td>
                  </tr>
                {/each}
                </tbody>
              </table>
              <div class="text-center d-none" id="tickets-table-fallback">
                <p class="fw-bold fs-1 mt-3">No ticket found</p>
              </div>
            </div>
          </div>
          <Pagination pageNumber={testNumber}, pageInfo={pageInfo} bind:this={pagination}/>
        </div>
      </div>

      <div class="col-md-12">
        <div class="card h-100">
          <div class="card-header d-flex flex-between-center border-bottom border-200 py-2">
            <h6 class="mb-0">기간 조회 데이터</h6>
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
              <ChartReport/>
            </div>
          </div>
        </div>
      </div>
      <!--footer-->
      <Footer/>
    </div>
  </div>
</main>


