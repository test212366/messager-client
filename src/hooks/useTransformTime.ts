export const useTransformTime = (time: string) => {

	const dateNow: Date = new Date(),
		dataL: any = dateNow.getUTCDate(),
		month: any = dateNow.getMonth(),
		yearNow: any = dateNow.getFullYear(),
		months: any[] = [
			{ name: 'Jan', cMonth: ' января ', id: 0 },
			{ name: 'Feb', cMonth: ' февраля ', id: 1 },
			{ name: 'Mar', cMonth: ' марта ', id: 2 },
			{ name: 'Apr', cMonth: ' апреля ', id: 3 },
			{ name: 'May', cMonth: ' мая ', id: 4 },
			{ name: 'Jun', cMonth: ' июня ', id: 5 },
			{ name: 'Jul', cMonth: ' июля ', id: 6 },
			{ name: 'Aug', cMonth: ' августа ', id: 7 },
			{ name: 'Sep', cMonth: ' сентября ', id: 8 },
			{ name: 'Oct', cMonth: ' октября ', id: 9 },
			{ name: 'Nov', cMonth: ' ноября ', id: 10 },
			{ name: 'Dec', cMonth: ' декабря ', id: 11 }
		]

	let localCurrentTime = time
	if (localCurrentTime) {
		localCurrentTime = localCurrentTime.slice(4, 21)
		let monthF: string = localCurrentTime.slice(0, 3),
			day: any = localCurrentTime.slice(4, 6),
			year: string = localCurrentTime.slice(6, 11),
			handlerMonthId: any = false
		const time: string = localCurrentTime.slice(11),
			handlerMonths = async () => {

				await months.forEach(mon => {
					if (mon.name === monthF) {
						handlerMonthId = mon.id
						if (mon.id === month && +day === dataL && +year === yearNow || mon.id === month && +day + 1 === dataL && +year === yearNow && +year === yearNow || mon.id === month && +day + 2 === dataL && +year === yearNow) return monthF = ''
						monthF = mon.cMonth
					}
				})
				if (+day == dataL && handlerMonthId === month && year == yearNow) day = 'сегодня'
				if (+day + 1 == dataL && handlerMonthId === month && year == yearNow) day = 'вчера'
				if (+day + 2 == dataL && handlerMonthId === month && year == yearNow) day = 'позавчера'
				if (year == yearNow) year = ''
				if (time.length === 6 && +day < 10) day = +day
				return day + monthF + year + ' в ' + time
			},
			currentTime = handlerMonths()
		return currentTime
	}

}