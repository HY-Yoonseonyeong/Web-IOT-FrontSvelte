<script>
    import NavTop from "../../../component/nav/NavTop.svelte";
    import NavSide from "../../../component/nav/NavSide.svelte";
    import Footer from "../../../component/nav/Footer.svelte";
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";
    import moment from "moment";
    import {checkTokenThenLogin} from "$lib/hyToken.js";

    let _fileList = new Array()

    onMount(async () => {
        await checkTokenThenLogin()
        await getReportFileList()
    })

    // const
    const getReportFileList = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/file/list`, {headers: {"Content-Type": "application/json"}})
        const jsonData = await response.json()
        _fileList = jsonData
    }

    const clickDownload = async (fileKey, file_name) => {
        const response = await fetch(`${PUBLIC_API_URL}/file/${fileKey}`, {
            headers: {"Content-Type": "application/json"}
        })

        let data2 = await response.blob()

        var blob = new Blob([data2], {type: 'text/csv;charset=utf-8;'});

        var url = window.URL || window.webkitURL;
        let link = url.createObjectURL(blob);

        // generate anchor tag, click it for download and then remove it again

        let a = document.createElement("a");
        a.setAttribute("download", `${file_name}`);
        a.setAttribute("href", link);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    /**
     * 파일 다운로드 이벤트
     */
    const onClickDownload = (fileKey) => {

    }

</script>

<svelte:head>
  <title>Kolas 파일 | HYNUX-IOT</title>
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
                  <h6 class="mb-0">검색</h6>
                </div>
                <div class="col-auto">
                  <form>
                    <div class="input-group input-search-width">
                      <input class="form-control form-control-sm shadow-none search" type="search" placeholder="검색 제목 입력" aria-label="search"/>
                      <button class="btn btn-sm btn-outline-secondary border-300 hover-border-secondary"><span class="fa fa-search fs--1"></span></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive scrollbar">
              <table class="table table-sm mb-0 fs--1 table-view-tickets">
                <thead class="text-800 bg-light">
                <tr>
                  <th class="sort align-middle ps-2">날짜/시간</th>
                  <th class="sort align-middle" >제목</th>
                  <th class="sort align-middle">파일명</th>
                  <th class="sort align-middle" style="min-width: 80px">파일 타입</th>
                  <th class="sort align-middle">상태</th>
                  <th class="sort align-middle">다운로드</th>
                </tr>
                </thead>
                <tbody class="list" id="table-ticket-body">
                {#each _fileList as row, index}
                  <tr>
                    <td class="align-middle client white-space-nowrap pe-3 pe-xxl-4 ps-2">
                      <div class="d-flex align-items-center gap-2 position-relative">
                        <h6 class="mb-0 text-700">{moment(row.datetime).format("YYYY-MM-DD HH:mm:ss")}</h6>
                      </div>
                    </td>
                    <td class="align-middle subject py-2 pe-4 white-space-nowrap">온습도 데이터</td>
                    <td class="align-middle subject py-2 pe-4 white-space-nowrap">{row.file_name}</td>
                    <td class="align-middle subject py-2 pe-4 white-space-nowrap">CSV</td>
                    <td class="align-middle status fs-0 pe-4 white-space-nowrap">
                      <small class="badge rounded badge-subtle-success false">가능</small>
                    </td>
                    <td class="align-middle agent">
                      <button class="btn btn-falcon-default btn-sm mx-2" type="button" on:click={()=>clickDownload(row.file_key, row.file_name)}>
                        <span class="fas fa-download" data-fa-transform="shrink-3"></span>
                        <span class="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">다운로드</span>
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
          <div class="card-footer"  style="display: none">
            <div class="d-flex justify-content-center">
              <button class="btn btn-sm btn-falcon-default me-1" type="button" title="Previous" data-list-pagination="prev"><span class="fas fa-chevron-left"></span></button>
              <ul class="pagination mb-0">
                <li class="active">
                  <button class="page" type="button" data-i="1" data-page="11">1</button>
                </li>
              </ul>
              <ul class="pagination mb-0">
                <li>
                  <button class="page" type="button" data-i="1" data-page="11">2</button>
                </li>
              </ul>
              <ul class="pagination mb-0">
                <li>
                  <button class="page" type="button" data-i="1" data-page="11">3</button>
                </li>
              </ul>
              <ul class="pagination mb-0">
                <li>
                  <button class="page" type="button" data-i="1" data-page="11">4</button>
                </li>
              </ul>
              <ul class="pagination mb-0">
                <li>
                  <button class="page" type="button" data-i="1" data-page="11">5</button>
                </li>
              </ul>
              <button class="btn btn-sm btn-falcon-default ms-1" type="button" title="Next" data-list-pagination="next">
                <span class="fas fa-chevron-right"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--footer-->
      <Footer/>
    </div>
  </div>
</main>


