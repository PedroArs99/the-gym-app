const dateLocale = 'en-US';
const dateFormatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };

export function toShortDate(date: Date | string) {
	const parsedDate = new Date(date);

	return parsedDate.toLocaleDateString(dateLocale, dateFormatOptions);
}
