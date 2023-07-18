<script>
    import '../../scss/theme.scss'
    import {goto} from "$app/navigation";
    import {onMount, onDestroy} from "svelte";
    import Chart from "chart.js/auto"
    import { jsPDF } from "jspdf";

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
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
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
        myChart.data.datasets[0].data = tempdata.map(row => row.count)



        myChart.update()

        // myChart.draw()



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
            callback: function(doc) {
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
        {year: 2010, count: 100},
        {year: 2011, count: 200},
        {year: 2012, count: 150},
        {year: 2013, count: 250},
        {year: 2014, count: 22},
        {year: 2015, count: 30},
        {year: 2016, count: 28},
        {year: 2010, count: 10},
        {year: 2011, count: 20},
        {year: 2012, count: 15},
        {year: 2013, count: 25},
        {year: 2014, count: 22},
        {year: 2015, count: 30},
        {year: 2016, count: 28},
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





</script>

<svelte:head>
  <title>리포트 테스트</title>
  <meta name="description" content="About this app"/>
</svelte:head>

<div>test4</div>
<button on:click={test}>pdf</button>

<div class="h-100" id="chartTest" style="min-height: 250px">
  <div>test</div>
  <!--<canvas id="chart-temp"></canvas>-->
  <canvas bind:this={portfolio}></canvas>
</div>



