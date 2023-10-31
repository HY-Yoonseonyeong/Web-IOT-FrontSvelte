<script>
    import NavTop from "../../../component/nav/NavTop.svelte";
    import NavSide from "../../../component/nav/NavSide.svelte";
    import Footer from "../../../component/nav/Footer.svelte";

    import ChartReport from "./ChartReport.svelte";
    import PdfExport from "./PdfExport.svelte";

    import {onMount, onDestroy} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";
    import Flatpickr from 'svelte-flatpickr'
    import {browser} from "$app/environment";
    import {checkTokenThenLogin} from "$lib/hyToken.js";
    import moment from "moment/moment.js";
    import ModalReport from "./ModalReport.svelte";

    let historyCount = 0
    let historyRows = new Array()
    let periodStart, periodEnd
    let deviceList = []
    const queryParams = {};

    let queryInfo = {}


    const options = {
        mode: "range",
        enableTime: false,
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
    };

    onMount(async () => {
        await checkTokenThenLogin()
        await getDashboardDeviceList()
    })

    onDestroy(async () => {
    })

    //
    const reqKolasHistory = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/kolas/history`, {headers: {"Content-Type": "application/json"}})
        const data = await response.json()

        historyCount = data.count;
        historyRows = data.rows;


    }

    const getDashboardDeviceList = async () => {
        try {
            const response = await fetch(`${PUBLIC_API_URL}/device`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                    /*"Authorization": getHyToken()*/
                },
            });

            if (!response.ok) //
                throw new Error(response.statusText);

            const jsonData = await response.json();
            console.log(jsonData)

            deviceList = jsonData.rows

        } catch (err) {
            alert("조회 에러!")
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

        const get_yyyymmddhhMMss = (datetime) => {

            return datetime.toISOString().replace("T", " ").substring(0, 19);
        };

        let start = new Date();
        let end = new Date();

        start.setTime(periodStart.getTime() + (0 * 60 * 60 * 1000))
        end.setTime(date.getTime() + (0 * 60 * 60 * 1000))


        queryParams['periodStart'] = start
        queryParams['periodEnd'] = end

        queryParams['periodStart'] = moment(periodStart).format('YYYY-MM-DDTHH:mm:ss')
        queryParams['periodEnd'] = moment(periodEnd).format('YYYY-MM-DDTHH:mm:ss')

        console.log(queryParams)

        if (queryParams['aei'] === "-1") {
            alert("디바이스를 선택해 주세요")
            return
        }

        queryInfo = queryParams;

        // 별칭 추가
        const find = deviceList.find((el, index, arr) => el.aei === queryParams['aei'])
        queryInfo['alias'] = find.alias
        console.log(queryInfo)

        return;

        const response = await fetch(`${PUBLIC_API_URL}/kolas/report`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(queryParams)
        });

        const data = await response.json()

        historyCount = data.count;
        historyRows = data.rows;
    }

    let clickCreatePdf
    let pdf22

    const clickExport = async () => {
        pdf22.createPDF()
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
                      {#each deviceList as row, index}
                        <option value={row.aei}>{row.alias}<span>({row.aei})</span></option>
                      {/each}
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">날짜 기간 설정</label>
                  <div class="col-sm-10">
                    <Flatpickr {options} class="form-control" name="date" placeholder="yyyy-mm-dd to yyyy-mm-dd"/>
                  </div>
                </div>
                <fieldset>
                  <div class="row mb-3">
                    <label class="col-form-label col-sm-2 pt-0">조회 타입</label>
                    <div class="col-sm-10">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="gridRadios1" type="radio" name="periodType" value="1" disabled/>
                        <label class="form-check-label" for="gridRadios1">1분</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" id="gridRadios2" type="radio" name="periodType" value="5" disabled/>
                        <label class="form-check-label" for="gridRadios2">5분</label>
                      </div>
                      <div class="form-check form-check-inline disabled">
                        <input class="form-check-input" id="gridRadios3" type="radio" name="periodType" value="10" disabled/>
                        <label class="form-check-label" for="gridRadios3">10분</label>
                      </div>
                      <div class="form-check form-check-inline disabled">
                        <input class="form-check-input" id="gridRadios4" type="radio" name="periodType" value="30" checked/>
                        <label class="form-check-label" for="gridRadios4">30분</label>
                      </div>
                      <div class="form-check form-check-inline disabled">
                        <input class="form-check-input" id="gridRadios5" type="radio" name="periodType" value="60" disabled/>
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

      <!--<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#error-modal">기간 조회</button>-->

      <div class="col-md-12">
        <div class="card h-100">
          <div class="card-header d-flex flex-between-center border-bottom border-200 py-2">
            <h6 class="mb-0">기간 조회 데이터</h6>
            <div class="d-flex align-items-center justify-content-between justify-content-lg-end px-x1">
              <div class="d-flex align-items-center" id="">
                <button class="btn btn-falcon-default btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#error-modal">
                  <span class="fas fa-external-link-alt" data-fa-transform="shrink-3"></span>
                  <span class="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">리포트 생성</span>
                </button>
              </div>
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
                <div class="col-auto d-flex align-items-center"><span class="dot  bg-info"></span><span>Qualified</span><span class="d-none d-md-inline-block d-lg-none d-xxl-inline-block">(20%)</span></div>
              </div>-->
              <ChartReport queryInfo={queryInfo}/>
            </div>
          </div>
        </div>
      </div>
      <div>
        <!--<PdfExport queryInfo={queryInfo} bind:this={pdf22}/>-->
        <!--<PdfExport  bind:this={pdf22}/>-->
      </div>
      <Footer/>
    </div>
  </div>

  <ModalReport queryInfo={queryInfo}/>
</main>


<style>
    .size-zero {
        width: 0;
        height: 0;
    }
</style>
