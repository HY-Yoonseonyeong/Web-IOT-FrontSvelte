<script>
    import {onMount} from "svelte";
    import {PUBLIC_API_URL} from "$env/static/public";

    /**
     * 토큰 테스트
     */

    onMount(async () => {
    })

    let selectedFile;

    const handleFileUpload = (event) => {
        selectedFile = event.target.files[0];
        console.log(selectedFile);
    };

    const submitFile = async () => {
        console.log("submitFile")
        const formData = new FormData();

        formData.append("file", selectedFile);
        var test = "fdsf"
        const response = await fetch(`${PUBLIC_API_URL}/fw/AE/${test}/ver`, { // Replace '/upload' with your API endpoint
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            // handle error
            console.log('File upload failed');
        } else {
            console.log(await response.json()); // or response.text() depending on server response
        }
    };


</script>

<svelte:head>
  <title>fw</title>
  <meta name="fw" content="firmware"/>
</svelte:head>

<div>
  <input>
  <input>
  <input type="file" on:change={handleFileUpload} />
  <button on:click={submitFile}>Submit</button>
</div>

{#if selectedFile}
  <p>Selected file: {selectedFile.name}</p>
{/if}