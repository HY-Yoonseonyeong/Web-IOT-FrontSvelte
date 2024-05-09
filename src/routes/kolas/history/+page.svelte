<script>
    import NavTop from "../../../component/nav/NavTop.svelte";
    import NavSide from "../../../component/nav/NavSide.svelte";
    import Footer from "../../../component/nav/Footer.svelte";
    import Pagination from "./Pagination.svelte";
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";
    import Flatpickr from 'svelte-flatpickr'
    import 'flatpickr/dist/flatpickr.css';
    import moment from "moment";
    import {checkTokenThenLogin, getHyToken} from "$lib/hyToken.js";

    let historyCount = 0
    let historyRows = new Array()
    let periodStart, periodEnd
    let deviceList = []
    const queryParams = {};
    let selectedAe = "-1"

    let pagination;
    let testNumber = 2;
    let pageInfo = {
        curIndex: 0,
        totalCount: 0
    }

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
                periodStart = start
                periodEnd = end
            }
        }
    };

    onMount(async () => {
        await checkTokenThenLogin()
        await getDashboardDeviceList()
        testNumber = 15
    })

    //

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

            deviceList = jsonData.rows

        } catch (err) {
            alert("조회 에러!")
        }
    }

    const clickPeriodQuery = async (e) => {

        try {
            const formData = new FormData(e.target);

            for (let field of formData) {
                const [key, value] = field;
                queryParams[key] = value;
            }

            if (queryParams['aei'] === "-1") {
                alert("디바이스를 선택해 주세요")
                return
            }

            if (undefined === periodStart || undefined === periodEnd) {
                alert("날짜 기간을 선택해 주세요")
                return
            }

            queryParams['periodStart'] = moment(periodStart).format('YYYY-MM-DDTHH:mm:ss')
            queryParams['periodEnd'] = moment(periodEnd).format('YYYY-MM-DDTHH:mm:ss')

            const response = await fetch(`${PUBLIC_API_URL}/kolas/report2`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(queryParams)
            });

            const data = await response.json()

            if (1 > data.rows.length) {
                alert("조회 결과가 없습니다!")
                return
            }

            historyCount = data.rows.length;
            historyRows = data.rows;

            testNumber = 20

            pageInfo = {
                curIndex: 0,
                totalCount: historyCount
            }
        } catch (e) {
            alert("조회 실패")
        }
    }


    const clickExport = async () => {
        let aa = moment(periodStart).format("YYYYMMDD")
        let bb = moment(periodEnd).format("YYYYMMDD")

        if (aa === bb) {
        } else {
            aa = aa.concat("_", bb)
        }

        if (selectedAe === "-1") {
            alert("디바이스를 선택해 주세요.")
        }

        const find2 = deviceList.find((el, index, arr) => el.aei === selectedAe)

        if (!find2) {
            alert("파일 생성 실패!")
        }

        const filename = find2.alias.concat("_", "기간조회", "_", aa, ".csv")
        // CSV 형식 리스트
        makeCSV(filename)

        //
        return

        if (!queryParams['aei'] || !queryParams['periodStart'] || !queryParams['periodEnd']) {
            alert("기간 조회를 해주세요.")
            return false
        }

        const response = await fetch(`${PUBLIC_API_URL}/kolas/history/export`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(queryParams)
        })

        const jsonData = await response.json()

        if (jsonData.errors) {
            alert(jsonData.msg)
        } else {
            alert(jsonData.msg)
        }
    }

    /**
     * CSV 파일 생성
     * @param filename - 파일명
     */
    const makeCSV = (filename) => {
        let csv = ""
        let row = [];

        // 1열에는 컬럼명
        row.push(
            '날짜시간', '온도', '습도'
        );

        csv += row.join(",") + '\r\n';

        historyRows.forEach((historyRow) => {
            row = [];
            row.push(
                moment(historyRow.datetime).format("YYYY-MM-DD HH:mm:ss"),
                historyRow.temp,
                historyRow.humid
            );

            csv += row.join(",") + '\r\n';
        })

        downloadCSV(csv, filename)
    }

    /**
     * csv 로컬 다운로드
     * @param csv - csv 문서ㅍ
     * @param fileName -  파일명
     */
    const downloadCSV = (csv, fileName) => {
        let csvFile;
        let downloadLink;

        //한글 처리를 해주기 위해 BOM 추가하기
        const BOM = "\uFEFF";
        csv = BOM + csv;

        csvFile = new Blob([csv], {type: "text/csv;charset=utf-8"});
        downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

</script>

<svelte:head>
  <title>Kolas 기간조회 | HYNUX-IOT</title>
  <meta name="HYNUX-IOT" content="HYNUX-IOT"/>
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
              <h5 class="mb-0" data-anchor="data-anchor">디바이스 기간 조회</h5>
            </div>
          </div>
        </div>
        <div class="card-body bg-light">
          <div class="tab-content">
            <div class="tab-pane preview-tab-pane active" role="tabpanel">
              <form on:submit|preventDefault={clickPeriodQuery}>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">디바이스</label>
                  <div class="col-sm-10">
                    <select class="form-select" aria-label="Default select example" name="aei" bind:value={selectedAe}>
                      <option value="-1" selected="">디바이스를 선택해 주세요.</option>
                      {#each deviceList as row, index}
                        <option value={row.aei}>{row.alias} <span>({row.aei})</span></option>
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
              <div class="border-bottom border-200 my-3"></div>
              <div class="d-flex align-items-center justify-content-between justify-content-lg-end px-x1">
                <div class="d-flex align-items-center" id="table-ticket-replace-element">
                  <button class="btn btn-falcon-default btn-sm" type="button" on:click={clickExport}>
                    <span class="fas fa-external-link-alt" data-fa-transform="shrink-3"></span>
                    <span class="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">CSV 생성</span>
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
                  <th class=" align-middle ps-2" style="min-width: 100px">디바이스명</th>
                  <th class=" align-middle">디바이스(RN)</th>
                  <th class=" align-middle">온도(°)</th>
                  <th class=" align-middle">습도(%)</th>
                  <th class=" align-middle text-end"></th>
                </tr>
                </thead>
                <tbody class="list">
                {#each historyRows as row, index}
                  <tr>
                    <td class="align-middle client white-space-nowrap pe-3 pe-xxl-4 ps-2">{moment(row.datetime).format("YYYY-MM-DD HH:mm:ss")}</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">{row.alias}</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">{row.aei}</td>
                    <td class="align-middle status fs-0 pe-4 white-space-nowrap"><h6 class="mb-0 text-700">{row.temp}°</h6></td>
                    <td class="align-middle priority pe-4 white-space-nowrap"><h6 class="mb-0 text-700">{row.humid}%</h6></td>
                  </tr>
                {/each}
                </tbody>
              </table>
              <div class="text-center d-none">
                <p class="fw-bold fs-1 mt-3">기간 조회 건수가 0건입니다.</p>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <button class="btn btn-sm btn-falcon-default me-1" type="button" title="Previous" data-list-pagination="prev">
                <span class="fas fa-chevron-left"></span>
              </button>
              <ul class="pagination mb-0"></ul>
              <button class="btn btn-sm btn-falcon-default ms-1" type="button" title="Next" data-list-pagination="next">
                <span class="fas fa-chevron-right"></span>
              </button>
            </div>
          </div>
          <!--<Pagination pageNumber={testNumber}, pageInfo={pageInfo} bind:this={pagination}/>-->
        </div>
      </div>
      <Footer/>
    </div>
  </div>
</main>


