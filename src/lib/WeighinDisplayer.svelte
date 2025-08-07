<script lang="ts">
  import { getPublicImageLink } from './asset_utils';
  import { ninasBMIForWeight } from './nina_stats';
  import weighings from './weighings.json';
  import { formatBMI, toBMICategory } from './weight_utils';

  function padNumberLeft(n: number): string {
    return `${n}`.padStart(3, '0');
  }

  function firstWeighing() {
    if (canGoToFirstWeighing) {
      selectedWeighingIndex = 0
    }
  }

  function previousWeighing() {
    if (canGoToPreviousWeighing) {
      selectedWeighingIndex--
    }
  }

  function nextWeighing() {
    if (canGoToNextWeighing) {
      selectedWeighingIndex++
    }
  }

  function lastWeighing() {
    if (canGoToLastWeighing) {
      selectedWeighingIndex = weighings.length - 1
    }
  }

  let isPlaying = $state(false)
  let currentPlayNumber = $state(0)

  let selectedWeighingIndex = $state(weighings.length - 1)
  let imageName = $derived(`${padNumberLeft(selectedWeighingIndex + 1)}.png`)
  let nextImageName = $derived(`${padNumberLeft(selectedWeighingIndex + 2)}.png`)
  let nextNextImageName = $derived(`${padNumberLeft(selectedWeighingIndex + 3)}.png`)

  let canGoToFirstWeighing = $derived(!isPlaying && selectedWeighingIndex != 0);
  let canGoToPreviousWeighing = $derived(!isPlaying && selectedWeighingIndex > 0);
  let canGoToNextWeighing = $derived(!isPlaying && selectedWeighingIndex < weighings.length - 1);
  let canGoToLastWeighing = $derived(!isPlaying && selectedWeighingIndex != weighings.length - 1);

  function togglePlayFromFirst() {
    if (isPlaying) {
      isPlaying = false
      return
    }
    firstWeighing()
    isPlaying = true
    queueNextPic(++currentPlayNumber)
  }

  function queueNextPic(playNumber: number) {
    if (selectedWeighingIndex === weighings.length - 1) {
      isPlaying = false
      return;
    }
    const delay = (weighings[selectedWeighingIndex + 1].day - weighings[selectedWeighingIndex].day) * 50
    setTimeout(() => {
      if (isPlaying && playNumber === currentPlayNumber) {
        selectedWeighingIndex++
        queueNextPic(playNumber)
      }
    }, delay)
  }

  function onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowLeft":
        previousWeighing();
        return;
      case "ArrowRight":
        nextWeighing();
        return;
    }
  }

</script>

<h2 class="title">Day {weighings[selectedWeighingIndex].day}</h2>

<div class="image-wrapper-wrapper">
  <div class="image-wrapper">
    <img src="{getPublicImageLink(imageName)}" class="front" alt="Nina weighing herself">
    {#if selectedWeighingIndex < weighings.length - 1}
      <img src="{getPublicImageLink(nextImageName)}" class="next__image front" aria-hidden="true" alt="next image">
      {#if selectedWeighingIndex < weighings.length - 2}
        <img src="{getPublicImageLink(nextNextImageName)}" class="next__image front" aria-hidden="true" alt="next next image">
      {/if}
    {/if}
    <img src="{getPublicImageLink("scale.png")}" class="back" alt="the scale Nina uses to weigh herself"/>
  </div>
</div>

<div class="buttons-wrapper">
  <button onclick="{firstWeighing}" disabled={!canGoToFirstWeighing} class="weighings__button"> &lt;&lt; </button>
  <button onclick="{previousWeighing}" disabled={!canGoToPreviousWeighing} class="weighings__button"> &lt; </button>
  <button onclick="{togglePlayFromFirst}" class="weighings__button"> {isPlaying ? "pause" : "play from first"} </button>
  <button onclick="{nextWeighing}" disabled={!canGoToNextWeighing} class="weighings__button" > &gt; </button>
  <button onclick="{lastWeighing}" disabled={!canGoToLastWeighing} class="weighings__button" > &gt;&gt; </button>
</div>

<div class="text-wrapper">
  <p style="color: black">Nina weighs {weighings[selectedWeighingIndex].weightInLbs}lbs.</p>
  <p style="color: black">She is {toBMICategory(ninasBMIForWeight(weighings[selectedWeighingIndex].weightInLbs))} (BMI: {formatBMI(ninasBMIForWeight(weighings[selectedWeighingIndex].weightInLbs))}).</p>
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
.image-wrapper-wrapper {
  display: flex;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  width: 32%; /* or max-width: 600px; */
}

@media (width <= 1500px) {
  .image-wrapper {
    width: 40%;
  }
}

@media (width <= 1224px) {
  .image-wrapper {
    width: 50%;
  }
}

@media (width <= 968px) {
  .image-wrapper {
    width: 70%;
  }
}

@media (width <= 800px) {
  .image-wrapper {
    width: 80%;
  }
}

@media (width <= 600px) {
  .image-wrapper {
    width: 95%;
  }
}

.buttons-wrapper {
  display: flex;
  justify-content: space-evenly;
}

.text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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

.weighings__button {
  -webkit-text-stroke-width: 0;
  margin-bottom: 1%;
}

.title {
	color: black;
	-webkit-text-stroke-color: white;
	-webkit-text-stroke-width: 3px;
	font-weight: 700;
}

.next__image {
  opacity: 0;
  width: 1px;
  height: 1px;
  position: absolute;
}

</style>
