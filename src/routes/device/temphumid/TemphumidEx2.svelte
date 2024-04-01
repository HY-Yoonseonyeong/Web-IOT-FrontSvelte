<script>
    import {onMount, onDestroy} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    export let aei;

    let deviceLa = '-'
    let humidCon = '-'

    let tempChangeStyle = "text-700"
    let humidChangeStyle = "text-700"

    let alertOff = ""
    let cssAlertText = ""
    let alertMessage = ""
    let alias = ""


    let timerID // 타이머 아이디
    const delay = 30 * 1000 // 타이머 30초 간격

    onMount(async () => {
         const url2 = {
            temp: `${PUBLIC_API_URL}/device/con/temp/${aei}`,
            humid: `${PUBLIC_API_URL}/device/con/humid/${aei}`,
            alert: `${PUBLIC_API_URL}/device/alert/${aei}`
        }

        // 함수가 끝나고 타이머 재실행
        async function query() {
            await queryDeviceLa(url2.temp, aei)
            await queryDeviceLa(url2.humid, aei)
            await queryDeviceAlert(url2.alert, aei)
            timerID = setTimeout(query, delay)
        }

        await query();
    })

    onDestroy(() => {
        if (timerID) {
            clearTimeout(timerID)
        }
    })

    async function query() {
        await queryDeviceLa(`${PUBLIC_API_URL}/device/con/temp/${aei}`, aei)
        await queryDeviceLa(`${PUBLIC_API_URL}/device/con/humid/${aei}`, aei)
        await queryDeviceAlert(`${PUBLIC_API_URL}/device/alert/${aei}`, aei)
        timerID = setTimeout(query, delay)
    }

    $: testFunc(aei)

    const testFunc = (aei) => {
        query()
    }


    const queryDeviceLa = async (url, aei) => {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

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

        if (data['alias']) {
            alias = data['alias']
        } else {
            alias = aei
        }
    }

    const queryDeviceAlert = async (url, aei) => {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()

        if (0 < data.length) {
            alertOff = "bg-alert"
            alertMessage = "기기 접속 에러"
            cssAlertText = "color-alert"

        } else {
            alertOff = ""
            alertMessage = ""
            cssAlertText = ""
        }
    }

</script>

<div class="col-md-6 col-xxl-3">
  <div class="card h-md-100 {alertOff}">
    <div class="card-header pb-0">
      <h6 class="mb-0 mt-2 {cssAlertText}">온습도 | {alias} <span>{alertMessage}</span></h6>
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


<style>
    .bg-alert {
        background-color: #ff121287;
    }

    .color-alert {
        color: white;
    }

    .fs-4 {
        font-size: 1.9rem !important;
    }
</style>