<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">404 – Page Not Found</span>
			<p>
				Cole and Gio made an uh-oh oopsie whoopsie uwu.
			</p>
			<p>
				We're sorry, but the content you requested was not something we felt was important, or you typed something wrong. If you believe that you are receiving this message in error, please email the webmaster (wm@zabartcc.org). In the meantime, a cute pupper has been dispatched to ease your sorrows.
			</p>
			<p>
				<img src="@/assets/images/dog.jpg" alt="Cute dog">
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.card-content {
	p + p {
		margin-top: 1.5em;
	}
}
img {
	max-width: 100%;
}
</style>