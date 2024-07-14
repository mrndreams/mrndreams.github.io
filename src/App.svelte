<script>
	import { onMount } from 'svelte';
    import About from './Sections/about.svelte';
    import Extras from './Sections/extras.svelte';
	
	var section_map = {
		"about": About,
		"extras": Extras
	}
	let selected_component = About

    onMount(() => {
		// Create listeners for each list element
		var sections = document.getElementById("main-nav-list").children;
		for(let i = 0; i < document.getElementById("main-nav-list").childElementCount; i++){
			sections[i].addEventListener("click", () => {
				nav_option_clicked(sections[i].innerText.split(" ")[0]);
			});
		}
    })

	function nav_option_clicked(identifier){
		selected_component = section_map[identifier]
	}

</script>

<main>
	<div id="main-box">
		<!-- <div id="main-nav">
			<ul id="main-nav-list">
				<li>about me</li>
				<li>photography</li>
				<li>development</li>
				<li>extras</li>
			</ul>
			<div id="main-nav-footer">
				<a href="https://mrndreams.digital">mrndreams.digital</a>
			</div>
		</div> -->
		<div id="main-content"> 
			{#if selected_component}
			<svelte:component this={selected_component}/> 
			{/if}
		</div>
	</div>
	<div id="website-version">Website Version 3.0.2</div>
    <div id="viewed-image"><img src="./assets/404.webp" height=800></div>
</main>

<style>
	main{
		background-image: url("../assets/background.webp");
		background-position: center;
		background-size: cover;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		text-align: center;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	#main-content{
		padding: 23px;
		opacity: 1;
	}

	#main-box{
		min-width: 581px;

		width: 50vw;
		height: 80vh;
		background-color: #482016;
  		border: var(--main-box-border);
		position: relative;
		display: flex;
		filter: drop-shadow(0px 0px 12px #bf5c52);
	}

	#main-nav{
		flex: 1;
		display: block;
		text-align: center;
		width: 100%;
		max-width: 200px;
		position: relative;
		border-right: var(--main-box-border);
	}
	#main-nav > #main-nav-footer{
		position: absolute;
		bottom: 0;
		left: 0;
		text-align: center;
		width: 100%;
		border-top: var(--main-box-border);
	}
	#main-nav-footer > a{
		color: white;
		font-family: NevaLight;
	}
	#main-nav-list{
		padding: 0px;
		margin: 0px;
	}
	#main-nav-list > li{
		font-size: 1.3em;
		font-family: Neva;
		color: #fdbea0;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: var(--main-box-border);
		width: 100%;
		transition: 0.2s;
	}
	#main-nav-list > li:hover{
		background-color: #6f3724;
		color: white;
		letter-spacing: 1px;
		cursor: pointer;
	}

	#main-content{
		flex: 3;
	}

	#website-version{
		position: absolute;
		bottom: 0;
		right: 0;
		font-family: Akira;
		color: rgba(255, 255, 255, 0.518);
	}

	#viewed-image{
		position: absolute;
		top: 0px;
		left: 0px;
		background-color: rgba(0, 0, 0, 0.767);
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		visibility: hidden;
		cursor: pointer;

        /* visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 78vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.606);
        filter: drop-shadow(0px 0px 0.2rem black); */
        /* padding: 200px; */
        /* display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer; */
    }
    #viewed-image > img{
        cursor: auto;
    }
</style>