<script>
    import {onMount} from "svelte";
    import {gen_m2m_ri} from "$lib/random.js";
    import {PUBLIC_AI_LAB_MOBIUS_CSE_URL} from "$env/static/public";


    let diStatus = "";
    let alarmStatus = "";
    let runstop = "";
    let subStatus = "";
    let error_0 = "";
    let error_1 = "";
    let Pressure = "";
    let steamgeneratorTemperature = "";
    let vessleExternalTemperature = "";
    let vessleInternalTemperature = "";
    let WaterResistance = "";

    let timerID; // 타이머 아이디
    const delay = 30 * 1000; // 타이머 30초 간격

    let url2;

    onMount(async () => {
        url2 = {
            ds: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/diStatus/la`,
            as: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/alarmStatus/la`,
            rs: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/runstop/la`,
            ss: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/subStatus/la`,
            e0: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/error_0/la`,
            e1: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/error_1/la`,
            ps: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/Pressure/la`,
            st: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/steamgeneratorTemperature/la`,
            vet: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/vessleExternalTemperature/la`,
            vit: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/vessleInternalTemperature/la`,
            wr: `${PUBLIC_AI_LAB_MOBIUS_CSE_URL}/dn2023070001/WaterResistance/la`,
        };

        async function query() {
            for (const key in url2) {
                await getST(url2[key]);
            }
            timerID = setTimeout(query, delay);
        }

        await query();
    });

    const getST = async (url) => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "X-M2M-RI": gen_m2m_ri(),
                "X-M2M-Origin": "Stest",
            },
        });

        const data = await response.json();

        if (url === url2.ds) {
            diStatus = data["m2m:cin"].con;
        } else if (url === url2.as) {
            alarmStatus = data["m2m:cin"].con;
        } else if (url === url2.rs) {
            runstop = data["m2m:cin"].con;
        } else if (url === url2.ss) {
            subStatus = data["m2m:cin"].con;
        } else if (url === url2.e0) {
            error_0 = data["m2m:cin"].con;
        } else if (url === url2.e1) {
            error_1 = data["m2m:cin"].con;
        } else if (url === url2.ps) {
            Pressure = data["m2m:cin"].con;
        } else if (url === url2.st) {
            steamgeneratorTemperature = data["m2m:cin"].con;
        } else if (url === url2.vet) {
            vessleExternalTemperature = data["m2m:cin"].con;
        } else if (url === url2.vit) {
            vessleInternalTemperature = data["m2m:cin"].con;
        } else if (url === url2.wr) {
            WaterResistance = data["m2m:cin"].con;
        }
    };

</script>

<div class="row g-3 mb-3">
  <div class="col-md-6 col-xxl-6">
    <div class="card h-md-100">
      <div class="card-header pb-0">
        <h6 class="mb-0 mt-2">멸균기 | <span>연구소</span></h6>
      </div>
      <div class="card-body d-flex flex-column justify-content-end">
        <div class="row justify-content-between">
          <div class="col-auto align-self-end">
            <div class="fs-2_5 fw-normal font-sans-serif lh-1 mb-1">
              {vessleExternalTemperature}<span class="fs-0">&deg;C</span>
            </div>
            <span class="badge rounded-pill fs--2 bg-200 text-primary"
            >외부</span
            >
          </div>
          <div class="col-auto ps-0">
            <div class="fs-2_5 fw-normal font-sans-serif lh-1 mb-1">
              {steamgeneratorTemperature}<span class="fs-0">&deg;C</span>
            </div>
            <span class="badge rounded-pill fs--2 bg-200 text-primary"
            >스팀</span
            >
          </div>
          <div class="col-auto ps-0">
            <div class="fs-2_5 fw-normal font-sans-serif lh-1 mb-1">
              {Pressure}<span class="fs-0">Bar</span>
            </div>
            <span class="badge rounded-pill fs--2 bg-200 text-primary"
            >압력</span
            >
          </div>
          <div class="col-auto ps-0">
            <div class="fs-2_5 fw-normal font-sans-serif lh-1 mb-1">
              {vessleInternalTemperature}<span class="fs-0">&deg;C</span>
            </div>
            <span class="badge rounded-pill fs--2 bg-200 text-primary"
            >내부</span
            >
          </div>
        </div>
        <div class="mt-3">
          <div class="row">
            <table class="table table-bordered fs-0 font-sans-serif">
              <tr>
                <th>Digital Input 상태(diStatus)</th>
                <td>{diStatus}</td>
              </tr>
              <tr>
                <th>알람 상태(alarmStatus)</th>
                <td>{alarmStatus}</td>
              </tr>
              <tr>
                <th>전체 Run/Stop(runstop)</th>
                <td>{runstop}</td>
              </tr>
              <tr>
                <th>보조 출력 상태(subStatus)</th>
                <td>{subStatus}</td>
              </tr>
              <tr>
                <th>에러 상태1(error_0)</th>
                <td>{error_0}</td>
              </tr>
              <tr>
                <th>에러 상태2(error_1)</th>
                <td>{error_1}</td>
              </tr>
              <tr>
                <th>현재 증류수 값(WaterResistance)</th>
                <td>{WaterResistance}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
    .fs-2_5 {
        font-size: 1.46rem;
    }

    table th {
        font-size: 0.95rem;
        font-weight: 500;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    table td {
        text-align: right;
        font-weight: 400;
    }
</style>
