<script>
    import {onMount, onDestroy} from "svelte";
    import Chart from "chart.js/auto"
    import {PUBLIC_API_URL} from '$env/static/public'
    import moment from "moment";

    export let conType //

    let timerID
    let timerDelay = 60 * 1000 // 1분
    let conTypeText = (conType === "temp") ? "온도 차트" : "습도 차트"

    //
    const aeList = new Array()
    aeList.push("dn23100001")
    aeList.push("dn23100002")
    aeList.push("dn23100003")

    let _chart;
    const data = {
        datasets: [
            {
                label: 'dn23100001',
            },
            {
                label: 'dn23100002',
            },
            {
                label: 'dn23100003',
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            borderRadius: '30',
            responsive: true,
            cutout: '95%',
            spacing: 2,
            plugins: {
                legend: {
                    position: 'bottom',
                    display: true,
                    labels: {
                        usePointStyle: true,
                        /*padding: 20,*/
                        font: {
                            size: 14
                        }
                    },
                },
                title: {
                    display: true,
                    text: ''
                }
            }
        },
    };

    let tempHumidChart
    onMount(async () => {
        await reqAeDeviceAlias()

        const ctx = _chart.getContext('2d')
        tempHumidChart = new Chart(ctx, config)

        /*if (timerID) {
            console.log("timerID : " + timerID)
            clearTimeout(timerID)
        }*/

        timerChartQuery()
    })

    onDestroy(() => {
        if (timerID) {
            clearTimeout(timerID)
        }
    })

    let selected = '30'; //

    const change = () => {
        const period = selected

        if (timerID) {
            console.log("timerID : " + timerID)
            clearTimeout(timerID)
        }

        timerChartQuery()
    }

    const timerChartQuery = () => {
        console.log("timerChartQuery")
        queryChartData(selected).then(() => {
            timerID = setTimeout(timerChartQuery, timerDelay)
        })
    }

    //
    const queryChartData = async (period) => {

        try {
            let url = `${PUBLIC_API_URL}/device/history/min/dn23100001/${conType}?limit=30&period=${period}`
            const response = await fetch(url, {})
            const queryData = await response.json()

            tempHumidChart.data.labels = queryData.map(row => moment(row.datetime).format('HH:mm'))
            tempHumidChart.data.datasets[0].label = aeList[0]
            tempHumidChart.data.datasets[0].data = queryData.map(row => row.con)

            url = `${PUBLIC_API_URL}/device/history/min/dn23100002/${conType}?limit=30&period=${period}`
            const response2 = await fetch(url, {})

            const queryData2 = await response2.json()
            tempHumidChart.data.datasets[1].label = aeList[1]
            tempHumidChart.data.datasets[1].data = queryData2.map(row => row.con)

            url = `${PUBLIC_API_URL}/device/history/min/testB1F221205_01/${conType}?limit=30&period=${period}`
            const response3 = await fetch(url, {})

            const queryData3 = await response3.json()
            tempHumidChart.data.datasets[2].label = aeList[2]
            tempHumidChart.data.datasets[2].data = queryData3.map(row => row.con)

            tempHumidChart.update()
        } catch (e) {
            console.log(e.message)
        }
    }

    // 별칭 조회.
    const reqAeDeviceAlias = async () => {
        try {
            const response1 = await fetch(`${PUBLIC_API_URL}/device/alias/${aeList[0]}`, {})
            let alias1 = await response1.json()

            if (alias1.length > 0) {
                aeList[0] = alias1[0].alias
            }

            const response2 = await fetch(`${PUBLIC_API_URL}/device/alias/${aeList[1]}`, {})
            let alias2 = await response2.json()

            if (alias2.length > 0) {
                aeList[1] = alias2[0].alias
            }

            const response3 = await fetch(`${PUBLIC_API_URL}/device/alias/${aeList[2]}`, {})
            let alias3 = await response3.json()

            if (alias3.length > 0) {
                aeList[2] = alias3[0].alias
            }
        } catch (e) {
            console.log(e.message)
        }
    }

    let stylePadding = conType === "temp" ? "pe-lg-2" : "ps-lg-2"

</script>

<div class="col-lg-6 {stylePadding} mb-3">
  <div class="card h-lg-100">
    <div class="card-header">
      <div class="row flex-between-center">
        <div class="col-auto">
          <h6 class="mb-0">{conTypeText}</h6>
        </div>
        <div class="col-auto d-flex">
          <select class="form-select form-select-sm select-month me-2" bind:value={selected} on:change={change}>
            <option value="1">1분</option>
            <option value="5">5분</option>
            <option value="10">10분</option>
            <option value="30">30분</option>
            <option value="60">1시간</option>
          </select>
        </div>
      </div>
    </div>
    <div class="card-body h-100 pe-0">
      <div class="h-100" style="min-height: 250px">
        <canvas class="chart" bind:this={_chart}></canvas>
      </div>
    </div>
  </div>
</div>

<style>
    .chart {
        display: block;
        width: 200px;
        height: 50px;
    }
</style>