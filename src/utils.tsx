import { parse, isWithinInterval, format, isFuture } from 'date-fns';

// Get the current date
const currentDate = new Date();
// Get the day of the week as a number (0-6)
const dayOfWeek = currentDate.getDay();
// Define an array of day names
const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Get the key for the current day based on the day of the week
export const currentDayKeyOpen = daysOfWeek[dayOfWeek] + 'Open';
export const currentDayKeyClose = daysOfWeek[dayOfWeek] + 'Close';

enum WeekDays {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}

export function isFutureDate(date: string) {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
  return isFuture(parsedDate);
}

// english name of the day in croatian
export function englishToCroatian(day: string) {
  switch (day) {
    case 'monday':
      return 'Ponedjeljak';
    case 'tuesday':
      return 'Utorak';
    case 'wednesday':
      return 'Srijeda';
    case 'thursday':
      return 'Četvrtak';
    case 'friday':
      return 'Petak';
    case 'saturday':
      return 'Subota';
    case 'sunday':
      return 'Nedjelja';
    default:
      return '';
  }
}

const currentDay = daysOfWeek[dayOfWeek] as keyof typeof WeekDays;
export const currentDayInCroatian = getDayNameInCroatian(WeekDays[currentDay]);

function getDayNameInCroatian(day: WeekDays): string {
  switch (day) {
    case WeekDays.monday:
      return 'Ponedjeljak';
    case WeekDays.tuesday:
      return 'Utorak';
    case WeekDays.wednesday:
      return 'Srijeda';
    case WeekDays.thursday:
      return 'Četvrtak';
    case WeekDays.friday:
      return 'Petak';
    case WeekDays.saturday:
      return 'Subota';
    case WeekDays.sunday:
      return 'Nedjelja';
    default:
      return '';
  }
}

// Function to check if a specific day and time fall within opening hours
export function isOpen(openingHours: any, closingHours: any) {
  const currentTime = new Date();
  const openingTime = parse(openingHours, 'HH:mm', new Date());
  const closingTime = parse(closingHours, 'HH:mm', new Date());
  // Check if the provided time falls within the opening hours
  return isWithinInterval(currentTime, { start: openingTime, end: closingTime });
}

export function isTodayDayOff(nonWorkingDay: string) {
  const today = format(new Date(), 'yyyy-MM-dd');
  return nonWorkingDay.includes(today);
}
