<script lang="ts">
    import IndexSelector from "./IndexSelector.svelte";
    import NinaWithStats from "./NinaWithStats.svelte";
	import weighings from './weighings.json';

	let beforeSelectedWeighingIndex = $state(0)
	let afterSelectedWeighingIndex = $state(weighings.length - 1)

	function updateBefore(newBefore: number) {
		beforeSelectedWeighingIndex = newBefore;
		if (beforeSelectedWeighingIndex >= afterSelectedWeighingIndex) {
			afterSelectedWeighingIndex = beforeSelectedWeighingIndex + 1
		}
	}

	function updateAfter(newAfter: number) {
		afterSelectedWeighingIndex = newAfter;
		if (beforeSelectedWeighingIndex >= afterSelectedWeighingIndex) {
			beforeSelectedWeighingIndex = afterSelectedWeighingIndex - 1
		}
	}
</script>

<div class="wrapper">
	<NinaWithStats weighingIndex={beforeSelectedWeighingIndex} size="S"/>
	<NinaWithStats weighingIndex={afterSelectedWeighingIndex} size="S"/>
	<div class="selector__wrapper--left">
		<p class="selector__label">Before</p>
		<IndexSelector minValue={0} maxValue={weighings.length - 2} bind:currentValue={() => beforeSelectedWeighingIndex, updateBefore} disabled={false} listenForKeyboardEvents={false}/>
		<p class="selector__label">After</p>
		<IndexSelector minValue={1} maxValue={weighings.length - 1} bind:currentValue={() => afterSelectedWeighingIndex, updateAfter} disabled={false} listenForKeyboardEvents={false}/>
	</div>
</div>
<div class="selector__wrapper--bottom">
	<IndexSelector minValue={0} maxValue={weighings.length - 2} bind:currentValue={() => beforeSelectedWeighingIndex, updateBefore} disabled={false} listenForKeyboardEvents={false}/>
	<IndexSelector minValue={1} maxValue={weighings.length - 1} bind:currentValue={() => afterSelectedWeighingIndex, updateAfter} disabled={false} listenForKeyboardEvents={false}/>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: row;
		margin-top: 45px;
	}

	.selector__label {
		color: black;
	}

	@media (width <= 1224px) {
		.selector__wrapper--left {
			display: none;
		}
	}

	.selector__wrapper--bottom {
		display: none;
	}

	@media (width <= 1224px) {
		.selector__wrapper--bottom {
			display: flex;
			flex-direction: row;
			margin-top: 10px;
			justify-content: space-around;
		}
	}

</style>
