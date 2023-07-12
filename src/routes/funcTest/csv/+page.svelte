<script>
    /*import '../../../scss/theme.scss'*/
    import NavSide from "../../../component/nav/NavSide.svelte"
    import NavTop from "../../../component/nav/NavTop.svelte";
    import {onDestroy} from "svelte";
    import {PUBLIC_API_URL, PUBLIC_MOBIUS_URL} from "$env/static/public";


    let aeid = '' // AE ID

    onDestroy(() => {

    })

    const init_m2m_ae = () => {
        return {
            'aei': '',            'api': '',            'ri': '',            'rn': '',            'ty': '',
            'ct': '',            'et': '',            'lt': '',            'rr': '',            'pi': '',        };
    }

    const clickQueryAE = async () => {

        return;

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
      <div class="card mb-3">
        <div class="card-header">
          <div class="row flex-between-end">
            <div class="col-auto align-self-center">
              <h5 class="mb-0" data-anchor="data-anchor">다운로드 테스트</h5>
            </div>
          </div>
        </div>
        <div class="card-body bg-light">
          <div class="tab-content">
            <div class="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-cb148336-8e37-450a-a043-f4b528022939" id="dom-cb148336-8e37-450a-a043-f4b528022939">
              <div class="mb-3">
                <label class="form-label" for="exampleFormControlInput1">Mobius URL : {PUBLIC_MOBIUS_URL}</label>
                <input class="form-control" id="exampleFormControlInput1" type="text" placeholder="" bind:value={aeid}/>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer border-top text-end">
          <button class="btn btn-falcon-default btn-sm" on:click={clickQueryAE}>다운로드 테스트 </button>
        </div>
      </div>


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


