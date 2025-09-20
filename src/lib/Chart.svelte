<script lang="ts">
	import { Chart } from "chart.js/auto";
	import { onMount } from "svelte";
	import { weighings } from './weighings.json';

	let canvas: HTMLCanvasElement;
	let chartData = $state({
		datasets: [
			{
				label: "Weight",
				data: weighings.map(w => ({x: w.day, y: w.weightInLbs})),
			},
		],
	});
	let chart: Chart;

	onMount(() => {
		chart = new Chart(canvas, {
			type: "line",
			data: $state.snapshot(chartData),
			options: {
				animation: false,
				responsive: true,
				plugins: {
				},
				scales: {
					x: {
						type: "linear",
						bounds: "ticks",
						ticks: {
							// @ts-ignore
							max: weighings[weighings.length - 1].day + 1,
							min: 0,
							stepSize: 10,
							callback: label => `day ${label}`,
						}
					},
					y: {
						type: "linear",
						bounds: "ticks",
						suggestedMin: 0,
						ticks: {
							// @ts-ignore
							max: weighings[weighings.length - 1].weightInLbs + 10,
							min: 0,
							stepSize: 20,
							callback: label => `${label}lbs`,
						}
					}
				}
			},
		});
	});
</script>

<canvas bind:this={canvas} id="chart"></canvas>

<style>
	canvas {
		background-color: white;
		max-height: 80vh;
	}
</style>
