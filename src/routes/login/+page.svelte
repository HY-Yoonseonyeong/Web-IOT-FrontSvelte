<script>
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    onMount(() => {
        const userToken = localStorage.getItem('hynuxiot-token')
        if (userToken) {
            goto('/')
        }
    })

    const onSubmitLogin = (e) => {
        const formData = new FormData(e.target);
        const data = {};

        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;

            if (!value) {
                alert("입력 정보가 잘못되었습니다.")
                return
            }
        }

        const fetchData = (async () => {
            try {
                const response = await fetch(`${PUBLIC_API_URL}/users/login`, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                });

                if (!response.ok) //
                    throw new Error(response.statusText);

                const jsonData = await response.json();

                if (jsonData.error) {
                    alert(jsonData.msg)
                } else {
                    // Login
                    localStorage.setItem('hynuxiot-token', jsonData.hynuxiot_token)
                    alert("로그인 완료 :)")
                    await goto('./dashboard')
                }
            } catch (err) {
                alert("조회 에러!")
            }
        })()
    }

    /*const clickFindPassword = () => {
        // 이메일 유효성 확인
        const checkUserMail = (async () => {
            try {
                const response = await fetch(`${PUBLIC_API_URL}/users/email`, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                });

                if (!response.ok) //
                    throw new Error(response.statusText);

            } catch (e) {
                console.log(e)
            }
        })()
    }*/
</script>

<svelte:head>
  <title>Login | HYNUX-IOT</title>
  <meta name="HYNUX-IOT" content="HYNUX-IOT"/>
</svelte:head>


<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <div class="row flex-center min-vh-100 py-6">
      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <a class="d-flex flex-center mb-4" href="{'./'}">
          <!--<img class="me-2" src="../../../assets/img/icons/spot-illustrations/falcon.png" alt="" width="58" />-->
          <span class="font-sans-serif fw-bolder fs-5 d-inline-block">HYNUX-IOT</span>
        </a>
        <div class="card">
          <div class="card-body p-4 p-sm-5">
            <div class="row flex-between-center mb-2">
              <div class="col-auto">
                <h5>로그인</h5>
              </div>
              <div class="col-auto fs--1 text-600">
                <span class="mb-0 undefined">또는</span>
                <span><a href="../member/register">회원가입</a></span>
              </div>
            </div>
            <form on:submit|preventDefault={onSubmitLogin}>
              <div class="mb-3">
                <input class="form-control" type="email" name="email" placeholder="이메일 주소를 입력해 주세요."/>
              </div>
              <div class="mb-3">
                <input class="form-control" type="password" name="password" placeholder="비밀번호를 입력해 주세요."/>
              </div>
              <div class="row flex-between-center">
                <div class="col-auto">
                  <div class="form-check mb-0">
                    <input class="form-check-input" type="checkbox" id="basic-checkbox" checked="checked"/>
                    <label class="form-check-label mb-0" for="basic-checkbox">로그인 유지</label>
                  </div>
                </div>
                <div class="col-auto"><a class="fs--1" href="./member/forgotPassword">비밀번호 찾기</a></div>
              </div>
              <div class="mb-3">
                <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">로그인
                </button>
              </div>
            </form>
            <div class="position-relative mt-4">
              <hr/>
              <div class="divider-content-center"><!--or log in with--></div>
            </div>
            <div class="row g-2 mt-2">
              <!--<div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="./"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
              <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="./"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->
