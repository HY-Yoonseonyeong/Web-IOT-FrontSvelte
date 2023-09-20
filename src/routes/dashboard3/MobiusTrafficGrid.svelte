<script>
    import '../../scss/theme.scss'
    import {onMount, onDestroy} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";
    import {trafficDataStore} from "./trafficDataStore";
    import {writable} from "svelte/store";

    let trafficData = new Array()

    onMount(() => {
        // 모비우스 트래픽 데이터 조회
        queryMobiusHit().then((data) => {
            // 화면 노출은 순서 변경 후 갯수 30개로 제한
            trafficData = data.reverse().slice(0, 30)

            console.log(trafficData[0])
            if (trafficData.length > 1) {
                let trafficSum = trafficData[0].http + trafficData[0].coap + trafficData[0].mqtt + trafficData[0].ws
                console.log(trafficSum)
                trafficDataStore.set(trafficSum)
            }
        })
    })

    onDestroy(() => {
    })

    const queryMobiusHit = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/mobius/hit`, {
            headers: {"Content-Type": "application/json",}
        })
        const fetchData = await response.json()
        return fetchData;
    }

    export const trafficLastData = writable(0)

    // 날짜 포맷.
    console.log("Date Format")
    let testData = '20230523'

    // let testDate = new Date(testData)
    // console.log(testDate)

    function to_date(date_str) {
        var yyyyMMdd = String(date_str);
        var sYear = yyyyMMdd.substring(0, 4);
        var sMonth = yyyyMMdd.substring(4, 6);
        var sDate = yyyyMMdd.substring(6, 8);

        return `${sYear}.${sMonth}.${sDate}`;
    }

</script>

<div class="card overflow-hidden mb-3">
  <div class="card-body p-0">
    <div class="tab-content">
      <div class="tab-pane active" id="popularPaid" role="tabpanel" aria-labelledby="popularPaid-tab">
        <div class="z-1" id="popularPaidCourses" data-list=''>
          <div class="px-0 py-0">
            <div class="table-responsive scrollbar">
              <table class="table fs--1 mb-0 overflow-hidden">
                <thead class="bg-light text-900">
                <tr class="font-sans-serif">
                  <th class="fw-medium sort pe-1 align-middle">날짜</th>
                  <th class="fw-medium sort pe-1 align-middle">HTTP</th>
                  <th class="fw-medium sort pe-1 align-middle text-end">MQTT</th>
                  <th class="fw-medium sort pe-1 align-middle text-end">CoAP</th>
                  <th class="fw-medium sort pe-1 align-middle text-end text-end">WS</th>
                </tr>
                </thead>
                <tbody class="list">
                {#each trafficData as item, index}
                  <tr class="btn-reveal-trigger fw-semi-bold">
                    <td class="align-middle title">{to_date(item.ct)}</td>
                    <td class="align-middle text-nowrap name">{item.http.toLocaleString()}</td>
                    <td class="align-middle white-space-nowrap text-end published">{item.mqtt.toLocaleString()}</td>
                    <td class="align-middle text-end enrolled">{item.coap.toLocaleString()}</td>
                    <td class="align-middle text-end price">{item.ws.toLocaleString()}</td>
                  </tr>
                {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-footer bg-light py-2">
    <!--<div class="row flex-between-center g-0">
      <div class="col-auto">
        <select class="form-select form-select-sm">
          <option value="week" selected="selected">Last 7 days</option>
          <option value="month">Last month</option>
        </select>
      </div>
      <div class="col-auto"><a class="btn btn-link btn-sm px-0 fw-medium" href="../app/e-learning/course/course-list.html">All Courses<span class="fas fa-chevron-right ms-1 fs&#45;&#45;2"></span></a></div>
    </div>-->
  </div>
</div>

