<script>
	import '../../scss/theme.scss'
	import TempHumid from "./Temphumid.svelte";
	import {goto} from "$app/navigation";

	const clickTemp = () =>{
		goto("../test2")
	}

	import {onDestroy} from "svelte";

	onDestroy(()=>{
		console.log("sdfasdfa")
		console.log("sdfasdfa")
		console.log("sdfasdfa")
		console.log("sdfasdfa")
		console.log("sdfasdfa")
		console.log("sdfasdfa")
		console.log("sdfasdfa")
		console.log("sdfasdfa")
		console.log("sdfasdfa")
		console.log("sdfasdfa")
		console.log("sdfasdfa")

	})
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<TempHumid aei='test2F230102_01'/>
<button on:click={clickTemp}>test</button>

