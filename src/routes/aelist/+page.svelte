<script>
    import '../../scss/theme.scss'
    import NavSide from "../../component/nav/NavSide.svelte"
    import NavTop from "../../component/nav/NavTop.svelte";
    import {onDestroy} from "svelte";
    import {PUBLIC_API_URL, PUBLIC_MOBIUS_URL} from "$env/static/public";


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
      <div class="card mb-3">
        <div class="card-header">
          <div class="row flex-between-end">
            <div class="col-auto align-self-center">
              <h5 class="mb-0" data-anchor="data-anchor">AE 조회</h5>
            </div>
          </div>
        </div>
        <div class="card-body bg-light">
          <div class="tab-content">
            <div class="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-cb148336-8e37-450a-a043-f4b528022939" id="dom-cb148336-8e37-450a-a043-f4b528022939">
              <div class="mb-3">
                <label class="form-label" for="exampleFormControlInput1">Mobius URL : {PUBLIC_MOBIUS_URL}</label>
                <input class="form-control" id="exampleFormControlInput1" type="text" placeholder="AE 아이디를 입력해 주세요." bind:value={aeid}/>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer border-top text-end">
          <button class="btn btn-falcon-default btn-sm" on:click={clickQueryAE}>AE 조회</button>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-header">
          <div class="row align-items-center">
            <div class="col">
              <h5 class="mb-0">AE 조회 결과</h5>
            </div>
            <!--<div class="col-auto"><a class="btn btn-falcon-default btn-sm" href="#!"><span class="fas fa-pencil-alt fs&#45;&#45;2 me-1"></span>Update details</a></div>-->
          </div>
        </div>
        <div class="card-body bg-light border-top">
          <div class="row">
            <div class="col-lg col-xxl-5">
              <!--<h6 class="fw-semi-bold ls mb-3 text-uppercase">Account Information</h6>-->
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-1">aei</p>
                </div>
                <div class="col">{m2m_ae.aei}</div>
              </div>
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-1">api</p>
                </div>
                <div class="col">{m2m_ae.api}</div>
              </div>
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-1">ri</p>
                </div>
                <div class="col">{m2m_ae.ri}</div>
              </div>
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-1">rn</p>
                </div>
                <div class="col">
                  {m2m_ae.rn}
                </div>
              </div>
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-0">ty</p>
                </div>
                <div class="col">{m2m_ae.ty}</div>
              </div>
            </div>
            <div class="col-lg col-xxl-5 mt-4 mt-lg-0 offset-xxl-1">
              <!--<h6 class="fw-semi-bold ls mb-3 text-uppercase">Billing Information</h6>-->
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-1">ct</p>
                </div>
                <div class="col">{m2m_ae.ct}</div>
              </div>
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-1">lt</p>
                </div>
                <div class="col">{m2m_ae.lt}</div>
              </div>
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-1">et</p>
                </div>
                <div class="col">{m2m_ae.et}</div>
              </div>
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-1">rr</p>
                </div>
                <div class="col">{m2m_ae.rr}</div>
              </div>
              <div class="row">
                <div class="col-5 col-sm-4">
                  <p class="fw-semi-bold mb-0">pi</p>
                </div>
                <div class="col">
                  <div class="col">{m2m_ae.pi}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer border-top text-end">
          <a class="btn btn-falcon-default btn-sm" href="">AE 등록</a>
        </div>
      </div>
      <!--
      <div class="card mb-3">
        <div class="card-header">
          <h5 class="mb-0">Logs</h5>
        </div>
        <div class="card-body border-top p-0">
          <div class="row g-0 align-items-center border-bottom py-2 px-3">
            <div class="col-md-auto pe-3"><span class="badge badge-subtle-success rounded-pill">200</span></div>
            <div class="col-md mt-1 mt-md-0"><code>POST /v1/invoiceitems</code></div>
            <div class="col-md-auto">
              <p class="mb-0">2019/02/23 15:29:45</p>
            </div>
          </div>
          <div class="row g-0 align-items-center border-bottom py-2 px-3">
            <div class="col-md-auto pe-3"><span class="badge badge-subtle-warning rounded-pill">400</span></div>
            <div class="col-md mt-1 mt-md-0"><code>POST /v1/invoiceitems</code></div>
            <div class="col-md-auto">
              <p class="mb-0">2019/02/19 21:32:12</p>
            </div>
          </div>
          <div class="row g-0 align-items-center border-bottom py-2 px-3">
            <div class="col-md-auto pe-3"><span class="badge badge-subtle-success rounded-pill">200</span></div>
            <div class="col-md mt-1 mt-md-0"><code>POST /v1/invoices/in_1Dnkhadfk</code></div>
            <div class="col-md-auto">
              <p class="mb-0">2019/02/26 12:23:43</p>
            </div>
          </div>
          <div class="row g-0 align-items-center border-bottom py-2 px-3">
            <div class="col-md-auto pe-3"><span class="badge badge-subtle-success rounded-pill">200</span></div>
            <div class="col-md mt-1 mt-md-0"><code>POST /v1/invoices/in_1Dnkhadfk</code></div>
            <div class="col-md-auto">
              <p class="mb-0">2019/02/12 23:32:12</p>
            </div>
          </div>
          <div class="row g-0 align-items-center border-bottom py-2 px-3">
            <div class="col-md-auto pe-3"><span class="badge badge-subtle-danger rounded-pill">404</span></div>
            <div class="col-md mt-1 mt-md-0"><code>POST /v1/invoices/in_1Dnkhadfk</code></div>
            <div class="col-md-auto">
              <p class="mb-0">2019/02/08 02:20:23</p>
            </div>
          </div>
          <div class="row g-0 align-items-center border-bottom py-2 px-3">
            <div class="col-md-auto pe-3"><span class="badge badge-subtle-success rounded-pill">200</span></div>
            <div class="col-md mt-1 mt-md-0"><code>POST /v1/invoices/in_1Dnkhadfk</code></div>
            <div class="col-md-auto">
              <p class="mb-0">2019/02/01 12:29:34</p>
            </div>
          </div>
        </div>
        <div class="card-footer bg-light p-0"><a class="btn btn-link d-block w-100" href="#!">View more logs<span class="fas fa-chevron-right fs&#45;&#45;2 ms-1"></span></a></div>
      </div>-->


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


