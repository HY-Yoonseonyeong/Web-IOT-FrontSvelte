<script>
    import {page} from '$app/stores';
    import {posts} from "../data";

    let id;
    $: {
        id = $page.params.id;
        console.log(id)
    }
</script>

<h1>{posts[id].title}</h1>