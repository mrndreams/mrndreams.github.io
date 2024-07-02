<script>
    import { onMount } from 'svelte';

    const images = [
        "building.webp",
        "cat1.webp",
        "demon.webp",
        "sea.webp",
        "hand.webp",
        "water.webp",
        "river.webp",
        "gate.webp",
        "train.webp",
        "karen.webp",
        "travel.webp",
        "neon.webp",
        "neon2.webp",
        "building3.webp",
        "building4.webp",
        "park1.webp",
        "park2.webp",
        "sign.webp",
        "cat2.webp",
        "cat3.webp",
        "cat4.webp",
        "bluepool1.webp",
        "bluepool2.webp",
        "bluepool3.webp",
        "crt.webp"
    ]

    onMount(() => {
        images.forEach(image => {
            const img = document.createElement('img');
            img.src = `/assets/photos/${image}`;
            img.width = "150"
            img.style = "border: 2px solid rgba(224, 146, 164, 0.717); border-radius: 4px; cursor: auto;"
            img.addEventListener("click", (event) => {
                openPreview(event.target.src)
            })
            img.addEventListener("mouseover", (event) =>{
                event.target.style.cursor = "pointer"
            })
            document.getElementById("gallery-scroll").appendChild(img);
        })
    })

    function openPreview(path){
        var preview = document.getElementById("viewed-image")
        preview.style.visibility = "visible"
        preview.childNodes[0].src = path
        preview.addEventListener("click", (event) =>{
            console.log("squeak")
            preview.style.visibility = "hidden"
        })
    }
</script>

<main>
    <div id="gallery-scroll">
        
    </div>
</main>

<style>
    #gallery-scroll{
        overflow-y: scroll;
        overflow-x: hidden;
        display: grid;
        scrollbar-color: rgba(224, 146, 164, 0.717) rgba(131, 76, 89, 0.717) ;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 5px;
        grid-row-gap: 10px; 
        height: 558px;
        width: 100%;
        text-align: center;
        margin: 4px;
    }

    @media (min-width: 1560px) {
        #gallery-scroll{ 
            grid-template-columns: repeat(4, 1fr);
        }
    }
</style>