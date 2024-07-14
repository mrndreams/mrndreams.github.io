<script>
    import SpotifyWidget from "../Components/SpotifyWidget.svelte"
</script>

<main>
    <div id="about-top">
        <div id="about-top-top">
            <div id="about-pfp">
                <img src="./assets/pfp.webp" width="200" alt="Profile picture of an old TV with M.R.N on it">
            </div>
            <div id="about-names">
                <h1>MRNDREAMS</h1>
                <h2>evelyn</h2>
                <h3>evie</h3>
                <h4>mrn</h4>
            </div>
        </div>
        <div id="about-top-links">
            <div>discord<a href="https://discord.com/users/596005713499652126" target="_blank"><span></span></a></div>
            <div>instagram<a href="https://www.instagram.com/mrndreams/" target="_blank"><span></span></a></div>
            <div>steam<a href="https://steamcommunity.com/profiles/76561198813369697" target="_blank"><span></span></a></div>
            <div>github<a href="https://github.com/mrndreams" target="_blank"><span></span></a></div>
        </div>
    </div>
    <div id="about-bottom">
        <h2>about me</h2>
        <p id="about-me-text">
            im evelyn or mrn &lt;3 im a rotmaxxing neet trans girl and nightmare island resident (uk) im always working on things, programming stuff, music, photos, random ass google docs.. a lot of it doesnt see the light of day except photos but, maybe one day ill finish something cool. one cool thing i have finished though is <i>this</i> website using svelte for my socials i hope you like it ^w^
            <br><br>
            the music i like is just loser music like green day and car seat headrest genuinely never give me the aux cable. ive also got a thing for tech like, crt's, ipods and old machines that can be repurposed into joining the IED of a homelab i have. and by "a thing for tech" i also mean i yearn to have components and abandon my flesh 
            <br><br>
            i love you oomf look after yourself &lt;3
        </p>
    </div>
    <div id="about-footer">
        <svelte:component this={SpotifyWidget}/>
    </div>
</main>

<style>
    main{
        max-height: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: normal;
        align-content: normal;
    }
    main > div{
        width: 100%;
    }
    #about-top-top{
        height: fit-content;
        display: flex;
        gap: 2%;
        align-items: top;
    }
    #about-pfp > img{
        border: 2px solid rgb(231, 150, 128);
        max-width: 15vw;
        min-width: 169px;
    }
    #about-names{
        /* text-align: center; */
        text-align: left;
        width: 100%;
        container-type: inline-size;
    }
    #about-names > h1{
        margin-left: auto;
        font-family: Akira;
        color: white;
        /* font-size: 2.3vw; */
        font-size: 9cqw;
        margin: 0px;
    }
    #about-names > *{
        margin: 0px;
        color: rgba(255, 255, 255, 0.743);
        font-family: NevaLight;
    }
    #about-top-links{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }
    #about-top-links > div{
        padding: 0.4em;
        width: 20%;
        background-color: rgb(144, 59, 42);
        font-family: Neva;
        font-size: 1em;
        transition: 0.2s;
        color: #fdbea0;
        position: relative;
    }
    #about-top-links > div:hover{
        background-color: rgb(184, 97, 60);
        letter-spacing: 1px;
        color: white;
    }
    #about-top-links > div > a > span{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
    }
  
    #about-bottom{
        display: block;
        text-align: left;
        max-height: 450px;
        overflow: hidden auto;
    }
    #about-bottom > h2{
        color: rgba(255, 255, 255, 0.474);
        margin: 0px;
        margin-top: 6px;
        font-family: Neva;
    }
    #about-me-text{
        font-family: NevaLight;
        color: white;
        margin-top: 5px;
        font-weight: bold;
        font-size: 16px;
    }

    #about-footer{
        flex-grow: 2;
    }
</style>