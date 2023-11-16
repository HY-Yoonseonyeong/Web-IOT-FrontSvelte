<script>
    import {PUBLIC_API_URL} from "$env/static/public";
    import {goto} from "$app/navigation";

    let Agreement = false;
    let Privacy = false;

    const onSubmit = async (e) => {
        const formData = new FormData(e.target);
        const data = {};

        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;

            if (!value) {
                alert("입력 정보가 잘못되었습니다.");
                return;
            }

            if (!Agreement || !Privacy) {
                alert("이용약관과 개인정보 수집에 동의해주세요.");
                return;
            }
        }

        data["term_of_use"] = Agreement ? "Y" : "N";
        data["term_of_privacy"] = Privacy ? "Y" : "N";

        const fetchData = (async () => {
            const response = await fetch(`${PUBLIC_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const jsonData = await response.json();

            if (jsonData.error) {
                alert(jsonData.msg);
            } else {
                alert(jsonData.msg);
                await goto("../../login");
            }
            console.log(data);
        })();
    };
</script>

<svelte:head>
  <title>회원가입 | HYNUX-IOT</title>
  <meta name="HYNUX-IOT" content="HYNUX-IOT"/>
</svelte:head>

<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <div class="row flex-center min-vh-100 py-6">
      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <a class="d-flex flex-center mb-4" href={"../"}>
          <!--<img class="me-2" src="../../../assets/img/icons/spot-illustrations/falcon.png" alt="" width="58" />-->
          <span class="font-sans-serif fw-bolder fs-5 d-inline-block"
          >HYNUX-IOT</span
          >
        </a>
        <div class="card">
          <div class="card-body p-4 p-sm-5">
            <div class="row flex-between-center mb-2">
              <div class="col-auto">
                <h5>회원가입</h5>
              </div>
              <div class="col-auto fs--1 text-600">
                <span class="mb-0 undefined">회원이신가요?</span>
                <span><a href="../../login">로그인</a></span>
              </div>
            </div>
            <form on:submit|preventDefault={onSubmit} action="./">
              <div class="mb-3">
                <input
                        class="form-control"
                        type="text"
                        name="username"
                        autocomplete="on"
                        placeholder="이름을 입력해 주세요"
                />
              </div>
              <div class="mb-3">
                <input
                        class="form-control"
                        type="email"
                        name="email"
                        autocomplete="on"
                        placeholder="이메일 주소를 입력해 주세요"
                />
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-sm-6">
                  <input
                          class="form-control"
                          type="password"
                          name="password"
                          autocomplete="on"
                          placeholder="비밀번호"
                  />
                </div>
                <div class="mb-3 col-sm-6">
                  <input
                          class="form-control"
                          type="password"
                          name="confirm-pw"
                          autocomplete="on"
                          placeholder="비밀번호 확인"
                  />
                </div>
              </div>
              <div class="form-check">
                <input
                        class="form-check-input"
                        type="checkbox"
                        id="basic-register-checkbox"
                        bind:checked={Agreement}
                />
                <label class="form-label" for="basic-register-checkbox"
                >이용약관 동의 <span class="font_red">(필수)</span>
                  <!--<a href="#!">terms </a>and <a href="#!">Privacy policy</a>-->
                </label>
                <a
                        class="btn btn-falcon-default me-1 mb-1 btn-sm l_button_right"
                        href="../etc/agreement"
                        target="_blank"
                        type="button">약관 보기</a
                >
              </div>
              <div class="form-check">
                <input
                        class="form-check-input"
                        type="checkbox"
                        id="basic-register-checkbox_2"
                        bind:checked={Privacy}
                />
                <label class="form-label" for="basic-register-checkbox_2"
                >개인정보 수집 동의 <span class="font_red">(필수)</span>
                  <!--<a href="#!">terms </a>and <a href="#!">privacy policy</a>-->
                </label>
                <a
                        class="btn btn-falcon-default me-1 mb-1 btn-sm l_button_right"
                        href="../etc/privacy"
                        target="_blank"
                        type="button">약관 보기</a
                >
              </div>
              <div class="mb-3">
                <button
                        class="btn btn-primary d-block w-100 mt-3"
                        type="submit"
                        name="submit">회원가입
                </button
                >
              </div>
            </form>
            <div class="position-relative mt-4">
              <hr/>
              <div class="divider-content-center"><!--or register with--></div>
            </div>
            <div class="row g-2 mt-2">
              <!--<div class="col-sm-6">
                <a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#">
                  <span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google
                </a>
              </div>
              <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>-->
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

<style>
    .l_button_right {
        float: right;
        font-size: 0.75rem;
    }

    .font_red {
        color: lightcoral;
        font-weight: 400;
    }

    .form-check-input,
    .form-label {
        cursor: pointer;
    }
</style>
