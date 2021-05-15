<script>
    export let address
    export let truncated = false


    function truncateAddress(address){
        return address.slice(0, 6) + '...' + address.slice(-4)
    }
</script>


<span class="address">{truncated ? truncateAddress(address) : address}</span>