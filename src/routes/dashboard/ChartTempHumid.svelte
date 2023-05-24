<script>
    import {onMount} from "svelte";
    import Chart from "chart.js/auto"
    import {PUBLIC_API_URL} from '$env/static/public'


    export let conType //

    let timerID
    let timerDelay = 60 * 1000 // 1분
    let conTypeText = (conType === "temp") ? "온도 차트"  : "습도 차트"

    let portfolio;
    const data = {
        // labels: tempdata.map(row => row.year),
        datasets: [
            {
                label: 'DHT22_LCD_0001',
                //data: tempdata.map(row => row.count),
                /*backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],*/
                // hoverOffset: 4,
                /*borderColor: 'rgb(255, 99, 132)',*/
                /*borderWidth: 0*/
            },
            {
                label: 'test2F230102_01',
//                data: tempdata.map(row => row.count),
                /*backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],*/
                // hoverOffset: 4,
                /*borderColor: 'rgb(255, 99, 132)',*/
                /*borderWidth: 0*/
            },
            {
                label: 'testB1F221205_01',
                //              data: tempdata.map(row => row.count),
                /*backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],*/
                // hoverOffset: 4,
                /*borderColor: 'rgb(255, 99, 132)',*/
                /*borderWidth: 0*/
            }
        ]
    };

    console.log(data)

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

        timerChartQuery()
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

        let url = `${PUBLIC_API_URL}/device/history/min/DHT22_LCD_0001/${conType}?limit=30&period=${period}`
        const response = await fetch(url, {})
        const queryData = await response.json()

        console.log("queryData Chart")
        console.log(queryData)

        myChart.data.labels = queryData.map(row => getTime(row.datetime))
        myChart.data.datasets[0].data = queryData.map(row => row.con)


        url = `${PUBLIC_API_URL}/device/history/min/test2F230102_01/${conType}?limit=30&period=${period}`
        const response2 = await fetch(url, {}
        )

        const queryData2 = await response2.json()
        myChart.data.datasets[1].data = queryData2.map(row => row.con)


        url = `${PUBLIC_API_URL}/device/history/min/testB1F221205_01/${conType}?limit=30&period=${period}`
        const response3 = await fetch(url, {}
        )

        const queryData3 = await response3.json()
        myChart.data.datasets[2].data = queryData3.map(row => row.con)

        myChart.update()
    }

    let stylePadding = conType === "temp" ? "pe-lg-2" : "ps-lg-2"


</script>

<!--// <div class="col-md-6 col-xxl-3">-->

<div class="col-lg-6 {stylePadding} mb-3">
  <div class="card h-lg-100">
    <div class="card-header">
      <div class="row flex-between-center">
        <div class="col-auto">
          <h6 class="mb-0">{conTypeText}</h6>
        </div>
        <div class="col-auto d-flex">
          <select class="form-select form-select-sm select-month me-2" bind:value={selected} on:change={change}>
            <option value="10">10분</option>
            <option value="30">30분</option>
            <option value="60">1시간</option>
          </select>
          <!--<div class="dropdown font-sans-serif btn-reveal-trigger">
            <button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
                    type="button" id="dropdown-total-sales" data-bs-toggle="dropdown"
                    data-boundary="viewport" aria-haspopup="true" aria-expanded="false">
              <span class="fas fa-ellipsis-h fs&#45;&#45;2"></span>
            </button>
            <div class="dropdown-menu dropdown-menu-end border py-2"
                 aria-labelledby="dropdown-total-sales">
              <a class="dropdown-item" href="#!">View</a>
              <a class="dropdown-item" href="#!">Export</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item text-danger" href="#!">Remove</a>
            </div>
          </div>-->
        </div>
      </div>
    </div>
    <div class="card-body h-100 pe-0">
      <!-- Find the JS file for the following chart at: src\js\charts\echarts\total-sales.js-->
      <!-- If you are not using gulp based workflow, you can find the transpiled code at: public\assets\js\theme.js-->
      <!--<div class="echart-line-total-sales h-100" data-echart-responsive="true"></div>-->
      <div class="h-100" style="min-height: 250px">
        <!--<canvas id="chart-temp"></canvas>-->
        <canvas id=test bind:this={portfolio}></canvas>
      </div>
    </div>
  </div>
</div>

<style>
    #test {
        display: block;
        width: 200px;
        height: 50px;
    }
</style>