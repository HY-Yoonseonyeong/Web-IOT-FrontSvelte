<script>
    import '../../../scss/theme.scss'
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'
    import {goto} from "$app/navigation";

    const urlParams = new URLSearchParams(window.location.search);
    const isBeta = urlParams.has('email');

    let userEmail = '';

    onMount(() => {
        console.log($page.path)
        console.log(window.location)

        userEmail = urlParams.get('email');
    })


    console.log("isBetat : ", isBeta)
    // alert(urlParams.get('email'))


    const onsubmit = (e) => {
        const formData = new FormData(e.target);
        const data = {};

        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
            console.log(field)
        }
        console.log(formData.get('email'))
        console.log("FindPasswrd Form")

        let userEmail = formData.get('email')

        const fetchData = (async () => {
            const response = await fetch(`${PUBLIC_API_URL}/users/email?userEmail=${userEmail}`);

            if (!response.ok) //
                throw new Error(response.statusText);

            const fetchData = await response.json();

            console.log(fetchData)

            if (fetchData.error) {
                alert(fetchData.userEmail)
            } else {
                alert(fetchData.userEmail)
                /*    goto('../../login')*/
            }
        })()

    }

    console.log("API_KEY : " + PUBLIC_API_URL)

</script>

<svelte:head>
  <title>이메일 확인 | HYNUX-IOT</title>
  <meta name="description" content="HYNUX-IOT"/>
</svelte:head>

<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <div class="row flex-center min-vh-100 py-6">
      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <a class="d-flex flex-center mb-4" href="./">
          <span class="font-sans-serif fw-bolder fs-5 d-inline-block">HYNUX-IOT</span>
        </a>
        <div class="card">
          <div class="card-body p-4 p-sm-5">
            <div class="text-center"><img class="d-block mx-auto mb-4" src="../../../assets/img/icons/spot-illustrations/16.png" alt="Email" width="100"/>
              <h4 class="mb-2">이메일을 확인해 주세요.</h4>
              <p>해당 이메일로 <strong>{userEmail}</strong> 비밀번호 변경 링크가 전송되었습니다. </p>
              <a class="btn btn-primary btn-sm mt-3" href="./../login">
                <span class="fas fa-chevron-left me-1" data-fa-transform="shrink-4 down-1"></span>로그인 돌아가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
<!-- ===============================================-->


<!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->