<script>
    import PdfExport from "./PdfExport.svelte";

    let pdfExport
    // let queryInfo
    export let queryInfo;

    const onModalClickPdfDownload = () => {
        pdfExport.createPDF()
    }

</script>


<div class="modal fade" id="error-modal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document" style="max-width: 1200px">
    <div class="modal-content position-relative">
      <div class="position-absolute top-0 end-0 mt-2 me-2 z-1">
        <button class="btn-close btn btn-sm btn-circle d-flex flex-center transition-base" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-0">
        <div class="rounded-top-3 py-3 ps-4 pe-6 bg-light">
          <h4 class="mb-1">리포트(기간데이터) 생성</h4>
        </div>
        <div class="p-4 pb-0">
          <PdfExport queryInfo={queryInfo} bind:this={pdfExport}/>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" type="button" on:click={onModalClickPdfDownload}>PDF 다운로드</button>
        <button class="btn btn-primary" type="button" data-bs-dismiss="modal">닫기</button>
      </div>
    </div>
  </div>
</div>