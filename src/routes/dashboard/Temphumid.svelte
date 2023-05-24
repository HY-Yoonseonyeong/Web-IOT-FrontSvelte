<script>
    import {onMount, onDestroy} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    export let aei;

    let deviceLa = '-'
    let humidCon = '-'

    const url = `${PUBLIC_API_URL}/device/la/DHT22_LCD_0001`

    let timerID // 타이머 아이디
    const delay = 10000 // 타이머 10초 간격

    onMount(async () => {
        const url2 = {
            temp : `${PUBLIC_API_URL}/device/la/${aei}`,
            humid : `${PUBLIC_API_URL}/device/humid/la/${aei}`
        }

        // 함수가 끝나고 타이머 재실행
        async function query() {
            deviceLa = await queryDeviceLa(url2.temp, aei)
            humidCon = await queryDeviceLa(url2.humid, aei)
            timerID = setTimeout(query, delay)
        }

        await query();
    })

    onDestroy(()=>{
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
        return data['m2m:cin']['con']
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
          <div class="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">{deviceLa}&deg;C</div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">온도</span>
        </div>
        <div class="col-auto ps-0">
          <div class="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">{humidCon}%</div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">습도</span>
        </div>
      </div>
    </div>
  </div>
</div>

