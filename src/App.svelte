<script lang="ts">
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
</style>
