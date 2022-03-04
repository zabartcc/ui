/**
 * Whenever making a new date getter, please define what the date would look like with the reference time of:
 * Monday, January 2, 2006, 15:04:05 (The Golang reference time)
 * Every date getter should take an ISODate (2006-01-02T15:04:05.000Z).
 */

export default {
	dtLong(isoDate) { // January 2, 2006, 15:04z
		const d = new Date(isoDate);
		return `${d.toLocaleString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric', 
			timeZone: 'UTC', 
			hour: '2-digit', 
			minute: '2-digit',
			hourCycle: 'h23'
		})}z`;
	},
	dtFull(isoDate) { // Monday, January 2, 2006, 15:04:05
		const d =  new Date(isoDate);
		return d.toLocaleString('en-US', {
			weekday: 'long', 
			month: 'long', 
			day: 'numeric',
			year: 'numeric', 
			timeZone: 'UTC', 
			hour: '2-digit', 
			minute: '2-digit', 
			second: '2-digit', 
			hourCycle: 'h23'
		});
	},
	dLong(isoDate) { // January 2, 2006
		const d =  new Date(isoDate);
		return d.toLocaleString('en-US', {
			month: 'long', 
			day: 'numeric',
			year: 'numeric', 
			timeZone: 'UTC',
		});
	},
	dtStandard(isoDate) { // 2006-01-02, 15:04
		const d = new Date(isoDate);
		return d.toISOString().slice(0, -8).replace('T', ', ');
	},
	dtRegionalUS(isoDate) { // 1/2/2006, 15:04
		const d = new Date(isoDate);
		return d.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric', timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
	}
};