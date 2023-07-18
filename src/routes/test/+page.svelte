<script>
	import '../../scss/theme.scss'
	import TempHumid from "./Temphumid.svelte";
	import {goto} from "$app/navigation";
	import {onDestroy} from "svelte";

	const clickTemp = () =>{
		goto("../test2")
	}



	onDestroy(()=>{

	})

</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>test4</div>