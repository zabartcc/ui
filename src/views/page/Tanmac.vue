<template>
	<div>
		<div class="card home_intro">
			<div class="card-content">
				<span class="card-title">The Arizona/New Mexico Aviation Club (TANMAC)</span>
				<p>
					Welcome to TANMAC! This is the home of ZAB's training operations team. Please read below to get an idea of what TANMAC is, what it isn't and why it is used.
				</p>
				<h4>What TANMAC <span class="bi">Isn't</span>:</h4>
				<p>
					<ul>
						<li>Permission to break any part of the VATSIM CoC or any ZAB Policies.</li>
						<li>An avenue to be mean to students.</li>
						<li>An excuse to behave poorly.</li>
						<li>A group of rogue pilots.</li>
					</ul>
				</p>
				<h4>What TANMAC <span class="bi">Is</span>:</h4>
				<p>
					TANMAC is a way for members of the ZAB community to give back to their fellow controllers by providing traffic during training sessions that is unique, complex or otherwise difficult to get during regular network operations. TANMAC has always and will always be about learning - a way for students to learn how to handle procedures they wouldn't normally see <span class="bi">and</span> a way for pilots to learn how to fly procedures they wouldn't normally fly. For everyone, it should be fun!
				</p>
				<h4>How it Works:</h4>
				<p>
					When the need for TANMAC arises, the instructor or mentor will ping the @TANMAC role in the ZAB Discord in the <code>#tanmac</code> channel with the following information:
					<ul>
						<li>The student.</li>
						<li>The date and time of the training session.</li>
						<li>Whether or not it is an OTS.</li>
						<li>Any special requests or restrictions for the pilots.</li>
					</ul>
					Because every student is at a different point in their training, some mentors/instructors will enforce restrictions on the pilots. If they do, you <span class="bi">must</span> adhere to them, or you will be removed from TANMAC.
				</p>
				<h4>Some General Rules:</h4>
				<p>
					<ul>
						<li>If you file a flight plan, please place <code>OPR/TANMAC</code> in your remarks. This helps mentors/instructors identify you from other pilots.</li>
						<li>Check with the instructor or mentor before calling up to make sure that they are ready for your flight.</li>
						<li>Keep your requests reasonable for the controller's capability. If you can tell that the controller is nervous, struggling or otherwise having issues, tone it down. However, the flipside of this is that if the controller is knocking it out of the park, hit them with anything (within the restrictions set by the mentor/instructor).</li>
						<li>Coordinate with other TANMAC pilots (via <code>#tanmac</code> or the TANMAC voice channel ONLY). There are certain situations where having 2 or 3 pilots working together to present a complex situation is necessary. Again, make sure you are working within the restrictions set by the mentor/instructor.</li>
						<li>Don't pester the mentor/instructor during the session if you observe mistakes made by the student. Note down any deficiencies and include them in a <router-link to="/tanmac/pfr">TANMAC PFR</router-link>.</li>
					</ul>
					Specifically for OTS sessions, you will not be restricted by the instructor - go all out. However, if the instructor needs to see a specific situation, you may be asked to fly it.
					<br /><br />
					<span class="bi">Remember, the purpose of TANMAC is so that the student can succeed.</span> If you are flying to get the student to fail, you are doing it wrong and you will be removed from TANMAC.
				</p>
				<h4>Ideas:</h4>
				<p>
					Here are some good ideas for TANMAC pilots for each kind of training session. Feel free to do anything up to and including the type of session (doing ground stuff for a tower session, etc.).
					<br /><br />
					<span class="bi">Ground sessions:</span><br />
					These are actually the least common session you will get a TANMAC request for, because the vast majority of groud training sessions are conducted on sweatbox. However, if one does pop up, here's some ideas:
					<ul>
						<li>File a flight plan that violates an LOA.</li>
						<li>Call up for a VFR departure.</li>
					</ul>
					<span class="bi">Tower sessions:</span><br />
					Everything above, as well as:
					<ul>
						<li>Pattern work! (Especially more than one aircraft, preferrably with differing performance)</li>
						<li>VFR Transitions.</li>
						<li>VFR Departures/Arrivals.</li>
						<li>Helicopter ops.</li>
						<li>Military ops (overhead, flameout, etc)</li>
					</ul>
					<span class="bi">Albuquerque Approach sessions:</span><br />
					Everything above, as well as:
					<ul>
						<li>Operations at fields other than KABQ (KAEG, KBRG and E98 are all within ABQ_APP).</li>
						<li>VFR practice approaches</li>
						<li>Uncontrolled airport ops (KBRG and E98) - specifically IFR releases, pop-up IFR, etc.</li>
					</ul>
					<span class="bi">Phoenix Approach sessions:</span><br />
					This is where the mood kind of changes. While everything above is totally fine, at this point a student should know how to handle the oddities. We still need those oddities, but what we really need is VOLUME. It is beneficial to have both airliners, as well as small planes participating, because it helps the student learn how to handle the differences in performance. These sessions are where we teach advanced sequencing, spacing, vectoring and more. Here's some ideas:
					<ul>
						<li>Fly IFR into PHX/IWA from ABQ, ELP or TUS (or elsewhere!). Use the notification sent in <code>#tanmac</code> to time your flight.</li>
						<li>Fly IFR out of PHX/IWA.</li>
					</ul>
					<span class="bi">Albuquerque Center sessions:</span><br />
					Again, like for Phoenix approach, what we need here is <span class="bi">VOLUME, VOLUME, VOLUME</span>. We are teaching how to manage 6 TRACONS, as well as all the little airports at the same time, time management, frequency management, etc. We don't really have any specific ideas, just bring your plane out and fly.
				</p>
				<h4>Some Final Thoughts</h4>
				<p>
					In no particular order, here are some final thoughts:
					<ul>
						<li>Please know how to fly your plane and how to fly the request you are making.</li>
						<li>Remember that the purpose of TANMAC is learning and fun. If you come out and fly for a student, it makes them more likely to come out and fly for you.</li>
						<li>Please listen to the mentor/instructor. If they ask you to tone it down, you are expected to comply. If they need a specific situation, please fly it (unless you are unfamiliar, then let the mentor/instructor know that).</li>
					</ul>
				</p>
				<h4>Joining</h4>
				<p>
					If you would like to join TANMAC, please drop a Discord message to any member of the ZAB training staff.
				</p>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	title: "TANMAC",
};
</script>

<style scoped lang="scss">
h4 {
	font-size: 1.3em;
	font-weight: 300;
}

.bi {
	font-weight: 700;
	font-style: italic;
}

ul {

	li {
		list-style: disc outside;
		margin-left: 2em;
	}
}

a {
	text-decoration: underline;
}

code {
	background-color: $gray-light;
	color: $secondary-color;
	padding: 2px;
}

</style>