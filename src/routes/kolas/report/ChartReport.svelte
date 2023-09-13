<script>
    import {onMount} from "svelte";
    import Chart from "chart.js/auto"
    import {PUBLIC_API_URL} from '$env/static/public'
    import moment from "moment";

    export let conType //

    export let queryInfo;


    let timerID
    let timerDelay = 60 * 1000 // 1분
    let conTypeText = (conType === "temp") ? "온도 차트" : "습도 차트"

    let portfolio;
    const data = {
        // labels: tempdata.map(row => row.year),
        datasets: [
            {
                label: '온도',
            },
            {
                label: '습도',
            },
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        fontSize: 5,
                        callback: function (label, index, labels) {
                            return label + '';
                        }
                    },
                    title: {
                        display: true,
                        text: '%R.H.'
                    },
                    min: 30,
                    max: 90,
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    fontSize: 5,
                    min: 10,
                    max: 40,
                    ticks: {
                        callback: function (label, index, labels) {
                            return label + '';
                        }
                    },
                    title: {
                        display: true,
                        text: '\u00B0C'
                    }
                },
                x: {
                    ticks: {
                        autoSkip: false,

                        maxRotation: 90,
                        minRotation: 90,
                        font: {
                            size: 9,
                        }
                    },
                    grid: {
                        display: false
                    }
                },

            },
            elements: {
                point: {
                    radius: 0
                }
            },
            borderRadius: '30',
            responsive: true,
            cutout: '95%',
            spacing: 2,
            plugins: {
                htmlLegend: {
                    // ID of the container to put the legend in
                    containerID: 'top10Legend',
                },
                legend: {
                    position: 'bottom',
                    display: false,
                    labels: {
                        usePointStyle: true,
                        /*padding: 20,*/
                        font: {
                            size: 14
                        }
                    },
                    containerID: 'top10Legend',

                },
                title: {
                    display: true,
                    text: ''
                },

            },

            /*  onResize : function (myChart, size) {
                  var showTicks = (size.width < 550) ? false : true;
                  console.log("chart size : " + size)
                  console.log(size)
                  myChart.options.plugins.legend.display = showTicks;
              }*/
        },
        /*plugins: [htmlLegendPlugin],*/
    };


    const getOrCreateLegendList = (chart, id) => {
        const legendContainer = document.getElementById(id);
        let listContainer = legendContainer.querySelector('ul');

        if (!listContainer) {
            listContainer = document.createElement('ul');
            listContainer.style.display = 'flex';
            listContainer.style.flexDirection = 'row';
            listContainer.style.margin = 0;
            listContainer.style.padding = 0;

            legendContainer.appendChild(listContainer);
        }

        return listContainer;
    };


    let myChart

    onMount(async () => {
        const ctx = portfolio.getContext('2d')
        myChart = new Chart(ctx, config)

        //await clickPeriodQuery();
        await queryMobiusHit()
    })

    // Chart Data Query


    const drawLegend = () => {
        console.log("drawLegend")
    }

    const htmlLegendPlugin = () => {
        console.log("htmlLegendPlugin")
    }


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


        if (timerID) {
            console.log("timerID : " + timerID)
            clearTimeout(timerID)
        }


    }


    const queryMobiusHit = async () => {
        console.log("queryMobiusHit")
        const response = await fetch(`${PUBLIC_API_URL}/mobius/hit`, {
            headers: {"Content-Type": "application/json",}
        })
        const fetchData = await response.json()

        // 마지막 데이터 30개
        let hitData
        if (fetchData.length > 30) {
            hitData = fetchData.slice(fetchData.length - 30, fetchData.length)
        } else {
            hitData = fetchData
        }

        /*myChart.data.labels = hitData.map(row => row.ct)
        myChart.data.datasets[0].data = hitData.map(row => row.http)
        myChart.data.datasets[0].borderDash = [5, 5]
        myChart.data.datasets[1].data = hitData.map(row => row.mqtt)
        myChart.data.datasets[2].data = hitData.map(row => row.coap)
        myChart.data.datasets[3].data = hitData.map(row => row.ws)

        myChart.update()*/
    }

    const clickPeriodQuery = async (e) => {

        console.log("clickPeriodQueryclickPeriodQueryclickPeriodQueryclickPeriodQuery")
        const queryParams = {
            aei: 'DHT22_LCD_0001',
            periodType: '1',
            periodStart: '20230701000000',
            periodEnd: '20230731000000'
        };


        /*let date = new Date(periodEnd)
        console.log(date)
        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)

        queryParams['periodStart'] = periodStart
        queryParams['periodEnd'] = date

         */

        console.log(queryParams)


        const response = await fetch(`${PUBLIC_API_URL}/kolas/report`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(queryParams)
        });

        const data = await response.json()


        /*        historyCount = data.count;
                historyRows = data.rows;

                testNumber = 20

                pageInfo = {
                    curIndex: 0,
                    totalCount: historyCount
                }*/

        myChart.data.labels = data.rows.map(row => row.datetime)
        myChart.data.datasets[0].yAxisID = 'y1'
        myChart.data.datasets[0].data = data.rows.map(row => row.temp)

        // yAxisID: 'A',
        myChart.data.datasets[1].yAxisID = 'y'
        myChart.data.datasets[1].borderDash = [5, 5]
        myChart.data.datasets[1].data = data.rows.map(row => row.humid)
        /*myChart.data.datasets[1].data = hitData.map(row => row.mqtt)
        myChart.data.datasets[2].data = hitData.map(row => row.coap)
        myChart.data.datasets[3].data = hitData.map(row => row.ws)*!/*/
        myChart.update()
    }

    const reqHistoryData = async (queryInfo) => {

        console.log(queryInfo)

        const response = await fetch(`${PUBLIC_API_URL}/kolas/report2`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(queryInfo)
        });

        const data = await response.json()


        let sliceDate3 = ''

        data.rows.forEach((row, index) => {
            // console.log('Index: ' + index + ' Value: ' + number);

            //console.log(row)
            /*console.log(row.datetime)*/
            if (0 !== index % 4) {
                row.datetime = ''
            } else {
                let cDate = new Date(row.datetime)
                cDate = cDate.setTime(cDate.getTime())
                cDate = new Date(cDate)
                // let sDate = [cDate.getFullYear(), cDate.getMonth(), cDate.getDay()].join('-');

                // console.log(cDate.getDay())
                //console.log(new Date(row.datetime).toISOString().slice(0, 10))

                let sliceDate2 = new Date(row.datetime).toISOString().slice(0, 10)

                // row.datetime = sliceDate2

                // moment(row.datetime).format("YYYY-MM-DD HH:mm:ss")}</td>


                if (sliceDate3 !== sliceDate2) {
                    // moment(row.datetime).format("YYYY-MM-DD HH:mm:ss")}</td>

                    row.datetime = sliceDate2
                    sliceDate3 = sliceDate2
                } else {
                    let ampm = 'am'
                    if (cDate.getHours() >= 12) {
                        ampm = 'pm'
                    }
                    row.datetime = [cDate.getHours(), cDate.getMinutes(), ampm].join(':')
                }

            }
        })


        myChart.data.labels = data.rows.map(row => row.datetime)
        myChart.data.datasets[0].yAxisID = 'y1'
        myChart.data.datasets[0].data = data.rows.map(row => row.temp)

        myChart.data.datasets[1].yAxisID = 'y'
        myChart.data.datasets[1].borderDash = [5, 5]
        myChart.data.datasets[1].data = data.rows.map(row => row.humid)

        myChart.update()
    }

    const changeQueryInfo = (queryInfo) => {
        console.log("changeQueryInfo")

        console.log(queryInfo)
        if (queryInfo.aei) {
            reqHistoryData(queryInfo)
        }

    }

    $: changeQueryInfo(queryInfo)


</script>

<div class="card-body h-100 pe-0">
  <!-- Find the JS file for the following chart at: src\js\charts\echarts\total-sales.js-->
  <!-- If you are not using gulp based workflow, you can find the transpiled code at: public\assets\js\theme.js-->
  <!--<div class="echart-line-total-sales h-100" data-echart-responsive="true"></div>-->
  <div class="h-100" style="min-height: 250px">
    <!--<canvas id="chart-temp"></canvas>-->
    <canvas id=test bind:this={portfolio}></canvas>
  </div>

</div>

<div style="text-align: center">
  <span><div class="test4"><hr></div>온도</span>
  <span><div class="test4"><hr class="test3"></div>습도</span>
</div>

<!--<hr class="test3">-->


<style>
    #draw1 {
        /*display: block;*/
        width: 200px;
        height: 50px;
    }

    .test2 {
        witdh: 100px;
        height: 100px;
    }

    hr {
        border: none;
        border-top: 3px solid black;
    }

    .test3 {
        border: none;
        border-top: 3px dotted black;
    }

    .test4 {
        width: 50px;
        display: inline-block;
    }
</style>