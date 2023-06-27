<script>
    import {onMount, onDestroy} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    export let aei;

    let deviceLa = '-'
    let humidCon = '-'

    //
    //
    // text-700
    let tempChangeStyle = "text-700"
    let humidChangeStyle = "text-700"


    let timerID // 타이머 아이디
    const delay = 10000 // 타이머 10초 간격

    onMount(async () => {
        const url2 = {
            temp: `${PUBLIC_API_URL}/device/temp/${aei}`,
            humid: `${PUBLIC_API_URL}/device/humid/${aei}`
        }

        // 함수가 끝나고 타이머 재실행
        async function query() {
            await queryDeviceLa(url2.temp, aei)
            await queryDeviceLa(url2.humid, aei)
            timerID = setTimeout(query, delay)
        }

        await query();
    })

    onDestroy(() => {
        if (timerID) {
            clearTimeout(timerID)
        }
    })

    const queryDeviceLa = async (url, aei) => {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        // {"_index":1779,"datetime":"2023-06-26T20:16:58.000Z","ae":"DHT22_LCD_0001","cin":"humid","con":"80.80","prev_con":"80.60","con_change":"up"}

        let changeColor = "text-700"
        if (data['con_change'] == 'up') {
            changeColor = "text-danger"
        } else if (data['con_change'] == 'dn') {
            changeColor = "text-primary"
        }

        if (data['cin'] == "temp") {
            deviceLa = data['con']
            tempChangeStyle = changeColor
        } else if (data['cin'] == "humid") {
            humidCon = data['con']
            humidChangeStyle = changeColor
        }
    }
</script>

<div class="col-md-6 col-xxl-3">
  <div class="card h-md-100">
    <div class="card-header pb-0">
      <h6 class="mb-0 mt-2">온습도 | {aei}</h6>
    </div>
    <div class="card-body d-flex flex-column justify-content-end">
      <div class="row justify-content-between">
        <div class="col-auto align-self-end">
          <div class="fs-4 fw-normal font-sans-serif lh-1 mb-1 {tempChangeStyle}">{deviceLa}&deg;C</div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">온도</span>
        </div>
        <div class="col-auto ps-0">
          <div class="fs-4 fw-normal font-sans-serif lh-1 mb-1 {humidChangeStyle}">{humidCon}%</div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">습도</span>
        </div>
      </div>
    </div>
  </div>
</div>

