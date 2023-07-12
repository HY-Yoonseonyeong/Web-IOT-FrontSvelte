<script>
    import '../../../scss/theme.scss'
    import NavSide from "../../../component/nav/NavSide.svelte"
    import NavTop from "../../../component/nav/NavTop.svelte";
    import {onDestroy} from "svelte";
    import {PUBLIC_API_URL, PUBLIC_MOBIUS_URL} from "$env/static/public";
    import AeDeviceList from "./AeDeviceList.svelte";

    let aeid = '' // AE ID

    onDestroy(() => {
    })

    const init_m2m_ae = () => {
        return {
            'aei': '',
            'api': '',
            'ri': '',
            'rn': '',
            'ty': '',
            'ct': '',
            'et': '',
            'lt': '',
            'rr': '',
            'pi': '',
        };
    }

    const clickQueryAE = async () => {

        if (aeid === '') {
            alert("AE 아이디를 입력해 주세요!")
            return
        }
        //on:click={noService}
        console.log("clickQueryAE")
        // AE 조회

        const response = await fetch(`${PUBLIC_API_URL}/mobius/ae/${aeid}`, {headers: {"Content-Type": "application/json"}})
        const fetchData = await response.json()

        m2m_ae = init_m2m_ae()

        if (fetchData.hasOwnProperty('m2m:dbg')) {
            alert(fetchData['m2m:dbg'])
            return
        }

        console.log(fetchData)
        console.log(fetchData['m2m:ae'])

        m2m_ae = fetchData['m2m:ae']
        console.log(m2m_ae)
    }

    let m2m_ae = init_m2m_ae()

</script>

<svelte:head>
  <title>AE List | HYNUX-IOT</title>
  <meta name="description" content="About this app"/>
</svelte:head>


<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide/>
    <div class="content">
      <NavTop/>


      <AeDeviceList/>

      <footer class="footer">
        <div class="row g-0 justify-content-between fs--1 mt-4 mb-3">
          <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 text-600">HYNUX-IOT
              <span class="d-none d-sm-inline-block">| </span><br class="d-sm-none"/> 2023 &copy;
              <a href="https://hynux.co.kr">HYNUX</a>
            </p>
          </div>
          <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 text-600">v3.16.0</p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</main>


