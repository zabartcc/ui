<template>
	<div class="home">
		<div class="download_wrapper">
			<div class="download_container">
				<div class="top_text">
					<img src="https://zabartcc.sfo3.digitaloceanspaces.com/images/zab_logo.png" alt="Albuquerque ARTCC Logo" class="download_logo" height="150" width="150">
					<p class="title">Albuquerque ARTCC — Information Display System</p>
					<p class="description">
						The ZAB Information Display System (IDS) is a program that provides you with information useful when controlling and helps ease communication and coordination with fellow controllers. <br/><br />Select the download button for your operating system below to download and install the IDS.
					</p>
				</div>
				<div class="row downloads_row">
					<div class="col s12">
						<a class="btn waves-effect waves-light download_button windows" href="https://zabartcc.sfo3.digitaloceanspaces.com/ids/AlbuquerqueIDSInstall.exe" target="_blank">DOWNLOAD FOR WINDOWS</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'IDS',
	title: 'IDS'
};
</script>

<style scoped lang="scss">
.home {
	width: 100%;
	height: 100vh;
	background: url('@/assets/images/ids_background.jpg');
	color: #fff;
}

.home::before {
	background: rgba(33, 33, 33, 0.7);
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	content: "";
}

.download_logo {
	display: block;
	margin: auto;
}

.download_wrapper {
	padding-top: 80px;
}

.download_container {
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	width: 30%;
	min-width: 340px;
	z-index: 1;
	background-color: #1A1A1A;
	position: absolute;
	padding: 1em;
	margin-left: auto;
	margin-right: auto;
	left: 0;
	right: 0;

	.other_downloads {
		color: #6C6C6C;
		text-align: center;
		margin: 1em;
	}

	.smaller_download {
		text-align: center;
		color: #6C6C6C;
		text-decoration: underline;
		user-select: none;
	}

	.download_button {
		display: block;
		margin-top: 10px;
		margin-left: auto;
		margin-right: auto;

		&.windows {
			background-color: $secondary-color;
			width: 270px;
			height: 40px;
			font-size: 1.05rem;
		}
	}
}

.top_text {
	.title {
		font-size: 1.4em;
		font-weight: 600;
		text-align: center;
	}

	.description {
		width: 70%;
		word-break: break-word;
		margin: auto;
		line-height: 1.3rem;
	}
}

.downloads_row {
	margin-top: 30px;
}
</style>