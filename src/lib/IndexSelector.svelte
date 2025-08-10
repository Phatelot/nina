<script lang="ts">
    import type { Snippet } from "svelte";

	let {
		minValue = 0,
		maxValue,
		currentValue = $bindable(maxValue),
		disabled = false,
		listenForKeyboardEvents = false,
		middleButton,
	}: {
		minValue: number;
		maxValue: number;
		currentValue: number;
		disabled: boolean;
		listenForKeyboardEvents: boolean;
		middleButton?: Snippet;
	} = $props();

	function first() {
		if (canGoToFirst) {
			currentValue = minValue;
		}
	}

	function previous() {
		if (canGoToPrevious) {
			currentValue--;
		}
	}

	function next() {
		if (canGoToNext) {
			currentValue++;
		}
	}

	function last() {
		if (canGoToLast) {
			currentValue = maxValue;
		}
	}

	function onKeyDown(e: KeyboardEvent) {
		if (!listenForKeyboardEvents) {
			return;
		}
		switch (e.key) {
			case "ArrowLeft":
				previous();
				return;
			case "ArrowRight":
				next();
				return;
		}
	}

	let canGoToFirst = $derived(!disabled && currentValue != minValue);
	let canGoToPrevious = $derived(!disabled && currentValue > minValue);
	let canGoToNext = $derived(!disabled && currentValue < maxValue);
	let canGoToLast = $derived(!disabled && currentValue != maxValue);
</script>

<div class="buttons-wrapper">
	<button onclick="{first}" disabled={!canGoToFirst} class="weighings__button"> &lt;&lt; </button>
	<button onclick="{previous}" disabled={!canGoToPrevious} class="weighings__button"> &lt; </button>
	{#if middleButton}
		{@render middleButton()}
	{/if}
	<button onclick="{next}" disabled={!canGoToNext} class="weighings__button" > &gt; </button>
	<button onclick="{last}" disabled={!canGoToLast} class="weighings__button" > &gt;&gt; </button>
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
	.buttons-wrapper {
		display: flex;
		justify-content: space-evenly;
		margin-bottom: 0;
	}

	.weighings__button {
		margin-bottom: 1%;
		-webkit-text-stroke-width: 0;
		margin-right: 10px;
		margin-left: 10px;
	}

	@media (width <= 650px) {
		.weighings__button {
			margin-right: 4px;
			margin-left: 4px;
			padding: 10px;
		}
	}
</style>
