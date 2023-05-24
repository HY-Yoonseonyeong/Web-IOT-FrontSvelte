<script>
    import {onMount, onDestroy} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    let temp = '0' // 온도
    let humid = '0' // 습도
    let prePattern = '' // 강수형태 // 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
    let pre = '0' // 강수량

    let timerID
    const delay = 1000 * 60;


    onMount(async () => {
        try {
            async function query() {
                const response = await fetch(`${PUBLIC_API_URL}/weather`, {headers: {"Content-Type": "application/json"}})
                const fetchData = await response.json()
                console.log(fetchData)
                temp = fetchData.data.t1h
                humid = fetchData.data.reh
                prePattern = getTextFromPTY(fetchData.data.pty)
                pre = fetchData.data.rn1

                timerID = setTimeout(query, delay)
            }

            await query();

        } catch (e) {
            console.log(e)
        }
    })

    onDestroy(()=>{
        if (timerID) {
            clearTimeout(timerID)
        }
    })

    const getTextFromPTY = (PTYCode) => {
        console.log(PTYCode)

        // let precipitation = ''
        switch (PTYCode) {
            case '0':
                return "맑음"
            case '1':
                return "비"
            case '2':
                return "비/눈"
            case '3':
                return "눈"
            case '5':
                return "빗방울"
            case '6':
                return "빗방울/눈날림"
            case '7':
                return "눈날림"
            default:
                return ""
        }
    }
</script>

<div class="col-md-6 col-xxl-3">
  <div class="card h-md-100">
    <div class="card-header d-flex flex-between-center pb-0">
      <h6 class="mb-0">오늘의 날씨</h6>
      <div class="dropdown font-sans-serif btn-reveal-trigger">
        <button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
                type="button" id="dropdown-weather-update" data-bs-toggle="dropdown"
                data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span
                class="fas fa-ellipsis-h fs--2"></span></button>
        <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-weather-update">
          <a class="dropdown-item" href="#">View</a>
          <a class="dropdown-item" href="#">Export</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item text-danger" href="#">Remove</a>
        </div>
      </div>
    </div>
    <div class="card-body pt-2">
      <div class="row g-0 h-100 align-items-center">
        <div class="col">
          <div class="d-flex align-items-center">
            <img class="me-3" src="assets/img/icons/weather-icon.png" alt="" height="60"/>
            <div>
              <h6 class="mb-2 fs--2">서울 문래동</h6>
              <div class="fs--2 fw-semi-bold">
                <div class="text-warning">{prePattern}</div>강수량 : {pre}mm
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto text-center ps-2">
          <div class="fs-4 fw-normal font-sans-serif text-primary mb-1 lh-1">{temp}&deg;C</div>
          <!--<div class="fs&#45;&#45;1 text-800">32&deg; / 25&deg;</div>-->
          <div class="fs--1 text-800">습도 : {humid}%</div>
        </div>
      </div>
    </div>
  </div>
</div>