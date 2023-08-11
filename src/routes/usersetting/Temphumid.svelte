<script>
    import {onMount} from "svelte";
    import {onDestroy} from "svelte";

    export let aei;

    let deviceLa = '-'
    let humidCon = '-'

    const url = `http://49.50.175.207:8183/device/la/DHT22_LCD_0001`

    const delay = 1000 // 타이머 10초 간격
    let timeID

    onDestroy(()=>{
        if (timeID) {
            clearTimeout(timeID)
        }
    })

    onMount(async () => {

        console.log("aei : " + aei)


        const url2 = {
            temp : `http://49.50.175.207:8183/device/la/${aei}`,
            humid : `http://49.50.175.207:8183/device/humid/la/${aei}`
        }

        // deviceLa = await queryDeviceLa(url2.temp, aei)
        // humidCon = await queryDeviceLa(url2.humid, aei)

        // console.log("onMount")

        // setInterval()
        // 함수가 끝나고 타이머 재실행
        async function query() {
            deviceLa = await queryDeviceLa(url2.temp, aei)
            humidCon = await queryDeviceLa(url2.humid, aei)
            console.log("Hello Query")
            timeID = setTimeout(query, delay)
        }

        await query();
    })

    const queryDeviceLa = async (url, aei) => {

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        // console.log(data)
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
          <div class="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">
            {deviceLa}&deg;C
          </div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">온도</span>
        </div>
        <div class="col-auto ps-0">
          <div class="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">
            {humidCon}%
          </div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">습도</span>
        </div>
      </div>
    </div>
  </div>
</div>

