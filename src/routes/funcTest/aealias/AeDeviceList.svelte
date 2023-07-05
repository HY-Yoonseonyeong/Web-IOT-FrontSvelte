<script>
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    let aeiDataList = new Array()

    onMount(() => {
        // IOT 기기 리스트 별칭 조회
        queryAeDeviceAliasList()
    })

    const queryAeDeviceAliasList = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/device/alias`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) //
            throw new Error(response.statusText);

        const data = await response.json()

        aeiDataList = data;
    }

    const updateAeDeviceAlias = async (rowToBeDeleted) => {

        const params = {}
        params['aei'] = rowToBeDeleted.aei;
        params['alias'] = rowToBeDeleted.name;

        const response = await fetch(`${PUBLIC_API_URL}/device/alias`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params)
        });

        if (!response.ok) //
            throw new Error(response.statusText);

        console.log(response)

        const fetchData = await response.json();

        await queryAeDeviceAliasList()
    }

    const clickChangeAlias = (rowItem) => {
        updateAeDeviceAlias(rowItem)
    }

</script>


<div class="col-xxl-9 col-md-12">
  <div class="card z-1" id="recentPurchaseTable" data-list=''>
    <!-- data-list='{"valueNames":["name","email","product","payment","amount"],"page":7,"pagination":true}'>-->
    <div class="card-header">
      <div class="row flex-between-center">
        <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
          <h5 class="fs-0 mb-0 text-nowrap py-2 py-xl-0">디바이스(AE) Alias 변경</h5>
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
            <th class="pe-1 align-middle white-space-nowrap" data-sort="datetime">인덱스</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="device">AEI</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="Status">AE</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="Value">API(App ID)</th>
            <th class="pe-1 align-middle white-space-nowrap" data-sort="Comment">기기 Alias</th>
            <th class="pe-1 align-middle data-table-row-action">기기 Alias(변경)</th>
            <th class="pe-1 align-middle data-table-row-action"></th>
          </tr>
          </thead>
          <tbody class="list" id="table-purchase-body">
          {#each aeiDataList as item, index}
            <tr class="btn-reveal-trigger">
              <th class="align-middle white-space-nowrap ">{index + 1}</th>
              <th class="align-middle white-space-nowrap name">{item.aei}</th>
              <th class="align-middle white-space-nowrap name">{item.ae}</th>
              <th class="align-middle white-space-nowrap name">{item.api}</th>
              <th class="align-middle white-space-nowrap name">{item.alias}</th>

              <th class="align-middle white-space-nowrap name">
                <div class="dropstart font-sans-serif position-static d-inline-block">
                  <input type="text" bind:value={item.name}>
                </div>
              </th>
              <th class="align-middle white-space-nowrap name">
                <div class="dropstart font-sans-serif position-static d-inline-block">
                  <button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" on:click={() => clickChangeAlias(item)}>변경</button>
                </div>
              </th>
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
