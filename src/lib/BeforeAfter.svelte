<script lang="ts">
    import { getIndicesForItem, getItems } from "./before_after_of_items";
    import IndexSelector from "./IndexSelector.svelte";
    import NinaWithStats from "./NinaWithStats.svelte";
	import { weighings } from './weighings.json';

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

	function useItemForIndices() {
		const indices = getIndicesForItem(selectedItem);
		console.log("OUOUOUOU", selectedItem, indices)
		updateBefore(indices.first);
		updateAfter(indices.last);
	}

	const items = getItems();
	let selectedItem: {
		type: "shirt" | "shorts" | "sandals" | "plateau",
		i: number,
	} = $state({type: "shirt", i: 0});
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

<form>
	<label for="ba-falo-select">First and last appearance of...</label>
    <select style="font-weight: 600;" id="ba-falo-select" bind:value={selectedItem} onchange={() => useItemForIndices()}>
      {#each items as item}
        <option style="font-weight: 600;" value={item}>
          {item.type} {item.i + 1}
        </option>
      {/each}
    </select>
</form>

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

  	select, option, label {
    	-webkit-text-stroke-width: 0px;
  	}

</style>
