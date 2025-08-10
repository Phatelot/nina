<script lang="ts">
  import BeforeAfter from './lib/BeforeAfter.svelte';
  import Chart from './lib/Chart.svelte';
  import WeighinDisplayer from './lib/WeighinDisplayer.svelte'

  let hash = $state(getHash());

  function getHash() {
    return location.hash.slice(1) || '/';
  }

  // Listen to hash changes
  window.addEventListener('hashchange', () => {
    hash = getHash();
  });

  // Simple navigation helper
  function navigate(path: string) {
    location.hash = path;
  }

  // Route table
  const routes = {
    '/': WeighinDisplayer,
    '/chart': Chart,
    '/before-afters': BeforeAfter,
  };

  // Pick the component based on the current hash
  const Component = $derived((routes as any)[hash] ?? WeighinDisplayer);

</script>

<main class="container-fluid">
  <nav>
    <ul>
      <li class="nav__item"><strong>Nina</strong></li>
    </ul>
    <ul>
      <li><a href="#/" onclick={() => navigate('/')} class="nav__item">Weigh-ins</a></li>
      <li><a href="#/before-afters" onclick={() => navigate('/before-afters')} class="nav__item">Before/Afters</a></li>
      <li><a href="#/chart" onclick={() => navigate('/chart')} class="nav__item">Chart</a></li>
    </ul>
  </nav>

  <Component />
</main>


<style>
.nav__item {
	color: black;
	-webkit-text-stroke-color: white;
	-webkit-text-stroke-width: 2px;
	font-weight: 700;
}

nav {
  position: relative;
  z-index: 10;
}
</style>
