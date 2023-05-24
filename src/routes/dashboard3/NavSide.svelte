<script>
    import ModalLogout from "../../component/modal/ModalLogout.svelte";
    import {onMount} from "svelte";
    import {page} from '$app/stores';
    // import {page} from '$app/stores

    let path;

    function getPath(currentPath) {
        path = currentPath;
        // console.log(path);
    }

    // $: getPath($page.url.pathname);

    // console.log(page.url.pathname)

    // page.ur

    //page.subscribe(currentPage => console.log(currentPage));

    // easier
    /*console.log({ page: $page });
    console.log('page.params', $page.params);*/


    // console.log($page)

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
        <!--<img class="me-2" src="../assets/img/icons/spot-illustrations/falcon.png" alt="" width="40"/>-->
        <span class="font-sans-serif">HYNUX-IOT</span>
      </div>
    </a>
  </div>
  <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
    <div class="navbar-vertical-content scrollbar">
      <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
        <li class="nav-item">
          <!-- parent pages-->
          <a class="nav-link dropdown-indicator" href="#dashboard" role="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="dashboard">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-chart-pie"></span></span>
              <span class="nav-link-text ps-1">대시보드</span>
            </div>
          </a>
          <ul class="nav collapse show" id="dashboard">
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === '/dashboard2'} href="../dashboard2">
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">Mobius</span>
                </div>
              </a><!-- more inner pages-->
            </li>
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === '/dashboard'} href="../dashboard">
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">온/습도 대시보드</span>
                </div>
              </a><!-- more inner pages-->
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <!-- label-->
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">Device</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div><!-- parent pages-->
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-calendar-alt"></span></span>
              <span class="nav-link-text ps-1">Device Management</span>
            </div>
          </a><!-- parent pages-->
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-tablet"></span></span>
              <span class="nav-link-text ps-1">Devices</span>
            </div>
          </a><!-- parent pages-->
        </li>
        <li class="nav-item display-none">
          <!-- label-->
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">교정센터</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div><!-- parent pages-->
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-cog"></span></span>
              <span class="nav-link-text ps-1">교정 접수</span>
            </div>
          </a><!-- parent pages-->
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-sign-out-alt"></span></span>
              <span class="nav-link-text ps-1">교정접수 관리</span>
            </div>
          </a><!-- parent pages-->
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-sign-out-alt"></span></span>
              <span class="nav-link-text ps-1">장치 교정</span>
            </div>
          </a><!-- parent pages-->
        </li>
        <li class="nav-item">
          <!-- label-->
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">교정센터</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div><!-- parent pages-->
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-cog"></span></span>
              <span class="nav-link-text ps-1">교정센터 디바이스</span>
            </div>
          </a><!-- parent pages-->
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-sign-out-alt"></span></span>
              <span class="nav-link-text ps-1">리포트</span>
            </div>
          </a><!-- parent pages-->
        </li>
        <li class="nav-item">
          <!-- label-->
          <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
            <div class="col-auto navbar-vertical-label">회원</div>
            <div class="col ps-0">
              <hr class="mb-0 navbar-vertical-divider"/>
            </div>
          </div><!-- parent pages-->
          <a class="nav-link" on:click={noService} role="button">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-cog"></span></span>
              <span class="nav-link-text ps-1">설정</span>
            </div>
          </a><!-- parent pages-->
          <a class="nav-link" role="button" data-bs-toggle="modal" data-bs-target="#modal-logout">
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"><span class="fas fa-sign-out-alt"></span></span>
              <span class="nav-link-text ps-1">로그아웃</span>
            </div>
          </a><!-- parent pages-->
        </li>
      </ul>
    </div>
  </div>
</nav>

<!--로그아웃 모달-->
<!--<ModalLogout/>-->



<style>
    .display-none {
        display: none;
    }
</style>