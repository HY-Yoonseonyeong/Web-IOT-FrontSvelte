<script>
    import NavTop from "../../../component/nav/NavTop.svelte";
    import NavSide from "../../../component/nav/NavSide.svelte";
    import Footer from "../../../component/nav/Footer.svelte";
    import {onMount} from "svelte";
    import {PUBLIC_API_URL, PUBLIC_MOBIUS_AZURE_URL} from "$env/static/public";
    import moment from "moment";
    import {checkTokenThenLogin} from "$lib/hyToken.js";

    let _rn
    let _aei
    let _ae
    let _message = ""
    let _message2 = ""
    const _YYMM = moment().format('YYMM')
    console.log(moment().format('YYMM'))

    //     console.log(String(random).padStart(4, "0")); // '00123'
    //    console.log("random : " + random)

    onMount(async () => {
        _rn = "dn".concat(_YYMM)
        _aei = "Sdn".concat(_YYMM)
    })

    //

    /**
     * 랜덤 4자리
     */
    const onClickRandomDigit = () => {
        const random = (Math.floor(Math.random() * 9000)).toString().padStart(4, "0")
        _rn = "dn".concat(_YYMM, random)
        _aei = "Sdn".concat(_YYMM, random)
    }


    const onClickCheckAE = async () => {
        console.log(_aei)

        _aei = "S".concat(_rn)

        console.log(_rn)
        console.log(_aei)

        try {
            const response = await fetch(`${PUBLIC_MOBIUS_AZURE_URL}/Mobius/${_rn}?rcn=1`, {
                method: "GET",
                headers: {
                    'Accept': "application/json",
                    'X-M2M-RI': 12345,
                    'X-M2M-Origin': _aei,
                },
            });

            const fetchData = await response.json();
            _message = JSON.stringify(fetchData)

        } catch (e) {
            console.log(e.message)
        }
    }

    const onClickCreateAE = async () => {
        const body = {
            "m2m:ae": {
                "rn": _rn,
                "api": "DEVICE.Sensor.Temphumid",
                "lbl": [
                    "1",
                    "2",
                    "2",
                ],
                "rr": true
            }
        }

        try {
            const response = await fetch(`${PUBLIC_MOBIUS_AZURE_URL}/Mobius`, {
                method: "POST",
                headers: {
                    'Accept': "application/json",
                    'X-M2M-RI': 12345,
                    'X-M2M-Origin': _aei,
                    'Content-Type': "application/json;ty=2"
                },
                body: JSON.stringify(body)

            });

            console.log(response)
            const fetchData = await response.json();
            _message2 = JSON.stringify(fetchData)
            console.log(fetchData)
            console.log("1")

        } catch (e) {
            console.log(e.message)
        }

        // -- 라벨 1.유형, 2. Mac, 3: 온습도, 4. 펌웨어 버전 5. 위치(옵션), 6. 기타
    }

    const onClickCreateCNT = async () => {
        try {
            await createCNT("temp")
            await createCNT("humid")
        } catch (e) {
            console.log(e.message)
        }
    }

    //
    const createCNT = async (cnt_rn) => {

        const body = {
            "m2m:cnt": {
                "rn": cnt_rn,
                "lbl": [
                    "온도"
                ],
            }
        }

        try {
            const response = await fetch(`${PUBLIC_MOBIUS_AZURE_URL}/Mobius/${_rn}`, {
                method: "POST",
                headers: {
                    'Accept': "application/json",
                    'X-M2M-RI': 12345,
                    'X-M2M-Origin': _aei,
                    'Content-Type': "application/json;ty=3"
                },
                body: JSON.stringify(body)
            });

            const fetchData = await response.json();
            _message2 = JSON.stringify(fetchData)
            console.log(fetchData)

        } catch (e) {
            console.log(e.message)
        }
    }


</script>

<svelte:head>
  <title>Mobius AE CNT | Mobius AE CNT</title>
  <meta name="HYNUX-IOT" content="HYNUX-IOT"/>
</svelte:head>

<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide/>
    <div class="content">
      <NavTop/>

      <p>AE 디바이스 CNT(container)</p>
      <div>
        <h6> rn (Resource Name) : dn </h6>
        <input bind:value="{_rn}">
        <input bind:value="{_aei}">
        <h6> aei : {_aei}</h6>
        <button on:click={onClickRandomDigit}>랜덤4자리</button>
        <button on:click={onClickCheckAE}>AE 확인</button>
        <textarea>{_message}</textarea>
        <select>
          <option>온습도</option>
          <option>멸균기</option>
        </select>
      </div>

      <div>
        <h5>라벨</h5>
        <h6>api</h6>
        <h6>api</h6>
        <!--<AE 생성></AE>-->
        <input>
        <input>
        <input>
        <input>
        <input>
        <input>
        <button on:click={onClickCreateCNT}>CNT 생성</button>
        <textarea>{_message2}</textarea>
      </div>
      <Footer/>
    </div>
  </div>
</main>
