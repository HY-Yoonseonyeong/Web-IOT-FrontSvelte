<script>
  import { onMount, onDestroy } from "svelte";
  import { PUBLIC_API_URL } from "$env/static/public";

  let isQueryWeatherRunning = true;

  /*
  대시보드 날씨 컨포넌트
  */

  let temp = "0"; // 온도
  let humid = "0"; // 습도
  let prePattern = ""; // 강수형태 // 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
  let pre = "0"; // 강수량
  let adress1 = "";
  let adress2 = "";
  let adress3 = "";

  let timerID;
  const delay = 1000 * 60 * 5; // 5분

  let WeatherFirst = "";
  let WeatherFirstList = "";
  let WeatherSecond = "";
  let WeatherSecondList = "";
  let WeatherThirdList = "";

  onMount(async () => {
    try {
      // 날씨 조회
      await LocalStorageWeather();
    } catch (e) {
      console.log(e);
      console.log(e.message);
    }
    await getWeatherFirst();
    await getWeatherSecond();
    await getWeatherThird();
  });

  onDestroy(() => {
    if (timerID) {
      clearTimeout(timerID);
    }
  });

  const LocalStorageWeather = async () => {
    const x = localStorage.getItem("lo_x");
    const y = localStorage.getItem("lo_y");

    if (x && y) {
      queryWeatherlast(x, y);
    } else {
      queryWeather();
    }
  };

  /**
   * @param {string} data.t1h - 온도
   * @param {string} data.reh - 습도
   * @param {string} data.pty - 날씨코드
   * @param {string} data.rn1 - 강수량
   * @returns {Promise<void>}
   */
  const queryWeather = async () => {
    if (isQueryWeatherRunning) {
      const response = await fetch(`${PUBLIC_API_URL}/weather`, {
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await response.json();
      const data = jsonData.data;

      console.log(data);

      temp = data.t1h;
      humid = data.reh;
      prePattern = getTextFromPTY(data.pty);
      pre = data.rn1;
      adress1 = jsonData.lo1;
      adress2 = jsonData.lo2;
      adress3 = jsonData.lo3;

      timerID = setTimeout(queryWeather, delay);
    }
  };

  /**
   * 코드별 날씨 상태
   * @param PTYCode - 날씨 코드
   * @returns {string}
   */
  const getTextFromPTY = (PTYCode) => {
    switch (PTYCode) {
      case "0":
        return "맑음";
      case "1":
        return "비";
      case "2":
        return "비/눈";
      case "3":
        return "눈";
      case "5":
        return "빗방울";
      case "6":
        return "빗방울/눈날림";
      case "7":
        return "눈날림";
      default:
        return "";
    }
  };

  const getWeatherFirst = async () => {
    const url = `${PUBLIC_API_URL}/weather/area`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (200 == response.status) {
      const data = await response.json();
      WeatherFirstList = data.rows;
    }
  };

  const getWeatherSecond = async () => {
    const url = `${PUBLIC_API_URL}/weather/area?addr1=${WeatherFirst}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (200 == response.status) {
      const data = await response.json();
      WeatherSecondList = data.rows;
    }
  };

  const getWeatherThird = async () => {
    const url = `${PUBLIC_API_URL}/weather/area?addr1=${WeatherFirst}&addr2=${WeatherSecond}&xy=1`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (200 == response.status) {
      const data = await response.json();
      WeatherThirdList = data.rows;
    }
    console.log(WeatherThirdList);
  };

  const getWeatherSpace = async () => {
    const url = `${PUBLIC_API_URL}/weather/area?addr1=${WeatherFirst}&addr2=&xy=1`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (200 == response.status) {
      const data = await response.json();
      WeatherThirdList = data.rows;
    }
    console.log(WeatherThirdList);
  };

  const WeatherFirstChange = () => {
    console.log(WeatherFirst);
    getWeatherSecond();
    getWeatherSpace();
  };

  const WeatherSecondChange = () => {
    console.log(WeatherSecond);
    getWeatherThird();
  };

  const getWeatherLocalStorage = () => {
    const x = localStorage.getItem("lo_x");
    const y = localStorage.getItem("lo_y");
    return { x, y };
  };

  const saveWeatherstorage = () => {
    localStorage.setItem("lo_x", WeatherThirdList[selectedRowIndex].lo_x);
    localStorage.setItem("lo_y", WeatherThirdList[selectedRowIndex].lo_y);
    localStorage.setItem(
      "area_code",
      WeatherThirdList[selectedRowIndex].area_code
    );
    localStorage.setItem("addr1", WeatherThirdList[selectedRowIndex].addr1);
    localStorage.setItem("addr2", WeatherThirdList[selectedRowIndex].addr2);
    localStorage.setItem("addr3", WeatherThirdList[selectedRowIndex].addr3);

    /* adress1 = WeatherThirdList[selectedRowIndex].addr1;
    adress2 = WeatherThirdList[selectedRowIndex].addr2;
    adress3 = WeatherThirdList[selectedRowIndex].addr3; */

    const { x, y } = getWeatherLocalStorage();
    queryWeatherlast(x, y);

    isQueryWeatherRunning = false;
  };

  let selectedRowIndex = 0; // 선택한 행의 인덱스

  const tableSelect = (index) => {
    selectedRowIndex = index;
  };

  const queryWeatherlast = async (x, y) => {
    const response = await fetch(
      `${PUBLIC_API_URL}/weather/latest?lo_x=${x}&lo_y=${y}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const jsonData = await response.json();
    const data = jsonData.data;

    console.log(data);

    temp = data.T1H;
    humid = data.REH;
    prePattern = getTextFromPTY(data.PTY);
    pre = data.RN1;

    adress1 = localStorage.getItem("addr1");
    adress2 = localStorage.getItem("addr2");
    adress3 = localStorage.getItem("addr3");

    timerID = setTimeout(queryWeatherlast, delay, x, y);

    console.log(adress1, adress2, adress3);
  };
</script>

<div class="col-md-6 col-xxl-3">
  <div class="card h-md-100">
    <div class="card-header d-flex flex-between-center pb-0">
      <h6 class="mb-0">오늘의 날씨</h6>
      <div class="dropdown font-sans-serif btn-reveal-trigger">
        <button
          class="btn btn-link btn-primary text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#error-modal" 
          on:click={getWeatherThird}
        >
          <span class="fas fa-ellipsis-h fs--2" />
        </button>
        <div
          class="modal fade"
          id="error-modal"
          tabindex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div
            class="modal-dialog modal-dialog-centered"
            role="document"
            style="max-width: 500px"
          >
            <div class="modal-content position-relative">
              <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
                <button
                  class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div class="modal-body p-0">
                <div class="rounded-top-3 py-3 ps-4 pe-6 bg-light">
                  <h4 class="mb-1" id="modalExampleDemoLabel">
                    오늘의 날씨 지역 변경
                  </h4>
                </div>
                <div class="p-4 pb-0">
                  <form>
                    <div class="mb-3 selfsize">
                      <select
                        class="form-select"
                        bind:value={WeatherFirst}
                        on:change={WeatherFirstChange}
                      >
                        <option value="">시/도</option>
                        {#each WeatherFirstList as item}
                          <option value={item.addr1}
                            >{#if item.addr1}{item.addr1}{:else}{""}{/if}</option
                          >
                        {/each}
                      </select>
                      <select
                        class="form-select"
                        bind:value={WeatherSecond}
                        on:change={WeatherSecondChange}
                      >
                        <option value="">시/구/군</option>
                        {#each WeatherSecondList as item}
                          <option value={item.addr2}
                            >{#if item.addr2}{item.addr2}{:else}{""}{/if}</option
                          >
                        {/each}
                      </select>
                    </div>
                  </form>
                  <div class="table-responsive scrollbar">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col" style="display:none">area_code</th>
                          <th scope="col">시/도</th>
                          <th scope="col">시/구/군</th>
                          <th scope="col">동/읍/면/리</th>
                          <th scope="col">위경도 X</th>
                          <th scope="col">위경도 Y</th>
                        </tr>
                      </thead>
                      <tbody>
                        {#each WeatherThirdList as item, index}
                          <tr
                            class:selected={selectedRowIndex === index}
                            class="select_hover"
                            on:click={() => tableSelect(index)}
                          >
                            <td style="display:none">
                              {item.area_code}
                            </td>
                            <td
                              >{#if item.addr1}{item.addr1}{:else}{""}{/if}</td
                            >
                            <td
                              >{#if item.addr2}{item.addr2}{:else}{""}{/if}</td
                            >
                            <td
                              >{#if item.addr3}{item.addr3}{:else}{""}{/if}</td
                            >
                            <td>{item.lo_x}</td>
                            <td>{item.lo_y}</td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-primary"
                  type="button"
                  data-bs-dismiss="modal"
                  on:click={saveWeatherstorage}
                  >변경
                </button>
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-bs-dismiss="modal">취소</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body pt-2">
      <div class="row g-0 h-100 align-items-center">
        <div class="col">
          <div class="d-flex align-items-center">
            {#if prePattern === "맑음"}
              <img
                class="me-3"
                src="assets/img/icons/weather/sunny.png"
                alt=""
                height="60"
              />
            {:else if prePattern === "비"}
              <img
                class="me-3"
                src="assets/img/icons/weather/rain.png"
                alt=""
                height="60"
              />
            {:else if prePattern === "비/눈"}
              <img
                class="me-3"
                src="assets/img/icons/weather/rain_snow.png"
                alt=""
                height="60"
              />
            {:else if prePattern === "눈"}
              <img
                class="me-3"
                src="assets/img/icons/weather/weather-icon.png"
                alt=""
                height="60"
              />
            {:else if prePattern === "빗방울"}
              <img
                class="me-3"
                src="assets/img/icons/weather/dewdrop.png"
                alt=""
                height="60"
              />
            {:else if prePattern === "빗방울/눈날림"}
              <img
                class="me-3"
                src="assets/img/icons/weather/rain_snow.png"
                alt=""
                height="60"
              />
            {:else if prePattern === "눈날림"}
              <img
                class="me-3"
                src="assets/img/icons/weather/snow_drifting.png"
                alt=""
                height="60"
              />
            {:else}
              <div class="me-3" style="height:60" />
            {/if}
            <div>
              <h6 class="mb-2 fs--2">
                <span class="nowrap">{adress1}</span>
                <br />
                <span class="nowrap">
                  {#if adress3 !== "null" && adress3 !== null}
                    {adress3}
                  {:else if adress2 !== "null" && adress2 !== null}
                    {adress2}
                  {/if}
                </span>
              </h6>
              <div class="fs--2 fw-semi-bold">
                <div class="text-warning">{prePattern}</div>
                강수량 : {pre}mm
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto text-center ps-2">
          <div class="fs-4 fw-normal font-sans-serif text-primary mb-1 lh-1">
            {temp}&deg;C
          </div>
          <div class="fs--1 text-800">습도 : {humid}%</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .selfsize {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .selfsize select {
    width: 48%;
  }

  .modal-footer {
    justify-content: center;
  }

  .table-responsive {
    min-height: 150px;
  }

  .table-responsive table {
    text-align: center;
  }

  .table-responsive table tr td {
    cursor: pointer;
  }

  .select_hover:hover {
    background-color: #e8e8e8;
  }

  .fs-4 {
    font-size: 1.9rem !important;
  }

  .selected {
    background-color: #e8e8e8;
  }

  .mb-2 {
    margin-bottom: 0.2rem !important;
  }

  .table-responsive {
    max-height: 550px;
    overflow-y: auto;
  }

  .modal-dialog {
    max-width: 650px !important;
  }

  .nowrap {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    max-width: 65px;
  }
</style>
