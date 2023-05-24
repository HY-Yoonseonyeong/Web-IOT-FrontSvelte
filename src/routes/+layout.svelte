<script>
    // import Header from './Header.svelte';
    // import './styles.css';
    import {handle} from '../hooks.sever'

</script>

<div class="app">
  <!--<Header />-->
  <slot/>
  <!--<footer>
    <p>HYNUX-IOT 2023 ©<a href="https://hynux.co.kr/">HYNUX</a></p>
  </footer>-->
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    footer a {
        font-weight: bold;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
