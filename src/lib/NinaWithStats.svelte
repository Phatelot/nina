<script lang="ts">
    import Nina from "./Nina.svelte";
    import { ninasBMIForWeight } from "./nina_stats";
	import weighings from "./weighings.json";
    import { formatBMI, toBMICategory } from "./weight_utils";

	let {
		weighingIndex,
		size,
	}: {
		weighingIndex: number;
		size: 'S' | 'L';
	} = $props();

	let weight = $derived(weighings[weighingIndex].weightInLbs);
	let BMI = $derived(ninasBMIForWeight(weight));
	let labelA : string = $derived(`day ${weighings[weighingIndex].day}, ${weight}lbs`);
	let labelB : string = $derived(`BMI: ${formatBMI(BMI)} (${toBMICategory(BMI)})`);
</script>

<div class="container">
	<Nina {weighingIndex} {size} />
	<p>{labelA}</p>
	<p>{labelB}</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}

	p {
		color: black;
		margin-bottom: 0px;
	}
</style>
