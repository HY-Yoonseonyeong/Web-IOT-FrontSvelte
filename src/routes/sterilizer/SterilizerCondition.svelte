<script>
  import { onMount } from "svelte";
  import { gen_m2m_ri } from "$lib/random.js";
  import { PUBLIC_AI_LAB_MOBIUS_CSE_URL } from "$env/static/public";
  import {
    sterilizer_error_code_0,
    sterilizer_error_code_1,
  } from "./error_code";

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

    const BianryReverseChange = (numberKey) => {
      return parseInt(numberKey).toString(2).split("").reverse().map(Number);
    };

    if (url === url2.ds) {
      diStatus = data["m2m:cin"].con;
      diStatusBin = BianryReverseChange(diStatus);
    } else if (url === url2.as) {
      alarmStatus = data["m2m:cin"].con;
    } else if (url === url2.rs) {
      runstop = data["m2m:cin"].con;
    } else if (url === url2.ss) {
      subStatus = data["m2m:cin"].con;
      subStatusBin = BianryReverseChange(subStatus);
    } else if (url === url2.e0) {
      error_0 = data["m2m:cin"].con;
      error_0Bin = BianryReverseChange(error_0);
    } else if (url === url2.e1) {
      error_1 = data["m2m:cin"].con;
      error_1Bin = BianryReverseChange(error_1);
    } else if (url === url2.ps) {
      Pressure = data["m2m:cin"].con;
      Pressure = parseFloat(Pressure).toFixed(3);
    } else if (url === url2.st) {
      steamgeneratorTemperature = data["m2m:cin"].con;
      steamgeneratorTemperature = parseFloat(steamgeneratorTemperature).toFixed(
        1
      );
    } else if (url === url2.vet) {
      vessleExternalTemperature = data["m2m:cin"].con;
      vessleExternalTemperature = parseFloat(vessleExternalTemperature).toFixed(
        1
      );
    } else if (url === url2.vit) {
      vessleInternalTemperature = data["m2m:cin"].con;
      vessleInternalTemperature = parseFloat(vessleInternalTemperature).toFixed(
        1
      );
    } else if (url === url2.wr) {
      WaterResistance = data["m2m:cin"].con;
    }
  };

  let diStatusBin = "";
  let subStatusBin = "";
  let error_0Bin = "";
  let error_1Bin = "";
</script>

