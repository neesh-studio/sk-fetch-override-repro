<script context="module">
  import { getFestival, query } from "$lib/api";
  //   export async function load({ fetch }) {
  //     const queryString = getEventsForProgram("de", "2021-03-01");
  //     const response = await query(queryString, fetch);
  //     console.log(response);
  //     return {response};
  //   }

  export async function load({ fetch }) {
    const queryString = getFestival("de", "another-festival");
    const response = await query(queryString, fetch);
    console.log(response);
    return { props: { response } };
  }
</script>

<script lang="ts">
  import Counter from "$lib/Counter.svelte";
  export let response;
</script>

<main>
  <h2>from index: {response.title}</h2>
</main>

<style>
</style>
