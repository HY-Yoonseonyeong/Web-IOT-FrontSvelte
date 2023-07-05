<script>
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    let aeiDataList = new Array()

    const url = `${PUBLIC_API_URL}/device/history/change`

    /**
     *
     * @returns {Promise<any>}
     */
    let queryCodChange = async () => {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        // console.log(data)
        //return data['m2m:cin']['con']

        console.log(data)
        return data
    }

    onMount(() => {
        queryCodChange().then(data => aeiDataList = data);

        setInterval(async () => {
            console.log("setInterval queryCodChange")
            queryCodChange().then(data => aeiDataList = data);
        }, 10000)
    })

    const get_yyyymmddhhMMss = (datetime) => {
        let date = new Date(datetime);
        return date.toISOString().replace('T', ' ').substring(0, 19);
    }

    const getComment = (item) => {
        let comment = item.prev_con + " --> " + item.con
        return comment
    }

</script>


<div class="col-xxl-9 col-md-12">
  <div class="card z-1" id="recentPurchaseTable" data-list=''>
    <!-- data-list='{"valueNames":["name","email","product","payment","amount"],"page":7,"pagination":true}'>-->
    <div class="card-header">
      <div class="row flex-between-center">
        <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
          <h5 class="fs-0 mb-0 text-nowrap py-2 py-xl-0">디바이스 상태 로그</h5>
        </div>
        <div class="col-6 col-sm-auto ms-auto text-end ps-0">
          <!--<div class="d-none" id="table-purchases-actions">
                                <div class="d-flex"><select class="form-select form-select-sm" aria-label="Bulk actions">
                                    <option selected="">Bulk actions</option>
                                    <option value="Refund">Refund</option>
                                    <option value="Delete">Delete</option>
                                    <option value="Archive">Archive</option>
                                </select><button class="btn btn-falcon-default btn-sm ms-2" type="button">Apply</button></div>
                            </div>-->
          <div id="table-purchases-replace-element">
            <!--<button class="btn btn-falcon-default btn-sm" type="button">
              <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span>
              <span class="d-none d-sm-inline-block ms-1">New</span>
            </button>
            <button class="btn btn-falcon-default btn-sm mx-2" type="button">
              <span class="fas fa-filter" data-fa-transform="shrink-3 down-2"></span>
              <span class="d-none d-sm-inline-block ms-1">Filter</span>
            </button>
            <button class="btn btn-falcon-default btn-sm" type="button">
              <span class="fas fa-external-link-alt" data-fa-transform="shrink-3 down-2"></span>
              <span class="d-none d-sm-inline-block ms-1">Export</span>
            </button>-->
          </div>
        </div>
      </div>
    </div>
    <div class="card-body px-0 py-0">
      <div class="table-responsive scrollbar">
        <table class="table table-sm fs--1 mb-0 overflow-hidden">
          <thead class="bg-200 text-900">
          <tr>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="datetime">날짜/시간</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="device">디바이스(AEI)</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="Status">CIN</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="Value">CON</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="Comment">Comment</th>
            <th class="pe-1 align-middle data-table-row-action"></th>
          </tr>
          </thead>
          <tbody class="list" id="table-purchase-body">
          {#each aeiDataList as item, index}
            <tr class="btn-reveal-trigger">

              <th class="align-middle white-space-nowrap name">{get_yyyymmddhhMMss(item.datetime)}</th>
              <td class="align-middle white-space-nowrap email">{item.ae}</td>

              {#if item.cin == 'temp'}
                <td class="align-middle fs-0 white-space-nowrap payment">
                  <span class="badge badge rounded-pill badge-subtle-primary">온도</span>
                  <!--<span class="ms-1 fas fa-check" data-fa-transform="shrink-2"></span>-->
                </td>
              <td class="align-middle white-space-nowrap product">{item.con}&deg;C</td>
              {:else if item.cin == 'humid'}
                <td class="align-middle fs-0 white-space-nowrap payment">
                  <span class="badge badge rounded-pill badge-subtle-success">습도</span>
                  <!--<span class="ms-1 fas fa-check" data-fa-transform="shrink-2"></span>-->
                </td>
                <td class="align-middle white-space-nowrap product danger">{item.con}%</td>
              {/if}

              {#if item.con_change == 'up'}
                <td class="align-middle text-end  text-danger">{getComment(item)}</td>
              {:else if item.con_change == 'dn'}
                <td class="align-middle text-end text-primary">{getComment(item)}</td>
              {:else}
                <td class="align-middle text-end ">-</td>
              {/if}

              <td class="align-middle white-space-nowrap text-end">
                <div class="dropstart font-sans-serif position-static d-inline-block">
                  <button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end"
                          type="button" id="dropdown-recent-purchase-table-0"
                          data-bs-toggle="dropdown" data-boundary="window"
                          aria-haspopup="true" aria-expanded="false"
                          data-bs-reference="parent">
                    <span class="fas fa-ellipsis-h fs--1"></span>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-recent-purchase-table-0">
                    <!--<a class="dropdown-item" href="#!">View</a>
                    <a class="dropdown-item" href="#!">Edit</a>
                    <a class="dropdown-item" href="#!">Refund</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-warning" href="#!">Archive</a>
                    <a class="dropdown-item text-danger" href="#!">Delete</a>-->
                  </div>
                </div>
              </td>
            </tr>
          {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card-footer">
      <div class="row align-items-center">
        <div class="pagination d-none"></div>
        <div class="col">
          <p class="mb-0 fs--1">
            <span class="d-none d-sm-inline-block me-2" data-list-info="data-list-info"></span>
          </p>
        </div>
        <div class="col-auto d-flex">
          <!--<button class="btn btn-sm btn-primary" type="button" data-list-pagination="prev">
            <span>Previous</span></button>
          <button class="btn btn-sm btn-primary px-4 ms-2" type="button" data-list-pagination="next">
            <span>Next</span>
          </button>-->
        </div>
      </div>
    </div>
  </div>
</div>
