<script>
    import {posts} from "./data";
    import { goto } from '$app/navigation';
    let searchTerm = '';
    let filteredSummaries = [];


</script>

<svelte:head>
	<title>공지사항</title>
	<meta name="notice" content="공지사항" />
    <!-- <script src="%sveltekit.assets%/vendors/list.js/list.min.js"></script> -->
</svelte:head>

<!-- ===============================================-->
<!--    Main Content-->
<!-- ===============================================-->

<main class="main" id="top">
    <div class="container" data-layout="container">
<!--        <NavSide />-->
        <div class="content">
<!--            <NavTop/>-->

            <div class="card mb-3">
              <div class="card-header">
                  <div class="row flex-between-end">
                    <div class="col-auto align-self-center">
                      <h5 class="mb-0" data-anchor="data-anchor">공지사항</h5>
                      <p class="mb-0 pt-1 mt-2 mb-0">스마트팜(회사명)의 소식을 안내해 드립니다.</p>
                    </div>
                  </div>
              </div>
          
              <div class="card-body pt-0">
                  <div class="tab-content">
                    <div class="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-bb1c70a1-6c4c-451a-80b8-972dfdd01aa8" id="dom-bb1c70a1-6c4c-451a-80b8-972dfdd01aa8">
                      <div id="tableExample3" data-list={'{"valueNames":["name","email","age"],"page":5,"pagination":true}'}>
                        <div class="row justify-content-end g-0">
                          <div class="col-auto col-sm-5 mb-3">
                            <form>
                              <div class="input-group">
                                <input 
                                  class="form-control form-control-sm shadow-none search" 
                                  type="search" 
                                  placeholder="검색어를 입력해주세요." 
                                  aria-label="search" 
                                  bind:value={searchTerm}
                                />
                                <div class="input-group-text bg-transparent"><span class="fa fa-search fs--1 text-600"></span></div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div class="table-responsive scrollbar">
                          <table class="table table-hover table-bordered table-striped fs--1 mb-0">
                            <thead class="bg-200 text-900">
                              <tr>
                                  <th class="sort" data-sort="title">제목</th>
                                  <th class="sort" data-sort="date">등록일</th>
                                  <th class="sort" data-sort="hits">조회수</th>
                              </tr>
                            </thead>
                            <tbody class="list">
                              {#each posts as { id, title, date, hits }}
                              <tr on:click={() => goto(`/board/notice/${id}`)}>
                                  <td class="title">{title}</td>
                                  <td class="date">{date}</td>
                                  <td class="hits">{hits}</td>
                              </tr>

                              <!-- <tr>
                                <a href="/board/notice/{id}">
                                  <td class="title">{title}</td>
                                  <td class="date">{date}</td>
                                  <td class="hits">{hits}</td>
                                </a>
                              </tr> -->
                              {/each}
                            </tbody>
                          </table>
                        </div>
                        <div class="d-flex justify-content-center mt-3">
                          <button class="btn btn-sm btn-falcon-default me-1" type="button" title="Previous" data-list-pagination="prev"><span class="fas fa-chevron-left"></span></button>
                          <ul class="pagination mb-0"></ul>
                          <button class="btn btn-sm btn-falcon-default ms-1" type="button" title="Next" data-list-pagination="next"><span class="fas fa-chevron-right"> </span></button>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane code-tab-pane" role="tabpanel" aria-labelledby="tab-dom-f9196f01-1b6a-40f7-b8bf-cd4a811b73db" id="dom-f9196f01-1b6a-40f7-b8bf-cd4a811b73db">
                      <pre class="scrollbar rounded-1" style="max-height:420px"></pre>
                    </div>
                  </div>
                </div>
          </div>
        </div>
    </div>
</main>

<style>
  .table-striped>tbody>tr {
    cursor: pointer;
  }


</style>


