<script>
    import '../../../scss/theme.scss'
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'
    import {goto} from "$app/navigation";

    onMount(() => {
    })

    const onsubmit = (e) => {
        const formData = new FormData(e.target);
        const data = {};

        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        let userEmail = formData.get('email')

        const fetchData = (async () => {
            const response = await fetch(`${PUBLIC_API_URL}/users/email?userEmail=${userEmail}`);

            if (!response.ok) //
                throw new Error(response.statusText);

            const fetchData = await response.json();

            if (fetchData.error) {
                alert(fetchData.userEmail)
            } else {
                await goto(`./confirmMail?email=${fetchData.userEmail}`)
            }
        })()
    }
</script>

<svelte:head>
  <title>비빌번호 재설정 | HYNUX-IOT</title>
  <meta name="description" content="HYNUX-IOT"/>
</svelte:head>

<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->
<main class="main" id="top">
  <div class="container" data-layout="container">
    <div class="row flex-center min-vh-100 py-6 text-center">
      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <a class="d-flex flex-center mb-4" href="./">
          <span class="font-sans-serif fw-bolder fs-5 d-inline-block">HYNUX-IOT</span>
        </a>
        <div class="card">
          <div class="card-body p-4 p-sm-5">
            <h5 class="mb-0">비밀번호 재설정</h5>
            <small>이메일 주소로 비밀번호 재설정 링크를 전송</small>
            <form class="mt-4" on:submit|preventDefault={onsubmit}>
              <input class="form-control" type="email" name="email" placeholder="이메일 주소"/>
              <div class="mb-3"></div>
              <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">비밀번호 재설정</button>
            </form>
            <!--<a class="fs&#45;&#45;1 text-600" href="#!">I can't recover my account using this page<span class="d-inline-block ms-1">&rarr;</span></a>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</main><!-- ===============================================-->

<!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->