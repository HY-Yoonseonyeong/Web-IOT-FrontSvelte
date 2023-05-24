<script>
    import {goto} from "$app/navigation";

    // goto('./')
    const clickLogout = () => {
        goto('./')
    }
</script>

<div class="modal fade" id="modal-logout"  aria-labelledby="modal-logout" aria-hidden="true">
  <div class="modal-dialog mt-6" role="document">
    <div class="modal-content border-0">
      <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
        <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-0">
        <div class="bg-light rounded-top-3 py-3 ps-4 pe-6">
          <h4 class="mb-1">로그아웃</h4>
        </div>
        <div class="p-4 pb-0">
          <div class="row">
            <div class="col">
              <h5>로그아웃을 하시겠습니까?</h5>
            </div>
          </div>
          <div class="row mt-3 mb-3">
            <div class="col text-center">
              <button class="btn btn-danger" type="button" data-bs-dismiss="modal" on:click={clickLogout}>로그아웃</button>
            </div>
            <div class="col text-center">
              <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>