<script>
    export let token
</script>


<img class="token-icon" title="{token.name} ({token.symbol})" src={token.logoURI} />


<style>
    .token-icon {
        border-radius: 100%;
        width: 2.4em;
        height: 2.4em;
    }
</style>