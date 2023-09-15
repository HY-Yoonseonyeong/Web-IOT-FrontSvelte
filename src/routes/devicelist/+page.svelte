<script>
    import NavSide from "../../component/nav/NavSide.svelte"
    import NavTop from "../../component/nav/NavTop.svelte";
    import Footer from "../../component/nav/Footer.svelte";
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";
    import {goto} from "$app/navigation";
    import {getHyToken, checkHyToken, checkTokenThenLogin} from "$lib/hyToken.js";

    let dataRows = [];
    let _rowCount = 0
    let _aei = ""
    let _addMessage = ""
    let _modal
    let _modalCancel

    onMount(() => {
        checkTokenThenLogin()
        getMyDeviceList()
    })

    const clickDeviceQuery = () => {
        console.log("clickDeviceQuery")
        onModalClose()
    }


    const onModalClose = () => {
        console.log("onModalClose")
    }

    const getMyDeviceList = async () => {
        try {
            const response = await fetch(`${PUBLIC_API_URL}/device/template?t_type=t1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": getHyToken()
                },
            });

            if (!response.ok) //
                throw new Error(response.statusText);

            const jsonData = await response.json();
            console.log(jsonData)

            dataRows = jsonData.rows
            _rowCount = dataRows.length

        } catch (err) {
            alert("조회 에러!")
        }
    }

    const onClickDeviceAdd = async () => {
        console.log(_aei)
        try {
            const response = await fetch(`${PUBLIC_API_URL}/device`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": getHyToken()
                },
                body: JSON.stringify({"aei": _aei})

            });

            if (!response.ok) //
                throw new Error(response.statusText);

            const jsonData = await response.json()

            console.log(jsonData)

            if (jsonData.errors) {
                _addMessage = jsonData.msg
            } else {
                alert(jsonData.msg)
                _modalCancel.click()
            }

        } catch (err) {
            alert("조회 에러!")
        }
    }

    const onClickDeviceModify = async (item) => {
        console.log("onClickDeviceModify")
        console.log(item.aei)
        _aei = item.aei

        // {{local_api_url}}/device/:aei/detail

        try {
            const response = await fetch(`${PUBLIC_API_URL}/device/${_aei}/detail`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": getHyToken()
                },
                body: JSON.stringify({"alias": "테스트"})
            });

            if (!response.ok) //
                throw new Error(response.statusText);

            const jsonData = await response.json()

            console.log(jsonData)

            if (jsonData.errors) {
                _addMessage = jsonData.msg
            } else {
                alert(jsonData.msg)
                // _modalCancel.click()
            }

        } catch (err) {
            alert("조회 에러!")
        }
    }



</script>

<svelte:head>
  <title>디바이스 리스트 | HYNUX-IOT</title>
  <meta name="HYNUX-IOT" content="HYNUX-IOT"/>
</svelte:head>

<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide/>
    <div class="content">
      <NavTop/>

      <div class="card mb-3">
        <div class="card" id="ticketsTable" data-list=''>
          <div class="card-header border-bottom border-200 px-0">
            <div class="d-lg-flex justify-content-between">
              <div class="row flex-between-center gy-2 px-x1">
                <div class="col-auto pe-0">
                  <h6 class="mb-0">조회건수 : <span> {_rowCount} 건</span></h6>
                </div>
              </div>
              <div class="border-bottom border-200 my-3"></div>
              <div class="d-flex align-items-center justify-content-between justify-content-lg-end px-x1">
                <div class="d-flex align-items-center" id="table-ticket-replace-element">
                  <button class="btn btn-falcon-default btn-sm" data-bs-toggle="modal" data-bs-target="#error-modal" type="button">
                    <span class="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">디바이스 추가</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive scrollbar">
              <table class="table table-sm mb-0 fs--1 table-view-tickets">
                <thead class="text-800 bg-light">
                <tr>
                  <th class=" align-middle ps-2">ID</th>
                  <th class=" align-middle">템플릿</th>
                  <th class=" align-middle ps-2" style="min-width: 100px">디바이스명</th>
                  <th class=" align-middle">타입</th>
                  <th class=" align-middle">IP</th>
                  <th class=" align-middle">Mac 주소</th>
                  <th class=" align-middle">수정</th>
                </tr>
                </thead>
                <tbody class="list" id="table-ticket-body">
                {#each dataRows as row}
                  <tr>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">{row.aei}</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">{row.t_type}</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">{row.alias}</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">온습도</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">127.0.0.1</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">52:EA:AB:CD:EE</td>
                    <td class="align-middle py-2 pe-4 white-space-nowrap">
                      <button class="btn btn-falcon-default btn-sm mx-2" data-bs-toggle="modal" data-bs-target="#error-modal" type="button"
                              on:click={()=>onClickDeviceModify(row)}>
                        <span class="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">디바이스 수정</span>
                      </button>
                    </td>
                  </tr>
                {/each}
                </tbody>
              </table>
              <div class="text-center d-none" id="tickets-table-fallback">
                <p class="fw-bold fs-1 mt-3">No ticket found</p>
              </div>
            </div>
          </div>
          <!--<Pagination pageNumber={testNumber}, pageInfo={pageInfo} bind:this={pagination}/>-->
        </div>
      </div>
      <Footer/>
    </div>
  </div>
</main>

<!--<button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#error-modal">Launch demo modal</button>-->
<div class="modal fade" id="error-modal" tabindex="-1" role="dialog" aria-hidden="true" bind:this={_modal}>
  <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 500px">
    <div class="modal-content position-relative">
      <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
        <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-0">
        <div class="rounded-top-3 py-3 ps-4 pe-6 bg-light">
          <h4 class="mb-1">디바이스 등록</h4>
        </div>
        <div class="p-4 pb-0">
          <form>
            <div class="mb-3">
              <label class="col-form-label" for="recipient-name1">디바이스 ID 입력:</label>
              <input class="form-control" id="recipient-name1" type="text" bind:value={_aei} placeholder="ID를 입력해 주세요."/>
            </div>
            <div class="mb-3">
              <label class="col-form-label" for="recipient-name2">리소스명(rn) 입력:</label>
              <input class="form-control" id="recipient-name2" type="text"/>
            </div>
            <div class="mb-3">
              <label class="col-form-label" for="recipient-name3">디바이스명:</label>
              <input class="form-control" id="recipient-name3" type="text"/>
            </div>
            <div class="mb-3">
              <label class="col-form-label" for="message-text">Message:</label>
              <textarea class="form-control" id="message-text">{_addMessage}</textarea>
            </div>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <!--<button class="btn btn-secondary" type="button" on:click={clickDeviceQuery}>조회</button>-->
        <button class="btn btn-secondary" type="button" on:click={onClickDeviceAdd}>등록</button>
        <button class="btn btn-secondary" type="button" on:click={onClickDeviceAdd}>수정</button>
        <button class="btn btn-secondary" type="button" on:click={onClickDeviceAdd}>삭제</button>
        <button class="btn btn-primary" type="button" data-bs-dismiss="modal" on:click={onModalClose} bind:this={_modalCancel}>닫기</button>
      </div>
    </div>
  </div>
</div>
