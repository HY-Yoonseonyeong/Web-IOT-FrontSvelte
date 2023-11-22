<script>
  import { onMount } from "svelte";
  import { PUBLIC_API_URL } from "$env/static/public";
  import NavSide from "../../component/nav/NavSide.svelte";
  import NavTop from "../../component/nav/NavTop.svelte";
  import Footer from "../../component/nav/Footer.svelte";

  let mobiusGroup = "";
  let mobiusGroupList = "";

  let MobiusGroupData = "";

  let isLoading = false;

  onMount(async () => {
    // await queryMobiusGroup();
    await queryMobiusGroupData();
  });

  /* const TableChange = () => {
    console.log(mobiusGroup);
    queryMobiusGroupData();
  };

  const queryMobiusGroup = async () => {
    isLoading = true; 
    try {
      const response = await fetch(`${PUBLIC_API_URL}/mobius/group`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      mobiusGroupList = data;

      console.log(mobiusApiList);
    } catch (error) {
      console.error("error", error);
    } finally {
      isLoading = false; 
    }
  }; */

  const queryMobiusGroupData = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/mobius/group`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    MobiusGroupData = data;

    console.log(MobiusGroupData);
  };
</script>

<svelte:head>
  <title>모비우스 Group | HYNUX-IOT</title>
  <meta name="description" content="About this app" />
</svelte:head>

<main class="main" id="top">
  <div class="container" data-layout="container">
    <NavSide />
    <div class="content">
      <NavTop />
      <!-- <div class="card mb-3">
        <div class="card-header">
          <div class="row flex-between-end">
            <div class="col-auto align-self-center">
              <h5 class="mb-0" data-anchor="data-anchor">Group 조회</h5>
            </div>
          </div>
        </div>
        <div class="card-body bg-light">
          <div class="tab-content">
            {#if isLoading}
              <div class="loading-box">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            {:else}
              <select
                class="form-select"
                bind:value={mobiusGroup}
                on:change={TableChange}
              >
                <option value="" hidden>ID를 선택하세요.</option>
                {#each mobiusGroupList as item}
                  <option value={item.cr}>{item.cr}</option>
                {/each}
              </select>
            {/if}
          </div>
        </div>
        <div class="card-footer text-end" />
      </div> -->
      <div class="card mb-3">
        <div class="card-header">
          <div class="row align-items-center">
            <div class="col">
              <h5 class="mb-0">Group</h5>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive scrollbar">
            <table class="table">
              <thead>
                <tr class="text-black bg-200">
                  <th scope="col" title="resourceID">ri</th>
                  <th scope="col" title="creator">cr</th>
                  <th scope="col" title="memberType">mt</th>
                  <th scope="col" title="currentNrOfMembers">cnm</th>
                  <th scope="col" title="maxNrOfMembers">mnm</th>
                  <th scope="col" title="memberIDs">mid</th>
                  <th scope="col" title="membersAccessControlPolicyIDs">macp</th>
                  <th scope="col" title="memberTypeValidated">mtv</th>
                  <th scope="col" title="consistencyStrategy">csy</th>
                  <th scope="col" title="groupName">gn</th>
                </tr>
              </thead>
              <tbody>
                {#each MobiusGroupData as item}
                  <tr>
                    <td>{item.ri}</td>
                    <td>{item.cr}</td>
                    <td>{item.mt}</td>
                    <td>{item.cnm}</td>
                    <td>{item.mnm}</td>
                    <td>{item.mid}</td>
                    <td>{item.macp}</td>
                    <td>{item.mtv}</td>
                    <td>{item.csy}</td>
                    <td>{item.gn}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer text-end" />
      </div>
      <Footer />
    </div>
  </div>
</main>

<style>
  table {
    text-align: center;
  }
  table th {
    cursor: default;
  }

  .loading-box {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
