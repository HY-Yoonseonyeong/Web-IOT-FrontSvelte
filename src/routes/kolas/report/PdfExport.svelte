<script>
    import {onMount, onDestroy} from "svelte";
    import Chart from "chart.js/auto"
    import {jsPDF} from "jspdf";
    import html2canvas from 'html2canvas';
    import {PUBLIC_API_URL} from "$env/static/public";
    import moment from "moment";

    let portfolio;

    let myChart

    export let queryInfo;

    onMount(() => {
        const ctx = portfolio.getContext('2d')

        const plugin = {
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                /*ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, chart.width, chart.height);*/
                ctx.restore();
            }
        };

        const config = {
            type: 'line',
            data: data,
            plugins: [plugin],
            options: {
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                            fontSize: 5,
                            callback: function (label, index, labels) {
                                /*return label+'%R.H.';*/
                                return label + '';
                            }
                        },
                        min: 30,
                        max: 90,
                        title: {
                            display: true,
                            text: '%R.H.'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        fontSize: 5,
                        grid: {
                            display: false
                        },
                        min: 10,
                        max: 40,
                        ticks: {
                            callback: function (label, index, labels) {
                                /*return label+'\u00B0C';*/
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
                    legend: {
                        position: 'bottom',
                        display: false,
                        labels: {
                            // usePointStyle: true,
                            useLineStyle: true,
                            /*padding: 20,*/
                        }
                    },
                    title: {
                        display: true,
                        /*text: 'My Personal Portfolio'*/
                    }
                }
            }
        };

        myChart = new Chart(ctx, config)
        // myChart.data.labels = tempdata.map(row => row.year)
        /*myChart.data.datasets[0].borderDash =  [2, 2]*/
        // myChart.data.datasets[0].data = tempdata.map(row => row.count)
        myChart.update()
    })

    onDestroy(() => {
    })

    let canvas

    function test() {
        const doc = new jsPDF('l', 'mm', [210, 297]);
        var elementHTML = document.querySelector("#chartTest");

        doc.html(elementHTML, {
            callback: function (doc) {
                // Save the PDF
                doc.save('document-html.pdf');
            },
            margin: [10, 10, 10, 10],
            autoPaging: 'text',
            x: 0,
            y: 0,
            width: 1500, //target width in the PDF document
            windowWidth: 3500 //window width in CSS pixels
        });

        // portfolio = portfolio.width
        var canvasHeight = portfolio.height
        var canvasWidth = portfolio.width
    }

    const reqHistoryData = async (queryInfo) => {

        console.log(queryInfo)

        const response = await fetch(`${PUBLIC_API_URL}/kolas/report2`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(queryInfo)
        });

        const data = await response.json()

        console.log(data)


        let sliceDate3 = ''

        data.rows.forEach((row, index) => {
            // console.log('Index: ' + index + ' Value: ' + number);

            //console.log(row)

            if (0 !== index % 4) {
                row.datetime = ''
            } else {

                let date = moment(row.datetime).format("YYYY-MM-DD")
                let time = moment(row.datetime).format("HH:mm")


                // let sDate = [cDate.getFullYear(), cDate.getMonth(), cDate.getDay()].join('-');

                if (sliceDate3 !== date) {
                    // moment(row.datetime).format("YYYY-MM-DD HH:mm:ss")}</td>

                    row.datetime = date
                    sliceDate3 = date
                } else {
                    let ampm = 'am'
                    if (moment(row.datetime).hours() >= 12) {
                        ampm = 'pm'
                    }
                    row.datetime = [time, ampm].join(':')
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
        try {
            if (queryInfo.aei) {
                reqHistoryData(queryInfo)
            }
        } catch (e) {

        }

    }

    $: changeQueryInfo(queryInfo)


    const data = {

        datasets: [
            {
                label: '온도',
            },
            {
                label: '습도',
            },
        ]
    };

    let h2c
    let docPdf
    const clickCreatePdf = () => {
        console.log("clickCreatePdf")
        html2canvas(docPdf, {
            quality: 1,
            scale: 2,
        }).then((canvas) => {
            h2c = canvas
            console.log("html2canvas")
            var img = canvas.toDataURL("image/png"); //image data of canvas
            var doc = new jsPDF('l', 'mm', 'a4');
            doc.addImage(img, "PNG", 0, 0, 297, 210);

            let startDate = moment(queryInfo.periodStart).format('YYYYMMDD')
            let endDate = moment(queryInfo.periodEnd).format('YYYYMMDD')
            let filename = ''.concat(queryInfo.alias, "_", "리포트", startDate, "-", endDate, ".pdf")
            doc.save(filename);
        })
    }

    export function createPDF() {
        clickCreatePdf()
    }

</script>



<!--<button on:click={test}>pdf</button>
<button on:click={clickCreatePdf}>Create Pdf</button>-->


<!--
<div class="h-100" id="chartTest" style="min-height: 250px; display:none">
  <div>test</div>
  <canvas bind:this={portfolio}></canvas>
</div>
-->


<div class="page" bind:this={docPdf} style="backgound-color: white">
  <div style="background-color: white">
    <div class="flex-center mb-6" style="display:flex">
      <div class="item1">
        <span style="font-size: 24px">온습도 기록표</span>
      </div>
      <div>
        <table class="" style=" border: 1px solid black;">
          <thead class="">
          <tr>
            <th class="align-middle" style="width: 110px; text-align: center;">작성</th>
            <th class="align-middle" style="width: 110px; text-align: center;">승인</th>
          </tr>
          </thead>
          <tbody class="list">
          <tr style="height: 60px">
            <td></td>
            <td></td>
          </tr>
          <tr style="height: 30px">
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="color-red">
      <div class="align-center mb-2">{queryInfo.alias}</div>
      <div class="align-center mb-3">전기 표준실(27.5m2)</div>
      <div>
        <canvas bind:this={portfolio}></canvas>
      </div>
      <div style="text-align: center; font-size: 12px">
        <span><div class="test4"><hr></div>온도</span>
        <span><div class="test4"><hr class="test3"></div>습도</span>
      </div>
    </div>

  </div>
</div>

<style>

    .page {
        /*width: 21cm;
        min-height: 29.7cm;*/
        width: 29.7cm;
        min-height: 21cm;
        padding: 1cm 1cm 1cm 1cm;
    }

    @page {
        size: A4;
        margin: 0;
    }

    @media print {
        .page {
            margin: 0;
            border: initial;
            border-radius: initial;
            width: initial;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
        }
    }

    .color-red {
        border: 1px solid black;
        padding: 10px;
    }

    .align-center {
        display: table;
        margin-left: auto;
        margin-right: auto;
    }

    /*/.d-inline-block*/

    .item1 {
        flex: 1;
        display: flex;
        justify-content: center;
        transform: translateX(120px); /*D element Width[if needed]*/
    }

    table {
        width: 100%;
        /*border: 1px solid #444444;*/
        /*border-collapse: collapse;*/
    }

    th, td {
        border: 1px solid #444444;
    }

    hr {
        border: none;
        border-top: 2px solid black;
    }

    .test3 {
        border: none;
        border-top: 2px dotted black;
    }

    .test4 {
        width: 50px;
        display: inline-block;
    }

</style>
