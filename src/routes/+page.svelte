<script>
    import {onMount} from 'svelte'
    import {PUBLIC_API_URL} from '$env/static/public'

    export let data;

    let login = false;

    //
    let userToken

    onMount(async () => {

        userToken = localStorage.getItem('hynuxiot-token')

        const response = await fetch(`${PUBLIC_API_URL}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('hynuxiot-token')
            },
        });

        const fetchData = await response.json();

        if (fetchData.user) {
            login = true
        }
    })

    const clickLogout = () => {
        localStorage.removeItem('hynuxiot-token')
        userToken = ''
    }
</script>

<svelte:head>
  <title>HYNUX-IOT</title>
  <meta name="HYNUX-IOT" content="HYNUX-IOT"/>
</svelte:head>

<main class="main" id="top">
  <nav class="navbar navbar-standard navbar-expand-lg fixed-top navbar-dark" data-navbar-darken-on-scroll="data-navbar-darken-on-scroll">
    <div class="container">
      <a class="navbar-brand" href="/"><span class="text-white dark__text-white">HYNUX-IOT</span></a>
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarStandard" aria-controls="navbarStandard" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse scrollbar" id="navbarStandard">
        <ul class="navbar-nav" data-top-nav-dropdowns="data-top-nav-dropdowns">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fs-0" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dashboards">대시보드</a>
            <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="dashboards">
              <div class="bg-white dark__bg-1000 rounded-3 py-2">
                <a class="dropdown-item link-600 fw-medium" href="./dashboardMobius">Mobius</a>
                <a class="dropdown-item link-600 fw-medium" href="./dashboard">온도/습도 모니터링</a>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fs-0" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >디바이스</a>
            <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="dashboards">
              <div class="bg-white dark__bg-1000 rounded-3 py-2">
                <a class="dropdown-item link-600 fw-medium" href="./aelist">디바이스 조회</a>
                <a class="dropdown-item link-600 fw-medium" href="./devicelist">디바이스 관리</a>
              </div>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle fs-0" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">데이터 조회</a>
            <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="dashboards">
              <div class="bg-white dark__bg-1000 rounded-3 py-2">
                <a class="dropdown-item link-600 fw-medium" href="./kolas/history">기간 조회</a>
                <a class="dropdown-item link-600 fw-medium" href="./kolas/report">리포트 생성</a>
                <!--<a class="dropdown-item link-600 fw-medium" href="./kolas/filelist">파일 리스트</a>-->
              </div>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <!--<li class="nav-item d-flex align-items-center me-2">
            <div class="nav-link theme-switch-toggle fa-icon-wait p-0">
              <input class="form-check-input ms-0 theme-switch-toggle-input" id="themeControlToggle" type="checkbox" data-theme-control="theme" value="dark">
              <label class="mb-0 theme-switch-toggle-label theme-switch-toggle-light" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch to light theme">
                <span class="fas fa-sun"></span>
              </label>
              <label class="mb-0 py-2 theme-switch-toggle-light d-lg-none" for="themeControlToggle">
                <span>Switch to light theme</span>
              </label>
              <label class="mb-0 theme-switch-toggle-label theme-switch-toggle-dark" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch to dark theme">
                <span class="fas fa-moon"></span>
              </label>
              <label class="mb-0 py-2 theme-switch-toggle-dark d-lg-none" for="themeControlToggle">
                <span>Switch to dark theme</span>
            </div>
          </li>-->
          {#if userToken}
            <li class="nav-item dropdown">
              <!--<a class="nav-link dropdown-toggle" id="navbarDropdownLogin" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">로그인</a>-->
              <a class="nav-link fs-0" type="button" on:click={clickLogout}>로그아웃</a>
            </li>
          {:else}
            <li class="nav-item dropdown">
              <!--<a class="nav-link dropdown-toggle" id="navbarDropdownLogin" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">로그인</a>-->
              <a class="nav-link fs-0" id="navbarDropdownLogin" href="/login">로그인</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-end dropdown-menu-card" aria-labelledby="navbarDropdownLogin">
                <div class="card shadow-none navbar-card-login">
                  <div class="card-body fs--1 p-4 fw-normal">
                    <div class="row text-start justify-content-between align-items-center mb-2">
                      <div class="col-auto">
                        <h5 class="mb-0">Log in</h5>
                      </div>
                      <div class="col-auto">
                        <p class="fs--1 text-600 mb-0">or <a href="/">Create an account</a></p>
                      </div>
                    </div>
                    <form>
                      <div class="mb-3"><input class="form-control" type="email" placeholder="Email address"/></div>
                      <div class="mb-3"><input class="form-control" type="password" placeholder="Password"/></div>
                      <div class="row flex-between-center">
                        <div class="col-auto">
                          <div class="form-check mb-0"><input class="form-check-input" type="checkbox" id="modal-checkbox"/><label class="form-check-label mb-0" for="modal-checkbox">Remember me</label></div>
                        </div>
                        <div class="col-auto"><a class="fs--1" href="/">Forgot Password?</a></div>
                      </div>
                      <div class="mb-3">
                        <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Log in</button>
                      </div>
                    </form>
                    <div class="position-relative mt-4">
                      <hr/>
                      <div class="divider-content-center">or log in with</div>
                    </div>
                    <div class="row g-2 mt-2">
                      <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
                      <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item">
              <!--<a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">회원가입</a>-->
              <a class="nav-link fs-0" href="/member/register">회원가입</a>
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-4">
          <div class="row text-start justify-content-between align-items-center mb-2">
            <div class="col-auto">
              <h5 id="modalLabel">Register</h5>
            </div>
            <div class="col-auto">
              <p class="fs--1 text-600 mb-0">Have an account? <a href="/">Login</a></p>
            </div>
          </div>
          <form>
            <div class="mb-3"><input class="form-control" type="text" autocomplete="on" placeholder="Name"/></div>
            <div class="mb-3"><input class="form-control" type="email" autocomplete="on" placeholder="Email address"/></div>
            <div class="row gx-2">
              <div class="mb-3 col-sm-6"><input class="form-control" type="password" autocomplete="on" placeholder="Password"/></div>
              <div class="mb-3 col-sm-6"><input class="form-control" type="password" autocomplete="on" placeholder="Confirm Password"/></div>
            </div>
            <div class="form-check"><input class="form-check-input" type="checkbox" id="modal-register-checkbox"/><label class="form-label" for="modal-register-checkbox">I accept the <a href="#">terms </a>and <a href="#">privacy policy</a></label></div>
            <div class="mb-3">
              <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Register</button>
            </div>
          </form>
          <div class="position-relative mt-4">
            <hr/>
            <div class="divider-content-center">or register with</div>
          </div>
          <div class="row g-2 mt-2">
            <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
            <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================-->
  <!-- <section> begin ============================-->
  <section class="py-0 overflow-hidden" id="banner" data-bs-theme="light">
    <div class="bg-holder overlay" style="background-image:url(assets/img/generic/bg-1.jpg);background-position: center bottom;"></div>
    <!--/.bg-holder-->
    <div class="container">
      <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <div class="col-md-11 col-lg-8 col-xl-4 pb-7 pb-xl-9 text-center text-xl-start">
          <!--<a class="btn btn-outline-danger mb-4 fs&#45;&#45;1 border-2 rounded-pill" href="#!"><span class="me-2" role="img" aria-label="Gift">🎁</span>Become a pro</a>-->
          <h1 class="text-white fw-light">한영넉스
            <span class="typed-text fw-bold" data-typed-text='["AI LAB", "IOT","OCR","ANALYSIS", "PREDICTION"]'></span><br/>문래연구소
          </h1>
          <p class="lead text-white opacity-75">온도, 센서, 자동제어 계측</p>
          <!--<a class="btn btn-outline-light border-2 rounded-pill btn-lg mt-4 fs-0 py-2" href="#">
            <span class="fas fa-play ms-2" data-fa-transform="shrink-6 down-1"></span>
          </a>-->
        </div>
        <div class="col-xl-7 offset-xl-1 align-self-end mt-4 mt-xl-0">
          <span class="img-landing-banner rounded" href="/">
            <img class="img-fluid" src="../assets/img/generic/hyniot_dashboard.png" alt=""/>
          </span>
        </div>
        <!--<div class="col-xl-7 offset-xl-1 align-self-end mt-4 mt-xl-0"><a class="img-landing-banner rounded" href="../index.html"><img class="img-fluid" src="../assets/img/generic/dashboard-alt.jpg" alt="" /></a></div>-->
      </div>
    </div><!-- end of .container-->
  </section><!-- <section> close ============================-->
  <!-- ============================================-->


  <!-- ============================================-->
  <!-- <section> begin ============================-->
  <section>
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-lg-8 col-xl-7 col-xxl-6">
          <h1 class="fs-2 fs-sm-4 fs-md-5">온도/습도 모니터링</h1>
          <p class="lead">IOT, Mobius, MQTT, Arduino</p>
        </div>
      </div>
      <div class="row flex-center mt-7">
        <div class="col-md col-lg-5 col-xl-4 ps-lg-6"><img class="img-fluid px-6 px-md-0" src="../assets/img/icons/spot-illustrations/48.png" alt=""/></div>
        <div class="col-md col-lg-5 col-xl-4 mt-4 mt-md-0">
          <h5 class="text-success"><span class="far fa-paper-plane me-2"></span>대시보드</h5>
          <h3>온도, 습도</h3>
          <p>문래연구소에 설치된 온도, 습도 모니터링 및 제어</p>
        </div>
      </div>
    </div><!-- end of .container-->
  </section><!-- <section> close ============================-->
  <!-- ============================================-->


  <!---->

  <section class="bg-dark pt-8 pb-4" data-bs-theme="light">
    <div class="container">
      <!--<div class="position-absolute btn-back-to-top bg-dark">
        <a class="text-600" href="#banner" data-bs-offset-top="0"><span class="fas fa-chevron-up" data-fa-transform="rotate-45"></span></a>
      </div>-->
      <div class="row">
        <div class="col-lg-4">
          <h5 class="text-uppercase text-white opacity-85 mb-3">한영넉스 AI 문래 연구소</h5>
          <p class="text-600">한영넉스 문래 AI 연구소는 2021년 설립되어
          온도, 센서 및 자동제어 계측 분야를 연구하고 있습니다.</p>
          <div class="icon-group mt-4 display-none">
            <a class="icon-item bg-white text-facebook"><span class="fab fa-facebook-f"></span></a>
            <a class="icon-item bg-white text-twitter"><span class="fab fa-twitter"></span></a>
            <a class="icon-item bg-white text-google-plus"><span class="fab fa-google-plus-g"></span></a>
            <a class="icon-item bg-white text-linkedin"><span class="fab fa-linkedin-in"></span></a>
            <a class="icon-item bg-white"><span class="fab fa-medium-m"></span></a>
          </div>
        </div>
        <div class="col ps-lg-6 ps-xl-8">
          <div class="row mt-5 mt-lg-0">
            <div class="col-6 col-md-3 display-none">
              <h5 class="text-uppercase text-white opacity-85 mb-3">Company</h5>
              <ul class="list-unstyled">
                <li class="mb-1"><a class="link-600">About</a></li>
                <li class="mb-1"><a class="link-600">Contact</a></li>
                <li class="mb-1"><a class="link-600">Careers</a></li>
                <li class="mb-1"><a class="link-600">Blog</a></li>
                <li class="mb-1"><a class="link-600">Terms</a></li>
                <li class="mb-1"><a class="link-600">Privacy</a></li>
                <li><a class="link-600" href="#!">Imprint</a></li>
              </ul>
            </div>
            <div class="col-6 col-md-3 display-none">
              <h5 class="text-uppercase text-white opacity-85 mb-3">Product</h5>
              <ul class="list-unstyled">
                <li class="mb-1"><a class="link-600">Features</a></li>
                <li class="mb-1"><a class="link-600">Roadmap</a></li>
                <li class="mb-1"><a class="link-600">Changelog</a></li>
                <li class="mb-1"><a class="link-600">Pricing</a></li>
                <li class="mb-1"><a class="link-600">Docs</a></li>
                <li class="mb-1"><a class="link-600">System Status</a></li>
                <li class="mb-1"><a class="link-600">Agencies</a></li>
                <li class="mb-1"><a class="link-600">Enterprise</a></li>
              </ul>
            </div>
            <div class="col mt-5 mt-md-0">
              <h5 class="text-uppercase text-white opacity-85 mb-3">한영넉스 주소</h5>
              <ul class="list-unstyled">
                <li>
                  <h5 class="fs-0 mb-0"><a class="link-600">본사</a></h5>
                  <p class="text-600 opacity-50">(22121) 인천광역시 미추홀구 길파로 71번길 28</p>
                </li>
                <li>
                  <h5 class="fs-0 mb-0"><a class="link-600">문래 AI 연구소</a></h5>
                  <p class="text-600 opacity-50">(07290) 서울 영등포구 도림로125길 29</p>
                </li>
                <li>
                  <h5 class="fs-0 mb-0"><a class="link-600">대구 영업소</a></h5>
                  <p class="text-600 opacity-50">(41504) 대구광역시 북구 유통단지로 103 건축자재관 1층 1호</p>
                </li>
                <li>
                  <h5 class="fs-0 mb-0"><a class="link-600">부산 영업소</a></h5>
                  <p class="text-600 opacity-50">(46977) 부산광역시 사상구 괘감로37 사상산업용품 유통상가 2동 121호</p>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div><!-- end of .container-->
  </section><!-- <section> close ============================-->


  <!-- ============================================-->
  <!-- <section> begin ============================-->
  <section class="py-0 bg-dark" data-bs-theme="light">
    <div>
      <hr class="my-0 text-600 opacity-25"/>
      <div class="container py-3">
        <div class="row justify-content-between fs--1">
          <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 text-600 opacity-85">
              <a class="text-white opacity-85" href="./etc/agreement">이용약관</a> 
              &nbsp;|&nbsp;
              <a class="text-white opacity-85" href="./etc/privacy">개인정보처리방침</a> 
            </p>
          </div>
          <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 text-600 opacity-85">Copyright &copy HANYOUNG NUX. All Rights reserved.
              <span class="d-none d-sm-inline-block">| </span><br class="d-sm-none"/> 2023
              <a class="text-white opacity-85" href="https://hanyoungnux.co.kr/">Hanyoungnux</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ============================================-->

  <div class="modal fade" id="authentication-modal" tabindex="-1" role="dialog" aria-labelledby="authentication-modal-label" aria-hidden="true">
    <div class="modal-dialog mt-6" role="document">
      <div class="modal-content border-0">
        <div class="modal-header px-5 position-relative modal-shape-header bg-shape">
          <div class="position-relative z-1" data-bs-theme="light">
            <h4 class="mb-0 text-white" id="authentication-modal-label">Register</h4>
            <p class="fs--1 mb-0 text-white">Please create your free Falcon account</p>
          </div>
          <button class="btn-close btn-close-white position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body py-4 px-5">
          <form>
            <div class="mb-3"><label class="form-label" for="modal-auth-name">Name</label><input class="form-control" type="text" autocomplete="on" id="modal-auth-name"/></div>
            <div class="mb-3"><label class="form-label" for="modal-auth-email">Email address</label><input class="form-control" type="email" autocomplete="on" id="modal-auth-email"/></div>
            <div class="row gx-2">
              <div class="mb-3 col-sm-6"><label class="form-label" for="modal-auth-password">Password</label><input class="form-control" type="password" autocomplete="on" id="modal-auth-password"/></div>
              <div class="mb-3 col-sm-6"><label class="form-label" for="modal-auth-confirm-password">Confirm Password</label><input class="form-control" type="password" autocomplete="on" id="modal-auth-confirm-password"/></div>
            </div>
            <div class="form-check"><input class="form-check-input" type="checkbox" id="modal-auth-register-checkbox"/><label class="form-label" for="modal-auth-register-checkbox">I accept the <a href="#">terms </a>and <a href="#">privacy policy</a></label></div>
            <div class="mb-3">
              <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Register</button>
            </div>
          </form>
          <div class="position-relative mt-5">
            <hr/>
            <div class="divider-content-center">or register with</div>
          </div>
          <div class="row g-2 mt-2">
            <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
            <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main><!-- ===============================================-->


<style>
    .display-none {
        display: none;
    }
</style>