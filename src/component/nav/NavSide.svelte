<script>
    import ModalLogout from "../../component/modal/ModalLogout.svelte";
    import {onMount} from "svelte";
    import {page} from '$app/stores';

    let path;

    function getPath(currentPath) {
        path = currentPath;
    }

    console.log($page.url.pathname)

    onMount(() => {
        console.log(page)
    })

    const noService = () => {
        alert("준비중입니다.")
    }

</script>

<ModalLogout/>

<nav class="navbar navbar-light navbar-vertical navbar-expand-xl">
  <div class="d-flex align-items-center">
    <div class="toggle-icon-wrapper">
      <button class="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Toggle Navigation">
        <span class="navbar-toggle-icon"><span class="toggle-line"></span></span>
      </button>
    </div>
    <a class="navbar-brand" href="/">
      <div class="d-flex align-items-center py-3">
        <span class="font-sans-serif">HYNUX-IOT</span>
      </div>
    </a>
  </div>
  <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
    <div class="navbar-vertical-content scrollbar">
      <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
        <li class="nav-item">
          <a class="nav-link dropdown-indicator" href="#dashboard" role="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="dashboard">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-chart-pie"></span></span>
              <span class="nav-link-text ps-1">대시보드</span>
            </div>
          </a>
          <ul class="nav collapse show" id="dashboard">
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === '/dashboardMobius'} href="../dashboardMobius">
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">Mobius</span>
                </div>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === '/dashboard'} href="../dashboard">
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">온/습도 대시보드</span>
                </div>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">디바이스</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div>
          <a class="nav-link" class:active={$page.url.pathname === '/aelist'} href="../aelist">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-calendar-alt"></span></span>
              <span class="nav-link-text ps-1">디바이스 AE 조회</span>
            </div>
          </a>
          <a class="nav-link" class:active={$page.url.pathname === '/devicelist'} href="../devicelist">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-tablet"></span></span>
              <span class="nav-link-text ps-1">디바이스 관리</span>
            </div>
          </a>
          <a class="nav-link" class:active={$page.url.pathname === '/temphum'} href="../temphum">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-fire"></span></span>
              <span class="nav-link-text ps-1">온습도</span>
            </div>
          </a>
          <a class="nav-link" class:active={$page.url.pathname === '/mobiusAE'} href="../mobiusAE">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-calendar-alt"></span></span>
              <span class="nav-link-text ps-1">모비우스 AE</span>
            </div>
          </a>
          <a class="nav-link" class:active={$page.url.pathname === '/mobiusdevice'} href="../mobiusdevice">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-tablet"></span></span>
              <span class="nav-link-text ps-1">모비우스 디바이스</span>
            </div>
          </a>
        </li>
        <li class="nav-item">
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">데이터 조회</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div>
          <a class="nav-link" class:active={$page.url.pathname === '/kolas/history'} href="../kolas/history">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-calendar-alt"></span></span>
              <span class="nav-link-text ps-1">기간 조회</span>
            </div>
          </a>
          <a class="nav-link" class:active={$page.url.pathname === '/kolas/report'} href="../kolas/report">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-calendar-alt"></span></span>
              <span class="nav-link-text ps-1">리포트 생성</span>
            </div>
          </a>
          <!--<a class="nav-link" class:active={$page.url.pathname === '/kolas/filelist'} href="../kolas/filelist">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-tablet"></span></span>
              <span class="nav-link-text ps-1">파일 리스트</span>
            </div>
          </a>-->
        </li>
        <li class="nav-item display-none">
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">교정센터</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div>
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-cog"></span></span>
              <span class="nav-link-text ps-1">교정 접수</span>
            </div>
          </a>
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-sign-out-alt"></span></span>
              <span class="nav-link-text ps-1">교정접수 관리</span>
            </div>
          </a>
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-sign-out-alt"></span></span>
              <span class="nav-link-text ps-1">장치 교정</span>
            </div>
          </a>
        </li>
        <li class="nav-item display-none">
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">교정센터</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div>
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-cog"></span></span>
              <span class="nav-link-text ps-1">교정센터 디바이스</span>
            </div>
          </a>
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-sign-out-alt"></span></span>
              <span class="nav-link-text ps-1">리포트</span>
            </div>
          </a>
        </li>
        <!-- 기능 테스트-->
        <li class="nav-item display-none">
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">기능테스트</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div>
          <a class="nav-link" class:active={$page.url.pathname === '/funcTest/csv'} href="../funcTest/csv">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-cog"></span></span>
              <span class="nav-link-text ps-1">다운로드 테스트</span>
            </div>
          </a>
          <a class="nav-link" class:active={$page.url.pathname === '/funcTest/aealias'} href="../funcTest/aealias">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-cog"></span></span>
              <span class="nav-link-text ps-1">기기 별칭 변경</span>
            </div>
          </a>
        </li>
        <li class="nav-item">
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">회원</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div>
          <a class="nav-link" class:active={$page.url.pathname === '/usersetting'} href="../usersetting">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-cog"></span></span>
              <span class="nav-link-text ps-1">설정</span>
            </div>
          </a>
          <a class="nav-link" role="button" data-bs-toggle="modal" data-bs-target="#modal-logout">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-sign-out-alt"></span></span>
              <span class="nav-link-text ps-1">로그아웃</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style>
    .display-none {
        display: none;
    }
</style>