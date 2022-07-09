<template>
	<div class="card">
		<div class="card-content">
			<span class="card-title">Privacy Policy</span>
			<p>
				As a guest, the Albuquerque ARTCC does not collect any data about you, except:
				<ul class="browser-default">
					<li>when you log in with your VATSIM account. Some personal information is shared with us, including, but not limited to, your name, email address, VATSIM ID and rating. You are not required to log in to access most parts of our website.</li>
					<li>when you submit feedback on our website. In this case, we'll only collect the data you choose to submit through the form. Your name, email address, and VATSIM ID are always collected and shared with the ATM, DATM, and TA. You'll also need to log in through VATSIM to submit feedback.</li>
					<li>when you encounter an error on our website. In this case, we'll only collect basic, non-identifiable information about your browser, OS, and the error you encountered.</li>
				</ul>
			</p>
			<p>
				As a member, the Albuquerque ARTCC collects, in addition to the points above, some personal information about you and your usage of our website, for example:
				<ul class="browser-default">
					<li>anything you choose to share with us through our website. Like availability for training sessions. Or your Discord handle.</li>
					<li>actions you perform on our website or on VATSIM. Like signing up for an event. Or controlling a position within our ARTCC.</li>
				</ul>
				We may share this information with VATSIM and other subdivisions within VATUSA.
			</p>
			<p>
				We do not store any cookies on your computer, except for functional cookies that are needed to make our website work, like identification tokens. You may choose to disable cookies through your browser at the cost of being able to log in.
			</p>
			<p>
				Given the nature of our services, it is not possible to opt out of data collection and use our services. But if you desire to opt out and no longer use our services, we will purge all information we have collected upon written request. The first step is to deactivate and request VATSIM to purge your data. Please head to <a href="https://membership.vatsim.net/" noopener noreferrer target="_blank">https://membership.vatsim.net/</a> to do so. VATSIM, after processing your opt out, will forward the request to VATUSA and the Albuquerque ARTCC for processing.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PrivacyPolicy',
	title: 'Privacy Policy'
};
</script>

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