<script>
    export let options = {} // Record<value, label>
    export let value


    export let small = false


    import { Segmented, Button } from 'framework7-svelte'
</script>

<Segmented strong>
    {#each Object.entries(options) as [optionValue, label] (optionValue)}
        <Button {small} active={value === optionValue} onClick={() => value = optionValue}>{label}</Button>
    {/each}
</Segmented>