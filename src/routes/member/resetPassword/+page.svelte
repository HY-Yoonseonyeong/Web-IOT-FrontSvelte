<script>
    import '../../../scss/theme.scss'
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'
    import {goto} from "$app/navigation";

    onMount(() => {
    })

    // 유효 링크인지 확인
    //
    const onsubmit = (e) => {
        const formData = new FormData(e.target);
        const data = {};

        for (let field of formData) {
            const [key, value] = field;
            data[key] = value;
        }

        let userEmail = formData.get('email')

        const fetchData = (async () => {
            // 비밀번호 리셋
            const response = await fetch(`${PUBLIC_API_URL}/users/reset_pw`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) //
                throw new Error(response.statusText);

            const fetchData = await response.json();

            if (fetchData.error) {
                alert(fetchData.userEmail)
            } else {
                goto('./confirmMail?email=test@test')
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
    <div class="row flex-center min-vh-100 py-6">
      <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <a class="d-flex flex-center mb-4" href="./../">
          <span class="font-sans-serif fw-bolder fs-5 d-inline-block">HYNUX-IOT</span>
        </a>
        <div class="card">
          <div class="card-body p-4 p-sm-5">
            <h5 class="text-center">변경 비밀번호 입력</h5>
            <form class="mt-4" on:submit|preventDefault={onsubmit}>
              <div class="mb-3"><label class="form-label"></label><input class="form-control" type="password" name="password1" placeholder="비밀번호"/></div>
              <div class="mb-3"><input class="form-control" type="password" name="password_confirm" placeholder="비밀번호 확인"/></div>
              <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">비밀번호 변경</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</main><!-- ===============================================-->

<!-- ===============================================-->
<!--    End of Main Content-->
<!-- ===============================================-->