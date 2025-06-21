<script lang="ts">
    import { getPublicImageLink } from './asset_utils';
  import weighings from './weighings.json';

  function padNumberLeft(n: number): string {
    let result = `${n}`
    return '0'.repeat(3 - result.length) + result;
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

  let selectedWeighingIndex = $state(weighings.length - 1)
  let imageName = $derived(`${padNumberLeft(selectedWeighingIndex + 1)}.png`)

  let canGoToPreviousWeighing = $derived(selectedWeighingIndex > 0);
  let canGoToNextWeighing = $derived(selectedWeighingIndex < weighings.length - 1);

</script>

<h2 class="title">Day {weighings[selectedWeighingIndex].day}</h2>

<div class="image-wrapper-wrapper">
  <div class="image-wrapper">
    <img src="{getPublicImageLink(imageName)}" class="front" alt="Nina weighing herself">
    <img src="{getPublicImageLink("scale.png")}" class="back" alt="the scale Nina use to weigh herself"/>
  </div>
</div>

<div class="buttons-wrapper">
  <button onclick="{previousWeighing}" disabled={!canGoToPreviousWeighing} class="weighings__button"> previous </button>
  <button onclick="{nextWeighing}" disabled={!canGoToNextWeighing} class="weighings__button" > next </button>
</div>

<div class="text-wrapper">
  <p style="color: black">Nina weighs {weighings[selectedWeighingIndex].weightInLbs}lbs</p>
</div>

<style>
.image-wrapper-wrapper {
  display: flex;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  display: inline-block;
  width: 40%; /* or max-width: 600px; */
}

.buttons-wrapper {
  display: flex;
  justify-content: space-evenly;
}

.text-wrapper {
  display: flex;
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
  margin-bottom: 2%;
}

.title {
	color: black;
	-webkit-text-stroke-color: white;
	-webkit-text-stroke-width: 3px;
	font-weight: 700;
}

</style>
