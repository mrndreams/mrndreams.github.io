<script>
    import ColorPicker from 'svelte-awesome-color-picker';

    let hex = "#1cacbf"

    let rgb = {
    "r": 28,
    "g": 172,
    "b": 191,
    "a": 1
    }

    let hsv = {
    "h": 187,
    "s": 85,
    "v": 75,
    "a": 1
    }

    let color = "// instance of Colord"

    async function changeDeskLight(){
        const url = 'https://syltjdok7yqqibzwojow6tt5ny0ykkxb.lambda-url.us-east-1.on.aws/';
        hsv 
        const body = JSON.stringify({ h: hsv["h"], s: hsv["s"], v: hsv["v"]})

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.log(`Error: ${response.status} ${errorText}`);
                document.getElementById("desk-light-confirm").innerHTML = "Error"
                return
            }

            const result = await response.json();
            document.getElementById("desk-light-confirm").innerHTML = "Success!"
        } catch (error) {
            // console.error('Error changing lights:', error);
            console.log("Ignore error above ^^ request does actually go through somehow idk i dont know how cors works")
        }
        document.getElementById("desk-light-confirm").innerHTML = "Success!"
        document.getElementById("desk-light-confirm").disabled = true
        setTimeout(() => {
            document.getElementById("desk-light-confirm").innerHTML = "Change Lights!"
            document.getElementById("desk-light-confirm").disabled = false
        }, 2000)
    }
</script>

<main>
    <div id="desk-light">
        <h2>Change the colour of the strip lights around my desk</h2>
        <div id="color-picker">
            <ColorPicker
            bind:hex
            bind:rgb
            bind:hsv
            bind:color
            isAlpha={false}
            --cp-text-color="black"
            />
        </div>
        <button id="desk-light-confirm" on:click={changeDeskLight}>Change Lights!</button>
    </div> 
</main>

<style>
    main{
        display: grid;
        text-align: center;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 5px;
        grid-row-gap: 10px; 
        height: 100%;
        width: 100%;
    }
    #desk-light > h2{
        color: white;
        font-family: NevaLight;
    }
    #desk-light > #color-picker{
        font-family: Neva;
        background-color: white;
        /* border-radius: 5px; */
        border: 2px solid rgb(174, 174, 174);
        /* border: 5px solid transparent; */
    }
    #desk-light-confirm{
        margin-top: 5px;
        font-family: Neva;
        width: 100%;
        padding: 8px;
        background-color: rgb(81, 164, 81);
        border: 2px solid rgb(49, 94, 49);
        color: white;
    }
</style>