<script lang="ts">
	import { getPublicImageLink } from "./asset_utils";
	import weighings from "./weighings.json";

	function padNumberLeft(n: number): string {
		return `${n}`.padStart(3, "0");
	}

	let {
		weighingIndex = weighings.length - 1,
		size = 'L',
	}: {
		weighingIndex: number;
		size: 'S' | 'L';
	} = $props();

	let imageName = $derived(`${padNumberLeft(weighingIndex + 1)}.png`);
	let nextImageName = $derived(`${padNumberLeft(weighingIndex + 2)}.png`);
	let nextNextImageName = $derived(`${padNumberLeft(weighingIndex + 3)}.png`);
</script>

<div class="image-wrapper-wrapper">
	<div class={["image-wrapper", `image-wrapper-${size.toLowerCase()}`]}>
		<img
			src={getPublicImageLink(imageName)}
			class="front"
			alt="Nina weighing herself"
		/>
		{#if weighingIndex < weighings.length - 1}
			<img
				src={getPublicImageLink(nextImageName)}
				class="next__image front"
				aria-hidden="true"
				alt="next image"
			/>
			{#if weighingIndex < weighings.length - 2}
				<img
					src={getPublicImageLink(nextNextImageName)}
					class="next__image front"
					aria-hidden="true"
					alt="next next image"
				/>
			{/if}
		{/if}
		<img
			src={getPublicImageLink("scale.png")}
			class="back"
			alt="the scale Nina uses to weigh herself"
		/>
	</div>
</div>

<style>
	.image-wrapper-wrapper {
		display: flex;
		justify-content: center;
	}

	.image-wrapper {
		position: relative;
		display: inline-block;
	}

	.image-wrapper-l {
		width: 32%;
	}
	@media (width <= 1500px) {
		.image-wrapper-l {
			width: 40%;
		}
	}
	@media (width <= 1224px) {
		.image-wrapper-l {
			width: 50%;
		}
	}
	@media (width <= 968px) {
		.image-wrapper-l {
			width: 70%;
		}
	}
	@media (width <= 800px) {
		.image-wrapper-l {
			width: 80%;
		}
	}
	@media (width <= 600px) {
		.image-wrapper-l {
			width: 95%;
		}
	}

	.image-wrapper-s {
		width: 75%;
	}

	.front {
		width: 100%;
		height: auto;
		display: block;
		position: relative;
		z-index: 2;
		transform: translateY(-10%);
	}

	.back {
		position: absolute;
		z-index: 1;
		width: 60%; /* scale responsively */
		bottom: -3%; /* or use calc(), or tune this as needed */
		left: 40%;
		transform: translateX(-50%);
	}

	.next__image {
		opacity: 0;
		width: 1px;
		height: 1px;
		position: absolute;
	}
</style>
