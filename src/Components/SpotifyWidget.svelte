<script>
    import { onMount } from 'svelte';

    var serviceHost = "https://spotify-status.evelinear.workers.dev";
    var spotifyUser = "Eve";

    let songData = null;
    let progressInterval = null;

    function updatePlayer() {
        fetch(`${serviceHost}/get-now-playing`)
        .then(response => response.json())
        .then(data => {
            if (data.ERROR || !data.is_playing) {
                resetPlayer();
                return;
            }
            
            songData = data;
            updateUI();
            startProgressTimer();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resetPlayer();
        });
    }

    function resetPlayer() {
        songData = null;
        clearInterval(progressInterval);
        updateUI();
    }

    function updateUI() {
        if(document.getElementById("player-album-art") == null){
            return;
        }

        const playerSong = document.getElementById("player-song");
        const playerArtist = document.getElementById("player-artist");
        const playerAlbumArt = document.getElementById("player-album-art");
        const playerProgress = document.getElementById("player-progress");

        if (!songData) {
            playerAlbumArt.setAttribute("src", "/assets/404.webp");
            playerSong.textContent = "Not playing anything";
            playerArtist.textContent = "";
            playerProgress.textContent = "";
        } else {
            playerSong.textContent = songData.item.name;
            playerArtist.textContent = " - " + songData.item.artists[0].name;
            playerAlbumArt.setAttribute("src", songData.item.album.images[1].url);

            var space_width = Math.round(document.getElementById("player-far-right").offsetWidth)

            const progressBar = generateProgressBar(songData.progress_ms, songData.item.duration_ms, space_width/14);
            playerProgress.textContent = progressBar;
        }
    }

    function generateProgressBar(progressMs, durationMs, width = 10) {
        const progressSeconds = Math.ceil(progressMs / 1000);
        const totalSeconds = Math.ceil(durationMs / 1000);
        const progressPercentage = (progressSeconds / totalSeconds) * 100;
        const progressBarLength = Math.floor(progressPercentage * (width / 100));
        const progressBar = "[" + "#".repeat(progressBarLength) + "_".repeat(width - progressBarLength) + "]";
        return progressBar;
    }

    function startProgressTimer() {
        clearInterval(progressInterval);
        progressInterval = setInterval(updatePlayer, 4000);
    }

    // Periodically check for player updates
    setInterval(updatePlayer, 10000);

    // Initial load
    onMount(() => {
        updatePlayer();
        document.getElementById("player-progress").innerHTML = ""
    })
</script>

<main>
    <img id="player-album-art" width=80 height=80/> 
    <div id="player-right">
        <p>Listening to...</p>
        <b><p id="player-song"></p></b>
        <p id="player-artist"></p>
    </div>
    <div id="player-far-right">
        <p id="player-progress"></p>
    </div>
</main>

<style>
    main{
        /* max-width: 500px;
        max-height: 200px; */
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0.2em;
        /* padding-top: 2px; */
        color: white;
        justify-content: left;
        align-items: center;
        font-family: NevaLight;
        white-space: nowrap;
    }
    #player-right{
        margin-left: 2%;
        display: block;
        text-align: left;
    }
    #player-right > p {
        margin: 2px;
    }
    #player-right > b > p {
        margin: 2px;
    }
    #player-song{
        font-family: inherit;
    }
    #player-artist{
        font-style: italic;
    }
    #player-album-art{
        border-radius: 10px;
        /* width: 100%; */
        aspect-ratio: 1/1;
        /* height: 100%; */
    }
    #player-far-right{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
    }
</style>

