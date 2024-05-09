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

    onMount(async () => {
        _rn = "dn".concat(_YYMM)
        _aei = "Sdn".concat(_YYMM)
    })

    /**
     * 랜덤 4자리
     */
    const onClickRandomDigit = () => {
        const random = (Math.floor(Math.random() * 9000)).toString().padStart(4, "0")
        _rn = "dn".concat(_YYMM, random)
        _aei = "Sdn".concat(_YYMM, random)
    }

    const onClickCheckAE = async () => {
        _aei = "S".concat(_rn)

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
            const fetchData = await response.json();
            _message2 = JSON.stringify(fetchData)

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
      <Footer/>
    </div>
  </div>
</main>
