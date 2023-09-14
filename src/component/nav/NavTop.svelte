<script>
    import ModalLogout from "../../component/modal/ModalLogout.svelte";
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";
    import {goto} from "$app/navigation";

    let userChar = "H"

    onMount(() => {
        queryUserName().then((data) => {
            if (data.username) {
                let split = Array.from(data.username);
                if (split.length > 0) {
                    userChar = split[0]
                }
            }
        })
    })

    const queryUserName = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/users/name`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('hynuxiot-token')
            }
        })
        const fetchData = await response.json()
        return fetchData;
    }

    const onClickSetting = async () => {
        await goto('../../usersetting')
    }

</script>

<nav class="navbar navbar-light navbar-glass navbar-top navbar-expand">
  <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse"
          aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation">
    <span class="navbar-toggle-icon"><span class="toggle-line"></span></span>
  </button>
  <a class="navbar-brand me-1 me-sm-3" href="/">
    <div class="d-flex align-items-center">
      <!--<img class="me-2" src="../assets/img/icons/spot-illustrations/falcon.png" alt="" width="40"/>-->
      <span class="font-sans-serif">HYNUX-IOT</span></div>
  </a>
  <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
    <li class="nav-item dropdown" style="display:none">
      <a class="nav-link notification-indicator notification-indicator-primary px-0 fa-icon-wait"
         id="navbarDropdownNotification" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false" data-hide-on-body-scroll="data-hide-on-body-scroll">
        <span class="fas fa-bell" data-fa-transform="shrink-6" style="font-size: 33px;"></span>
      </a>
      <div class="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end dropdown-menu-card dropdown-menu-notification dropdown-caret-bg"
           aria-labelledby="navbarDropdownNotification">
        <div class="card card-notification shadow-none">
          <div class="card-header">
            <div class="row justify-content-between align-items-center">
              <div class="col-auto">
                <h6 class="card-header-title mb-0">Notifications</h6>
              </div>
              <div class="col-auto ps-0 ps-sm-3">
                <a class="card-link fw-normal" href="#">
                  Mark all as read</a></div>
            </div>
          </div>
          <div class="scrollbar-overlay display-none" style="max-height:19rem">
            <div class="list-group list-group-flush fw-normal fs--1">
              <div class="list-group-title border-bottom">NEW</div>
              <div class="list-group-item">
                <a class="notification notification-flush notification-unread" href="#">
                  <div class="notification-avatar">
                    <div class="avatar avatar-2xl me-3">
                      <img class="rounded-circle" src="../assets/img/team/1-thumb.png"
                           alt=""/>
                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1"><strong>Emma Watson</strong> replied to your comment
                      : "Hello world 😍"</p>
                    <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">💬</span>Just now</span>
                  </div>
                </a>
              </div>
              <div class="list-group-item">
                <a class="notification notification-flush notification-unread" href="#">
                  <div class="notification-avatar">
                    <div class="avatar avatar-2xl me-3">
                      <div class="avatar-name rounded-circle"><span>AB</span></div>
                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1"><strong>Albert Brooks</strong> reacted to <strong>Mia Khalifa's</strong> status</p>
                    <span class="notification-time"><span class="me-2 fab fa-gratipay text-danger"></span>9hr</span>
                  </div>
                </a>
              </div>
              <div class="list-group-title border-bottom">EARLIER</div>
              <div class="list-group-item">
                <a class="notification notification-flush" href="#">
                  <div class="notification-avatar">
                    <div class="avatar avatar-2xl me-3">
                      <img class="rounded-circle" src="../assets/img/icons/weather-sm.jpg" alt=""/>
                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1">The forecast today shows a low of 20&#8451; in
                      California. See today's weather.</p>
                    <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">🌤️</span>1d</span>
                  </div>
                </a>
              </div>
              <div class="list-group-item">
                <a class="border-bottom-0 notification-unread  notification notification-flush"
                   href="#">
                  <div class="notification-avatar">
                    <div class="avatar avatar-xl me-3">
                      <img class="rounded-circle" src="../assets/img/logos/oxford.png" alt=""/>
                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1"><strong>University of Oxford</strong> created an event : "Causal Inference Hilary 2019"</p>
                    <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">✌️</span>1w</span>
                  </div>
                </a>
              </div>
              <div class="list-group-item">
                <a class="border-bottom-0 notification notification-flush" href="#">
                  <div class="notification-avatar">
                    <div class="avatar avatar-xl me-3">
                      <img class="rounded-circle" src="../assets/img/team/10.jpg" alt=""/>
                    </div>
                  </div>
                  <div class="notification-body">
                    <p class="mb-1"><strong>James Cameron</strong> invited to join the group: United Nations International Children's Fund</p>
                    <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">🙋‍</span>2d</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="card-footer text-center border-top display-none">
            <a class="card-link d-block" href="/">View all</a></div>
        </div>
      </div>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link pe-0 ps-2" role="button"
         data-bs-toggle="dropdown" aria-haspopup="true"
         aria-expanded="false">
        <div class="avatar avatar-xl">
          <!--<img class="rounded-circle" src="../assets/img/team/3-thumb.png" alt=""/>-->
          <div class="rounded-circle name-alt"><span>{userChar}</span></div>
          <!--<div><span>test</span></div>-->
        </div>
      </a>
      <div class="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
        <div class="bg-white dark__bg-1000 rounded-2 py-2">
          <!--<a class="dropdown-item fw-bold text-warning" href="#!">
            <span class="fas fa-crown me-1"></span><span>Go Pro</span>
          </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#!">Set status</a>
          <a class="dropdown-item" href="/">Profile &amp; account</a>
          <a class="dropdown-item" href="#!">Feedback</a>
          <div class="dropdown-divider"></div>-->
          <a class="dropdown-item" on:click={onClickSetting}>설정</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-logout" role="button">로그아웃</a>
        </div>
      </div>
    </li>
  </ul>
</nav>
<ModalLogout/>

<style>
    .display-none {
        display: none;
    }

    .name-alt {
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #6b6d70;
        display: table;
    }

    .name-alt span {
        vertical-align: middle;
        display: table-cell;
        color: white;
        font-size: 1.1rem;
    }

</style>