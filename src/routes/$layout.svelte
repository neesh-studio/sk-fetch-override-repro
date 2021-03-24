<script context="module">
  import { getFestival, query } from "$lib/api";
  export async function load({ fetch }) {
    const queryString = getFestival("de", "first-festival");
    const response = await query(queryString, fetch);
    console.log(response);
    return { props: { response } };
  }
</script>

<script>
  export let response;
</script>

<h2>from layout: {response.title}</h2>
<ul />

<slot />
