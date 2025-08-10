<script lang="ts">
    import { dayPerSecondLabel, lbsPerSecondLabel, playSpeeds, type PlaySpeed } from "./PlaySpeed";

	let {
		speed = $bindable("default"),
		linearWg = $bindable(false),
	}: {
		speed: PlaySpeed;
		linearWg: false;
	} = $props();
</script>

<form>
	<label for="playSpeed">Player speed</label>
	<select bind:value={speed} id="playSpeed">
		{#each playSpeeds as selectableSpeed}
			<option value={selectableSpeed}>
				{selectableSpeed} ({(linearWg ? lbsPerSecondLabel : dayPerSecondLabel)(selectableSpeed)})
		   </option>
		{/each}
	</select>

	<label for="linearWg">Linear weight gain</label>
	<input type="checkbox" id="linearWg" bind:checked={linearWg}>
</form>

<style>
  	select, option, label {
    	-webkit-text-stroke-width: 0px;
  	}
</style>
