<script>
    import '../../scss/theme.scss'
    import {onMount, onDestroy} from "svelte";
    import Chart from "chart.js/auto"
    import {jsPDF} from "jspdf";
    import html2canvas from 'html2canvas';

    let portfolio;

    onMount(() => {
        const ctx = portfolio.getContext('2d')

        const plugin = {
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, chart.width, chart.height);
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
                            fontSize: 5
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        fontSize: 5
                    },
                    x:{
                        ticks: {
                            autoSkip: false,
                         /*   ,
                            maxRotation: 90,
                            minRotation: 90*/
                            font: {
                                size:8,
                            }
                        },
                    },

                },
                elements: {
                    point:{
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
                        display: true,
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

        let myChart = new Chart(ctx, config)
        myChart.data.labels = tempdata.map(row => row.year)
        myChart.data.datasets[0].borderDash =  [2, 2]
        myChart.data.datasets[0].data = tempdata.map(row => row.count)
        myChart.update()
    })

    onDestroy(() => {
    })

    let canvas

    function test() {
        const doc = new jsPDF('l', 'mm', [210, 297]);

        /*doc.text("Hello world!", 10, 10);
        doc.save("a4.pdf");*/

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

    const tempdata = [
        {year: "20:10 PM", count: 100},
        {year: "", count: 100},
        {year: "", count: 80},
        {year: "", count: 90},

        {year: "20:10 PM", count: 100},
        {year: "", count: 20},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 60},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 50},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},



        {year: "20:10 PM", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},
        {year: "", count: 100},

        {year: "20:10 PM", count: 200},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},

        {year: "20:10 PM", count: 100},
        {year: "", count: 100},{year: "", count: 100},{year: "", count: 100},


    ];


    const data = {
        labels: tempdata.map(row => row.year),

        datasets: [
            {
                label: 'DHT22_LCD_0001',
                data: tempdata.map(row => row.count),
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
                /*backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],*/
                // hoverOffset: 4,
                /*borderColor: 'rgb(255, 99, 132)',*/
                /*borderWidth: 0*/
            },
            {
                label: 'test2F230102_01',
                data: tempdata.map(row => row.count),
                /*backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],*/
                // hoverOffset: 4,
                /*borderColor: 'rgb(255, 99, 132)',*/
                /*borderWidth: 0*/
            },
            {
                label: 'testB1F221205_01',
                data: tempdata.map(row => row.count),
                /*backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],*/
                // hoverOffset: 4,
                /*borderColor: 'rgb(255, 99, 132)',*/
                /*borderWidth: 0*/
            }
        ]
    };

    let h2c
    let docPdf
    const clickCreatePdf = () => {
        html2canvas(docPdf, {
            quality: 1,
            scale: 5,
        }).then((canvas) => {
            h2c = canvas
            console.log("html2canvas")
            var img = canvas.toDataURL("image/png"); //image data of canvas
            var doc = new jsPDF('l', 'mm', 'a4');
            doc.addImage(img, "PNG", 0, 0, 297, 210);
            doc.save('test.pdf');
        })
    }
</script>

<svelte:head>
  <title>리포트 테스트</title>
  <meta name="description" content="About this app"/>
</svelte:head>

<div>test4</div>
<button on:click={test}>pdf</button>
<button on:click={clickCreatePdf}>Create Pdf</button>


<div class="h-100" id="chartTest" style="min-height: 250px; display:none">
  <div>test</div>
  <canvas bind:this={portfolio}></canvas>
</div>

<div style="width: 500px;">
  <div id="content">
    <h1 style="color:red; width: 400px; height: 50px; font-size: 18px">안녕하세요</h1>
    <p>PDF 문서의 내용입니다</p>
  </div>
</div>

<!--// 2480px(가로) X 3508px-->

<div>
  <canvas bind:this={h2c}></canvas>

</div>

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
      <div class="align-center mb-2">제2실</div>
      <div class="align-center mb-3">전기 표준실(27.5m2)</div>
      <div>
        <canvas bind:this={portfolio}></canvas>
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
        border: 1px solid red;
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

</style>
