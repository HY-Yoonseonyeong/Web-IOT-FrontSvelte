<script>
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";

    let selectedFile;
    let aeFirmwareVersion = ""
    let firmwareVersion = ""

    let aeFirmwareVersionSize = ""
    let fwVersion = ""
    let firmwareVersionSize = ""


    //
    let uploadAE
    let uploadFirmwareVersion

    //
    let downloadAE
    let downloadFirmwareVersion

    let aeFirmwareVersionList = []

    onMount(async () => {
        getAeVersionList()
    })

    const handleFileUpload = (event) => {
        selectedFile = event.target.files[0];
        console.log(selectedFile);
    };

    const getAeFirmwareVersion = async () => {
        console.log(aeFirmwareVersion)
        // http://127.0.0.1:8185/fw/AE/test2/version
        const response = await fetch(`${PUBLIC_API_URL}/fw/AE/${aeFirmwareVersion}/version`, { // Replace '/upload' with your API endpoint
            method: 'GET'
        });

        console.log(response)
        const data = await response.text()
        console.log(data)
        firmwareVersion = data
    }

    const getAeFirmwareSize = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/fw/AE/${aeFirmwareVersionSize}/${fwVersion}/size`, { // Replace '/upload' with your API endpoint
            method: 'GET'
        });

        const data = await response.json()
        console.log(data)
        firmwareVersionSize = data
    }


    const submitFile = async () => {
        console.log("submitFile")
        const formData = new FormData();

        formData.append("file", selectedFile);
        formData.append("ae", uploadAE);
        formData.append("firmware_version", uploadFirmwareVersion);
        const response = await fetch(`${PUBLIC_API_URL}/fw/AE/${uploadAE}/ver`, { // Replace '/upload' with your API endpoint
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            // handle error
            console.log('File upload failed');
        } else {
            /*console.log(await response.json()); // or response.text() depending on server response*/
            alert("업로드 완료")
        }
    };


    const downloadFirmware = async () => {
        /*const response = await fetch(`${PUBLIC_API_URL}/fw/AE/${downloadAE}/${downloadFirmwareVersion}/data/block`, { // Replace '/upload' with your API endpoint
            method: 'GET'
        });

        const data = await response.json()
        console.log(data)*/
        //firmwareVersionSize = data

        var a = document.createElement("a");

// Set the `href` and `download` attributes
        a.href = `${PUBLIC_API_URL}/fw/AE/${downloadAE}/${downloadFirmwareVersion}/data/block`; // URL of the file to be downloaded
        // a.download = "myfile.txt"; // Suggested name for the file to be saved as

// Append the anchor to the document body
        document.body.appendChild(a);

// Simulate a click on the anchor
        a.click();

// Remove the anchor from the document
        document.body.removeChild(a);

    }
    const getAeVersionList = async () => {
        const response = await fetch(`${PUBLIC_API_URL}/fw`, { // Replace '/upload' with your API endpoint
            method: 'GET'
        });

        aeFirmwareVersionList = await response.json()
    }

</script>

<svelte:head>
  <title>fw</title>
  <meta name="fw" content="firmware"/>
</svelte:head>

<div class="mb-4">
  <p>펌웨어 버전 조회</p>
  <div>
    <input placeholder="AE" bind:value="{aeFirmwareVersion}">
    <input readonly value="{firmwareVersion}">
    <button on:click={getAeFirmwareVersion}>펌웨어 버전 조회</button>
  </div>
</div>

<div class="mb-4">
  <p>펌웨어 버전 파일 사이즈 조회</p>
  <div>
    <input placeholder="AE" bind:value="{aeFirmwareVersionSize}">
    <input placeholder="Firmware Version" bind:value="{fwVersion}">
    <input readonly value="{firmwareVersionSize}">
    <button on:click={getAeFirmwareSize}>펌웨어 버전 조회</button>
  </div>
</div>

<div class="mb-4">
  <p>펌웨어 버전 업로드</p>
  <input placeholder="AE" bind:value="{uploadAE}">
  <input placeholder="Firmware Version" bind:value="{uploadFirmwareVersion}">
  <input type="file" on:change={handleFileUpload} />
  <button on:click={submitFile}>파일 업로드</button>
</div>

<div class="mb-4">
  <p>펌웨어 버전 다운로드</p>
  <input placeholder="AE" bind:value="{downloadAE}">
  <input placeholder="Firmware Version" bind:value="{downloadFirmwareVersion}">
  <button on:click={downloadFirmware}>파일 다운로드</button>
</div>

<div class="mb-4">
  <p>펌웨어 버전 리스트</p>
  <table style="width:50%">
    <thead>
    <tr>
      <th>AE</th>
      <th>FW Version</th>
      <th>File Path</th>
      <th>File Size</th>
      <th>DateTime</th>
    </tr>
    </thead>
    <tbody>
    {#each aeFirmwareVersionList as item}
      <tr>
        <td>{item.ae}</td>
        <td>{item.fw_version}</td>
        <td>{item.file_path}</td>
        <td>{item.file_size}</td>
        <td>{item.datetime}</td>
      </tr>
    {/each}
    </tbody>
  </table>
</div>

<!--
{#if selectedFile}
  <p>Selected file: {selectedFile.name}</p>
{/if}-->
