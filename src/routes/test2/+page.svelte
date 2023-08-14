<script>
	import '../../scss/theme.scss'
	import TempHumid from "./Temphumid.svelte";
	import {onDestroy} from "svelte";

	onDestroy(()=>{



	})


</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<TempHumid aei='test2F230102_01'/>