<div class="col-xxl-6 col-xl-12">
  <div class="card py-3 mb-3">
    <div class="card-header pb-0">
      <h6 class="mb-0 mt-2">1번 멸균기 | <span>연구소</span></h6>
    </div>
    <div class="card-body py-3">
      <div class="row g-0 justify-content-between">
        <div class="col-6 col-md-3 pb-2">
          <div class="fs-4 fw-normal font-sans-serif lh-1 mb-1">
            {vessleExternalTemperature}<span class="fs-0">&deg;C</span>
          </div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">외부</span>
        </div>
        <div class="col-6 col-md-3 pb-2">
          <div class="fs-4 fw-normal font-sans-serif lh-1 mb-1">
            {steamgeneratorTemperature}<span class="fs-0">&deg;C</span>
          </div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">스팀</span>
        </div>
        <div class="col-6 col-md-3 pb-2">
          <div class="fs-4 fw-normal font-sans-serif lh-1 mb-1">
            {Pressure}<span class="fs-0">Bar</span>
          </div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">압력</span>
        </div>
        <div class="col-6 col-md-3 pb-2">
          <div class="fs-4 fw-normal font-sans-serif lh-1 mb-1">
            {vessleInternalTemperature}<span class="fs-0">&deg;C</span>
          </div>
          <span class="badge rounded-pill fs--2 bg-200 text-primary">내부</span>
        </div>
      </div>
      <div class="row mt-3">
        <div
          class="row g-0 justify-content-between border-bottom py-2 fs--1_5 reactivePadding"
        >
          <div class="px-1 col-6 col-md-6 ps-sm-3">
            Digital Input 상태(diStatus)
          </div>
          <div class="px-1 col-6 col-md-2 text-center">{diStatus}</div>
          <div class="px-1 col-6 col-md-4 reactiveCenter">
            <!--Digital Input 7bit-->
            {#if Math.max(7 - diStatusBin.length, 0) > 0}
              {#each Array(Math.max(7 - diStatusBin.length, 0)).map(() => 0) as _}
                &nbsp;<span class="badge badge-subtle-secondary">0</span>
              {/each}
            {/if}
            {#each diStatusBin as bit}
              <span
                class={bit === 0
                  ? "badge badge-subtle-secondary"
                  : "badge bg-success"}>{bit}</span
              >&nbsp;
            {/each}
          </div>
        </div>
        <div
          class="row g-0 justify-content-between border-bottom py-2 fs--1_5 reactivePadding"
        >
          <div class="px-1 col-6 col-md-6 ps-sm-3">알람 상태(alarmStatus)</div>
          <div class="px-1 col-6 col-md-2 text-center">{alarmStatus}</div>
          <div class="px-1 col-6 col-md-4 reactiveCenter"></div>
        </div>
        <div
          class="row g-0 justify-content-between border-bottom py-2 fs--1_5 reactivePadding"
        >
          <div class="px-1 col-6 col-md-6 ps-sm-3">전체 Run/Stop(runstop)</div>
          <div class="px-1 col-6 col-md-2 text-center">{runstop}</div>
          <div class="px-1 col-6 col-md-4 reactiveCenter"></div>
        </div>
        <div
          class="row g-0 justify-content-between border-bottom py-2 fs--1_5 reactivePadding"
        >
          <div class="px-1 col-6 col-md-6 ps-sm-3">
            보조 출력 상태(subStatus)
          </div>
          <div class="px-1 col-6 col-md-2 text-center">{subStatus}</div>
          <div class="px-1 col-6 col-md-4 reactiveCenter">
            <!--Sub Status 6bit-->
            {#if Math.max(6 - subStatusBin.length, 0) > 0}
              {#each Array(Math.max(6 - subStatusBin.length, 0)).map(() => 0) as _}
                &nbsp;<span class="badge badge-subtle-secondary">0</span>
              {/each}
            {/if}
            {#each subStatusBin as bit}
              <span
                class={bit === 0
                  ? "badge badge-subtle-secondary"
                  : "badge bg-success"}>{bit}</span
              >&nbsp;
            {/each}
          </div>
        </div>
        <div
          class="row g-0 justify-content-between border-bottom py-2 fs--1_5 reactivePadding"
        >
          <div class="px-1 col-6 col-md-6 ps-sm-3">에러 상태1(error_0)</div>
          <div class="px-1 col-6 col-md-2 text-center">{error_0}</div>
          <div class="px-1 col-6 col-md-4 reactiveCenter">
            <select class="form-select">
              {#each sterilizer_error_code_0 as code, i}
                {#if error_0Bin[i] === 1}
                  <option value={code}>{code}</option>
                {/if}
              {/each}
            </select>
          </div>
        </div>
        <div
          class="row g-0 justify-content-between border-bottom py-2 fs--1_5 reactivePadding"
        >
          <div class="px-1 col-6 col-md-6 ps-sm-3">에러 상태2(error_1)</div>
          <div class="px-1 col-6 col-md-2 text-center">{error_1}</div>
          <div class="px-1 col-6 col-md-4 reactiveCenter">
            <select class="form-select">
              {#each sterilizer_error_code_1 as code, i}
                {#if error_1Bin[i] === 1}
                  <option value={code}>{code}</option>
                {/if}
              {/each}
            </select>
          </div>
        </div>
        <div
          class="row g-0 justify-content-between border-bottom py-2 fs--1_5 reactivePadding"
        >
          <div class="px-1 col-6 col-md-6 ps-sm-3">
            현재 증류수 상태(WaterResistance)
          </div>
          <!--<div class="px-1 col-6 col-md-2 text-center">{WaterResistance}</div>-->
          <div class="px-1 col-6 col-md-2 text-center">정상</div>
          <div class="px-1 col-6 col-md-4 reactiveCenter"></div>
        </div>

        <!-- <table class="table table-bordered fs-0 font-sans-serif">
            <tr>
              <th>Digital Input 상태(diStatus)</th>
              <td>{diStatus}</td>
              <td>
                <div>
                  {#if Math.max(7 - diStatusBin.length, 0) > 0}
                    {#each Array(Math.max(7 - diStatusBin.length, 0)).map(() => 0) as _}
                      <span class="badge badge-subtle-secondary">0</span>
                    {/each}
                  {/if}
                  {#each diStatusBin as bit}
                    <span
                      class={bit === 0
                        ? "badge badge-subtle-secondary"
                        : "badge bg-success"}>{bit}</span
                    >
                  {/each}
                </div>
              </td>
            </tr>
            <tr>
              <th>알람 상태(alarmStatus)</th>
              <td>{alarmStatus}</td>
              <td></td>
            </tr>
            <tr>
              <th>전체 Run/Stop(runstop)</th>
              <td>{runstop}</td>
              <td></td>
            </tr>
            <tr>
              <th>보조 출력 상태(subStatus)</th>
              <td>{subStatus}</td>
              <td>
                <div>
                  {#if Math.max(6 - subStatusBin.length, 0) > 0}
                    {#each Array(Math.max(6 - subStatusBin.length, 0)).map(() => 0) as _}
                      <span class="badge badge-subtle-secondary">0</span>
                    {/each}
                  {/if}
                  {#each subStatusBin as bit}
                    <span
                      class={bit === 0
                        ? "badge badge-subtle-secondary"
                        : "badge bg-success"}>{bit}</span
                    >
                  {/each}
                </div>
              </td>
            </tr>
            <tr>
              <th>에러 상태1(error_0)</th>
              <td>{error_0}</td>
              <td>
                <div>
                  <select class="form-select">
                    {#each sterilizer_error_code_0 as code, i}
                      {#if error_0Bin[i] === 1}
                        <option value={code}>{code}</option>
                      {/if}
                    {/each}
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <th>에러 상태2(error_1)</th>
              <td>{error_1}</td>
              <td>
                <div>
                  <select class="form-select">
                    {#each sterilizer_error_code_1 as code, i}
                      {#if error_1Bin[i] === 1}
                        <option value={code}>{code}</option>
                      {/if}
                    {/each}
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <th>현재 증류수 값(WaterResistance)</th>
              <td>{WaterResistance}</td>
              <td></td>
            </tr>
          </table> -->
      </div>
    </div>
  </div>
</div>

<style>
  .fs-2_5 {
    /*font-size: 1.46rem;*/
  }

  .fs--1_5 {
    font-size: 0.9rem;
    font-weight: 400;
  }

  .reactiveCenter {
    text-align: right;
  }

  @media screen and (max-width: 768px) {
    .reactiveCenter {
      margin: 0 auto;
      width: 100%;
      text-align: center;
      border-radius: 5px;
    }

    .reactiveCenter select {
      margin-top: 10px;
    }

    div.col-md-2.text-center {
      text-align: right !important;
    }

    .reactivePadding {
      padding-left: 0.4rem;
      padding-right: 0.4rem;
    }
  }
</style>
