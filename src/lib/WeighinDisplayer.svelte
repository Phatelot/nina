<script lang="ts">
  import IndexSelector from './IndexSelector.svelte';
  import Nina from './Nina.svelte';
  import { ninasBMIForWeight } from './nina_stats';
  import PlayOptions from './PlayOptions.svelte';
  import { delayForLinearWgSpeed, delayForSpeed, type PlaySpeed } from './PlaySpeed';
  import weighings from './weighings.json';
  import { formatBMI, toBMICategory } from './weight_utils';

  let isPlaying = $state(false)
  let currentPlayNumber = $state(0)
  let selectedSpeed: PlaySpeed = $state('default')
  let linearWg = $state(false);

  let selectedWeighingIndex = $state(weighings.length - 1)

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
    (weighings[selectedWeighingIndex + 1].weightInLbs - weighings[selectedWeighingIndex].weightInLbs) * delayForLinearWgSpeed(selectedSpeed) :
    (weighings[selectedWeighingIndex + 1].weightInLbs - weighings[selectedWeighingIndex].weightInLbs) * delayForSpeed(selectedSpeed)
    setTimeout(() => {
      if (isPlaying && playNumber === currentPlayNumber) {
        selectedWeighingIndex++
        queueNextPic(playNumber)
      }
    }, delay)
  }
</script>

<h2 class="title">Day {weighings[selectedWeighingIndex].day}</h2>

<Nina weighingIndex={selectedWeighingIndex} size='L'/>

{#snippet middleButton()}
  <button onclick="{togglePlayFromFirst}" class="play__button"> {isPlaying ? "pause" : "play from first"} </button>
{/snippet}

<IndexSelector minValue={0} maxValue={weighings.length - 1} bind:currentValue={selectedWeighingIndex} disabled={isPlaying} listenForKeyboardEvents={true} {middleButton}/>

<div class="text-wrapper">
  <p style="color: black">Nina weighs {weighings[selectedWeighingIndex].weightInLbs}lbs.</p>
  <p style="color: black">She is {toBMICategory(ninasBMIForWeight(weighings[selectedWeighingIndex].weightInLbs))} (BMI: {formatBMI(ninasBMIForWeight(weighings[selectedWeighingIndex].weightInLbs))}).</p>
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

</style>
