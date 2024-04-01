<script>
    import {onMount, onDestroy} from "svelte";
    import {PUBLIC_API_URL} from '$env/static/public'

    export let pageNumber = 0

    export let pageInfo = {
        curIndex: 0,
        totalCount: 0
    }

    let _cssDisplay = ""

    onMount(async () => {
    })

    onDestroy(() => {
    })

    export const changePage = () => {
    }

    export const someFunc = () => console.log('someFunc');

    const changeNumber = (pageNumber) => {
    }

    $: changeNumber(pageNumber)

    const changePageInfo = (pageInfo) => {

        if (pageInfo.totalCount < 21) {
            _cssDisplay = "display-none"
        } else {
            _cssDisplay = ""
        }
    }

    $: changePageInfo(pageInfo)
</script>

<div class="card-footer {_cssDisplay}">
  <div class="d-flex justify-content-center">
    <button class="btn btn-sm btn-falcon-default me-1" type="button" title="Previous" data-list-pagination="prev">
      <span class="fas fa-chevron-left"></span>
    </button>
    <ul class="pagination mb-0 ">
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

<style>
    .display-none {
        display: none
    }
</style>
