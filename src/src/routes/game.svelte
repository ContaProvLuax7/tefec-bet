<main>
    <div class="header">
        <div class="preSection">

        </div>
        <h1 class="league">{League}</h1>
    </div>
    <div class="teams">

    </div>
    <div class="bar">

    </div>
</main>

<script>
    	import { onMount } from 'svelte';
        import axios from 'axios';

        export let DabataseId;
        
    onMount(() => {
	console.log('the component has mounted');
        axios.get(DabataseId)
        

	});


    const GameType = ""
    const League = ""
</script>