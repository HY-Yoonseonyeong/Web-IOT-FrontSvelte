<script>
    import NavSide from "../../component/nav/NavSide.svelte"
    import NavTop from "../../component/nav/NavTop.svelte";
    import Footer from "../../component/nav/Footer.svelte";
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";
    import {getHyToken, checkTokenThenLogin} from "$lib/hyToken.js";

    let userName = "", userNick = "", userEmail = ""

    onMount(() => {
        checkTokenThenLogin()
        getUserInfo()
    })

    const onChangePassword = (e) => {
        const formData = new FormData(e.target);
        const params = {};
        for (let field of formData) {
            const [key, value] = field;
            params[key] = value;

            if (!value) {
                alert("입력 정보가 잘못되었습니다.")
                return
            }
        }

        changeUserPassword(e)
    }


    const getUserInfo = async () => {
        try {
            const response = await fetch(`${PUBLIC_API_URL}/users/info`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': localStorage.getItem('hynuxiot-token')
                }
            })
            const jsonData = await response.json()

            userName = jsonData.name
            userNick = jsonData.nick
            userEmail = jsonData.email

        } catch (e) {
            userName = ""
            userNick = ""
            userEmail = ""
        }
    }

    //
    const changeUserPassword = async (e) => {
        const formData = new FormData(e.target);
        const params = {};
        for (let field of formData) {
            const [key, value] = field;
            params[key] = value;

            if (!value) {
                alert("입력 정보가 잘못되었습니다.")
                return
            }
        }

        // {{local_api_url}}/users/:user_no/password
        const response = await fetch(`${PUBLIC_API_URL}/users/user/password`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": getHyToken(),
                },
                body: JSON.stringify(params)
            })

        if (!response.ok) {
            alert("조회 에러")
            return
        }

        const jsonData = await response.json()

        if (jsonData.error) {
            alert(jsonData.msg)
        } else {
            alert(jsonData.msg)
        }

    }

    const leaveMember = async () => {

    }


    const onLeaveMember = async (e) => {

    }


    const meCheck = async () => {
        console.log(localStorage.getItem('hynuxiot-token'))

        const response = await fetch(`${PUBLIC_API_URL}/users/mec`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('hynuxiot-token')
            }
        })

        if (!response.ok) {
            alert("조회 에러")
            return
        }

        const jsonData = await response.json()

        if (jsonData.error) {
            alert(jsonData.msg)
        } else {
            alert(jsonData.msg)
        }
    }

</script>

<svelte:head>
  <title>회원 정보 설정 | HYNUX-IOT</title>
  <meta name="HYNUX-IOT" content="HYNUX-IOT"/>
</svelte:head>


<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide/>
    <div class="content">
      <NavTop/>
      <div class="row">
        <div class="col-12">
          <div class="card mb-3 btn-reveal-trigger">
            <div class="card-header position-relative min-vh-25 mb-8">
              <div class="cover-image">
                <div class="bg-holder rounded-3 rounded-bottom-0" style="background-image:url(../../assets/img/generic/4.jpg);"></div>
                <!--/.bg-holder-->
                <input class="d-none" id="upload-cover-image" type="file"/><label class="cover-image-file-input" for="upload-cover-image"><span class="fas fa-camera me-2"></span><span>Change cover photo</span></label>
              </div>
              <div class="avatar avatar-5xl avatar-profile shadow-sm img-thumbnail rounded-circle">
                <div class="h-100 w-100 rounded-circle overflow-hidden position-relative">
                  <img src="../../assets/img/team/2.jpg" width="200" alt="" data-dz-thumbnail="data-dz-thumbnail"/>
                  <input class="d-none" id="profile-image" type="file"/>
                  <label class="mb-0 overlay-icon d-flex flex-center" for="profile-image">
                    <span class="bg-holder overlay overlay-0"></span>
                    <span class="z-1 text-white dark__text-white text-center fs--1">
                      <span class="fas fa-camera"></span>
                      <span class="d-block">Update</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-0">
        <div class="col-lg-8 pe-lg-2">
          <div class="card mb-3">
            <div class="card-header">
              <h5 class="mb-0">프로필 설정</h5>
            </div>
            <div class="card-body bg-light">
              <form class="row g-3">
                <div class="col-lg-6"><label class="form-label" for="user-name">이름</label><input class="form-control" id="user-name" type="text" value="{userName}" disabled/></div>
                <div class="col-lg-6"><label class="form-label" for="user-nick">닉네임</label><input class="form-control" id="user-nick" type="text" value="{userNick}" disabled/></div>
                <div class="col-lg-6"><label class="form-label" for="user-email">이메일 주소</label><input class="form-control" id="user-email" type="text" value="{userEmail}" disabled/></div>
                <div class="col-lg-6"><label class="form-label" for="user-hp">연락처</label><input class="form-control" id="user-hp" type="text" value="" disabled/></div>
                <div class="col-lg-12"><label class="form-label" for="email3"></label><input class="form-control" id="email3" type="text" value="" disabled/></div>
                <div class="col-12 d-flex justify-content-end">
                  <button class="btn btn-primary" type="submit" disabled>변경</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-lg-4 ps-lg-2">
          <div class="sticky-sidebar">
            <div class="card mb-3">
              <div class="card-header">
                <h5 class="mb-0">비밀번호 변경</h5>
              </div>
              <div class="card-body bg-light">
                <form on:submit|preventDefault={onChangePassword}>
                  <div class="mb-3">
                    <label class="form-label" for="old-password">현재 비밀번호</label>
                    <input class="form-control" id="old-password" name="old_password" type="password"/>
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="new-password">신규 비밀번호</label>
                    <input class="form-control" id="new-password" name="new_password" type="password"/>
                  </div>
                  <div class="mb-3">
                    <label class="form-label" for="confirm-password">신규 비밀번호 확인</label>
                    <input class="form-control" id="confirm-password" name="new_password_confirm" type="password"/>
                  </div>
                  <button class="btn btn-primary d-block w-100" type="submit" name="submit">비밀번호 변경</button>
                </form>
              </div>
            </div>
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">회원 탈퇴</h5>
              </div>
              <div class="card-body bg-light">
                <h5 class="fs-0"></h5>
                <p class="fs--1">한번 탈퇴한 계정은 복구가 불가능합니다.</p>
                <a class="btn btn-falcon-danger d-block">회원 탈퇴</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
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
              <div class="form-check"><input class="form-check-input" type="checkbox" id="modal-auth-register-checkbox"/><label class="form-label" for="modal-auth-register-checkbox">I accept the
                <a>terms </a>and <a>privacy policy</a></label></div>
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
  </div>
</main>
<!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->


