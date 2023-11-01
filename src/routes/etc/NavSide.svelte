<script>
  import ModalLogout from "../../component/modal/ModalLogout.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let path;

  function getPath(currentPath) {
    path = currentPath;
  }

  console.log($page.url.pathname);

  onMount(() => {
    console.log(page);
  });

  const noService = () => {
    alert("준비중입니다.");
  };
</script>

<ModalLogout />

<nav class="navbar navbar-light navbar-vertical navbar-expand-xl">
  <div class="d-flex align-items-center">
    <div class="toggle-icon-wrapper">
      <button
        class="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Toggle Navigation"
      >
        <span class="navbar-toggle-icon"><span class="toggle-line" /></span>
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
          <a
            class="nav-link dropdown-indicator"
            href="#dashboard"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="dashboard"
          >
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"
                ><span class="fas fa-chart-pie" /></span
              >
              <span class="nav-link-text ps-1">이용약관</span>
            </div>
          </a>
          <ul class="nav collapse show" id="dashboard">
            <li class="nav-item">
              <a
                class="nav-link"
                class:active={$page.url.pathname === "/etc/agreement"}
                href="./agreement"
              >
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">2023.01.26 개정</span>
                </div>
              </a>
              <a
                class="nav-link"
                class:active={$page.url.pathname === "#"}
                href="#"
              >
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">item 2</span>
                </div>
              </a>
              <a
                class="nav-link"
                class:active={$page.url.pathname === "#"}
                href="#"
              >
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">item 3</span>
                </div>
              </a>
              <a
                class="nav-link"
                class:active={$page.url.pathname === "#"}
                href="#"
              >
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">item 4</span>
                </div>
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a
            class="nav-link dropdown-indicator"
            href="#dashboard"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="dashboard"
          >
            <div class="d-flex align-items-center">
              <span class="nav-link-icon"
                ><span class="fas fa-chart-pie" /></span
              >
              <span class="nav-link-text ps-1">개인정보처리방침</span>
            </div>
          </a>
          <ul class="nav collapse show" id="dashboard">
            <li class="nav-item">
              <a
                class="nav-link"
                class:active={$page.url.pathname === "/etc/privacy"}
                href="./privacy"
              >
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">2023.01.01 개정</span>
                </div>
              </a>
              <a
                class="nav-link"
                class:active={$page.url.pathname === "#"}
                href="#"
              >
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">item 2</span>
                </div>
              </a>
              <a
                class="nav-link"
                class:active={$page.url.pathname === "#"}
                href="#"
              >
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">item 3</span>
                </div>
              </a>
              <a
                class="nav-link"
                class:active={$page.url.pathname === "#"}
                href="#"
              >
                <div class="d-flex align-items-center">
                  <span class="nav-link-text ps-1">item 4</span>
                </div>
              </a>
            </li>
          </ul>
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
