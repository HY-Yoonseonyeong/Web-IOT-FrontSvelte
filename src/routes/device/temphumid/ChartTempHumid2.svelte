<script>
    import {onMount, onDestroy} from "svelte";
    import Chart from "chart.js/auto"
    import {PUBLIC_API_URL} from '$env/static/public'
    import moment from "moment";

    export let conType  // 차트 데이터 타입 (온도, 습도)
    export let ae  = ""     //

    let timerID
    let timerDelay = 60 * 1000 // 1분
    let conTypeText = (conType === "temp") ? "온도 차트" : "습도 차트"
    let selected = '30'; //

    //
    const aeList = new Array()
    aeList.push("dn23100004")

    let _chart;
    const data = {
        datasets: [
            {
                label: ae,
            },
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            borderRadius: '30',
            responsive: true,
            maintainAspectRatio: false,
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
        const ctx = _chart.getContext('2d')
        tempHumidChart = new Chart(ctx, config)

        await query()
    })

    onDestroy(() => {
        if (timerID) {
            clearTimeout(timerID)
        }
    })

    const query = async () => {
        await reqAeDeviceAlias()
        timerChartQuery()
    }

    const change = () => {
        const period = selected

        if (timerID) {
            console.log("timerID : " + timerID)
            clearTimeout(timerID)
        }

        timerChartQuery()
    }

    const timerChartQuery = () => {
        queryChartData(selected).then(() => {
            timerID = setTimeout(timerChartQuery, timerDelay)
        })
    }

    //
    const queryChartData = async (period) => {

        try {
            let url = `${PUBLIC_API_URL}/device/history/min/${ae}/${conType}?limit=30&period=${period}`
            const response = await fetch(url, {})
            const queryData = await response.json()

            tempHumidChart.data.labels = queryData.map(row => moment(row.datetime).format('HH:mm'))
            tempHumidChart.data.datasets[0].label = aeList[0]
            tempHumidChart.data.datasets[0].data = queryData.map(row => row.con)

            tempHumidChart.update()
        } catch (e) {
            console.log(e.message)
        }
    }

    // 별칭 조회.
    const reqAeDeviceAlias = async () => {
        try {
            const response1 = await fetch(`${PUBLIC_API_URL}/device/alias/${ae}`, {})
            let alias1 = await response1.json()

            if (alias1.length > 0) {
                aeList[0] = alias1[0].alias
            }

        } catch (e) {
            console.log(e.message)
        }
    }

    $: changeAE(ae)

    const changeAE = (ae) => {
        query()
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
      <div class="h-100" style="min-height: 260px">
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