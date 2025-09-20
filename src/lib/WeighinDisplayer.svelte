<script lang="ts">
  import IndexSelector from './IndexSelector.svelte';
  import Nina from './Nina.svelte';
  import { ninasBMIForWeight } from './nina_stats';
  import PlayOptions from './PlayOptions.svelte';
  import { delayForLinearWgSpeed, delayForSpeed, type PlaySpeed } from './PlaySpeed';
  import { weighings } from './weighings.json';
  import { formatBMI, toBMICategory } from './weight_utils';

  let isPlaying = $state(false)
  let currentPlayNumber = $state(0)
  let selectedSpeed: PlaySpeed = $state('default')
  let linearWg = $state(false);

  let selectedWeighingIndex = $state(weighings.length - 1)
  let selectedWeighing = $derived(weighings[selectedWeighingIndex])

  function togglePlayFromFirst() {
    if (isPlaying) {
      isPlaying = false
      return
    }
    selectedWeighingIndex = 0
    isPlaying = true
    queueNextPic(++currentPlayNumber)
  }

  function queueNextPic(playNumber: number) {
    if (selectedWeighingIndex === weighings.length - 1) {
      isPlaying = false
      return;
    }
    const delay = linearWg ?
    (weighings[selectedWeighingIndex + 1].weightInLbs - selectedWeighing.weightInLbs) * delayForLinearWgSpeed(selectedSpeed) :
    (weighings[selectedWeighingIndex + 1].weightInLbs - selectedWeighing.weightInLbs) * delayForSpeed(selectedSpeed)
    setTimeout(() => {
      if (isPlaying && playNumber === currentPlayNumber) {
        selectedWeighingIndex++
        queueNextPic(playNumber)
      }
    }, delay)
  }
</script>

<h2 class="title">Day {selectedWeighing.day}</h2>
{#if (selectedWeighing.scale + selectedWeighing.shirt + selectedWeighing.shorts + selectedWeighing.plateau- 1) > 0}
  <div style="position: absolute">
    <p class="subtitle">Broken</p>
    {#if selectedWeighing.shorts > 0}
      <p class="subtitle indented">Shorts: {selectedWeighing.shorts}</p>
    {/if}
    {#if selectedWeighing.plateau > 0}
      <p class="subtitle indented">Plateau{selectedWeighing.plateau > 1 ? "s": ""}: {selectedWeighing.plateau}</p>
    {/if}
    {#if selectedWeighing.shirt > 0}
      <p class="subtitle indented">Shirt{selectedWeighing.shirt > 1 ? "s" : ""}: {selectedWeighing.shirt}</p>
    {/if}
    {#if selectedWeighing.scale > 1}
      <p class="subtitle indented">Scale{selectedWeighing.scale > 1 ? "s": ""}: {selectedWeighing.scale - 1}</p>
    {/if}
  </div>
{/if}

<Nina weighingIndex={selectedWeighingIndex} size='L'/>

{#snippet middleButton()}
  <button onclick="{togglePlayFromFirst}" class="play__button"> {isPlaying ? "pause" : "play from first"} </button>
{/snippet}

<IndexSelector minValue={0} maxValue={weighings.length - 1} bind:currentValue={selectedWeighingIndex} disabled={isPlaying} listenForKeyboardEvents={true} {middleButton}/>

<div class="text-wrapper">
  <p style="color: black">Nina weighs {selectedWeighing.weightInLbs}lbs.</p>
  <p style="color: black">She is {toBMICategory(ninasBMIForWeight(selectedWeighing.weightInLbs))} (BMI: {formatBMI(ninasBMIForWeight(weighings[selectedWeighingIndex].weightInLbs))}).</p>
</div>

<PlayOptions bind:speed={selectedSpeed} {linearWg}></PlayOptions>

<style>

.text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.play__button {
  margin-bottom: 1%;
  -webkit-text-stroke-width: 0;
}

.title {
	color: black;
	-webkit-text-stroke-color: white;
	-webkit-text-stroke-width: 3px;
	font-weight: 700;
}

.subtitle {
	color: black;
	-webkit-text-stroke-color: white;
	-webkit-text-stroke-width: 3px;
	font-weight: 700;
  margin-bottom: 0;
}

.indented {
  padding-left: 20px;
}

</style>
