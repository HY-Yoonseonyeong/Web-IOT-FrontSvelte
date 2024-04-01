<script>
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    let aeiDataList = new Array()

    const url = `${PUBLIC_API_URL}/device/la/test2F230102_01`

    let temp = async () => {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await response.json()
        return data
    }

    onMount(() => {
        setInterval(async () => {
            let data = await temp();
            let test = data['m2m:cin']['ct'].replace('T', '')
            const dattime = new Date(test)

            aeiDataList.push({
                aei: 'test2F230102_01',
                ct: test.replace(/^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/, '$1-$2-$3 $4:$5:$6'),
                con: data['m2m:cin']['con']
            })

            aeiDataList = aeiDataList;

            if (aeiDataList.length > 10) {
                aeiDataList.shift()
            }

        }, 10000)
    })
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
            <th class="white-space-nowrap">
              <div class="form-check mb-0 d-flex align-items-center">
                <input class="form-check-input" id="checkbox-bulk-purchases-select" type="checkbox"/>
                <!--data-bulk-select='{"body":"table-purchase-body","actions":"table-purchases-actions","replacedElement":"table-purchases-replace-element"}'-->
              </div>
            </th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="datetime">날짜/시간</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="device">디바이스(AEI)</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="Status">상태</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="Value">Value</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="Comment">Comment</th>
            <th class="pe-1 align-middle data-table-row-action"></th>
          </tr>
          </thead>
          <tbody class="list" id="table-purchase-body">
          {#each aeiDataList as item, index}
            <tr class="btn-reveal-trigger">
              <td class="align-middle" style="width: 28px;">
                <div class="form-check mb-0">
                  <input class="form-check-input" type="checkbox"
                         id="recent-purchase-0"
                         data-bulk-select-row="data-bulk-select-row"/>
                </div>
              </td>
              <th class="align-middle white-space-nowrap name">{item.ct}</th>
              <td class="align-middle white-space-nowrap email">{item.aei}</td>
              <td class="align-middle fs-0 white-space-nowrap payment">
                <span class="badge badge rounded-pill badge-subtle-success">정상
                  <span class="ms-1 fas fa-check" data-fa-transform="shrink-2"></span>
                </span>
              </td>
              <td class="align-middle white-space-nowrap product">온도 {item.con}&deg;C</td>
              <td class="align-middle text-end amount">-</td>
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
                    <a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a>
                    <a class="dropdown-item" href="#!">Refund</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-warning" href="#!">Archive</a>
                    <a class="dropdown-item text-danger" href="#!">Delete</a>
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
