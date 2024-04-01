<script>
    import {onMount} from "svelte";
    import Chart from "chart.js/auto"
    import {PUBLIC_API_URL} from '$env/static/public'

    export let conType = ""

    let timerID
    let timerDelay = 60 * 1000 // 1분
    let conTypeText = (conType === "temp") ? "온도 차트" : "습도 차트"

    let portfolio;
    const data = {
        datasets: [
            {
                label: 'HTTP',
            },
            {
                label: 'MQTT',
            },
            {
                label: 'CoAP',
            },
            {
                label: 'WS',
            }
        ]
    };

    const DATA_COUNT = 5;
    const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

    const data2 = {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 2, 3, 4, 5],
            }
        ]
    };


    const config = {
        type: 'pie',
        data: data2,
        options: {
            /*borderRadius: '30',*/
            responsive: true,
            /*cutout: '95%',
            spacing: 2,*/
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: ''
                }
            }
            /*  onResize : function (myChart, size) {
                  var showTicks = (size.width < 550) ? false : true;
                  console.log("chart size : " + size)
                  console.log(size)
                  myChart.options.plugins.legend.display = showTicks;
              }*/
        },
    };

    let myChart

    onMount(async () => {
        const ctx = portfolio.getContext('2d')
        myChart = new Chart(ctx, config)


        //await queryChartData(selected)
        if (timerID) {
            console.log("timerID : " + timerID)
            clearTimeout(timerID)
        }


        await queryMobiusHit()
    })

    // Chart Data Query


    //
    const getTime = (datetime) => {
        try {
            const date = new Date(datetime.slice(0, -1))
            return String.prototype.concat(
                ("00" + date.getHours().toString()).slice(-2),
                ':',
                ("00" + date.getMinutes().toString()).slice(-2),
            )
        } catch (e) {
            return '0'
        }
    }

    let selected = '30'; //

    const change = () => {
        console.log(selected)
        const period = selected

        /*
        queryChartData(period).then(() => {
            console.log("query complete!!!")
        })
        */

        if (timerID) {
            console.log("timerID : " + timerID)
            clearTimeout(timerID)
        }

    }


    //
    const queryChartData = async (period) => {
        return;

        let url = `${PUBLIC_API_URL}/device/history/min/DHT22_LCD_0001/${conType}?limit=30&period=${period}`
        const response = await fetch(url, {})
        const queryData = await response.json()

        myChart.data.labels = queryData.map(row => getTime(row.datetime))
        myChart.data.datasets[0].data = queryData.map(row => row.con)

        url = `${PUBLIC_API_URL}/device/history/min/test2F230102_01/${conType}?limit=30&period=${period}`
        const response2 = await fetch(url, {})

        const queryData2 = await response2.json()
        myChart.data.datasets[1].data = queryData2.map(row => row.con)


        url = `${PUBLIC_API_URL}/device/history/min/testB1F221205_01/${conType}?limit=30&period=${period}`
        const response3 = await fetch(url, {})

        const queryData3 = await response3.json()
        myChart.data.datasets[2].data = queryData3.map(row => row.con)

        myChart.update()
    }

    let stylePadding = conType === "temp" ? "pe-lg-2" : "ps-lg-2"

    const queryMobiusHit = async () => {
        console.log("queryMobiusHit")
        const response = await fetch(`${PUBLIC_API_URL}/mobius/hit`, {
            headers: {"Content-Type": "application/json",}
        })
        const fetchData = await response.json()

        console.log(fetchData)

        // 마지막 데이터 30개
        let hitData
        if (fetchData.length > 30) {
            hitData = fetchData.slice(fetchData.length - 1, fetchData.length)
        } else {
            hitData = fetchData
        }

        console.log(hitData)

        myChart.data.labels = ['HTTP', 'MQTT', 'CoAP', 'WS']
        myChart.data.datasets[0].data = [hitData[0].http, hitData[0].mqtt, hitData[0].coap, hitData[0].ws]

        myChart.update()
    }
</script>

<!--// <div class="col-md-6 col-xxl-3">-->

<div class="card-body h-100 pe-0">
  <!-- Find the JS file for the following chart at: src\js\charts\echarts\total-sales.js-->
  <!-- If you are not using gulp based workflow, you can find the transpiled code at: public\assets\js\theme.js-->
  <!--<div class="echart-line-total-sales h-100" data-echart-responsive="true"></div>-->
  <div class="h-100" style="min-height: 250px">
    <!--<canvas id="chart-temp"></canvas>-->
    <canvas id=test bind:this={portfolio}></canvas>
  </div>
</div>

<style>
    /*#test {
        display: block;
        width: 200px;
        height: 50px;
    }*/
</style>