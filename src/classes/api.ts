import SimpleCalendar from "./simple-calendar";
import {DateParts, DateTimeIntervals} from "../interfaces";
import {Logger} from "./logging";

export default class API{
    /**
     * Get the timestamp for the current year
     */
    public static timestamp(){
        if(SimpleCalendar.instance && SimpleCalendar.instance.currentYear){
            return SimpleCalendar.instance.currentYear.toSeconds();
        }
        return 0;
    }

    /**
     * Takes in a current time stamp and adds the passed in interval to it and returns the new time stamp
     * @param currentSeconds
     * @param interval
     */
    public static timestampPlusInterval(currentSeconds: number, interval: DateTimeIntervals){
        if(SimpleCalendar.instance && SimpleCalendar.instance.currentYear){
            const clone = SimpleCalendar.instance.currentYear.clone();
            const dateTime = clone.secondsToDate(currentSeconds);
            clone.updateTime(dateTime);
            if(interval.years){
                clone.changeYear(interval.years, true, 'current');
            }
            if(interval.months){
                clone.changeMonth(interval.months, 'current');
            }
            if(interval.days){
                clone.changeDay(interval.days);
            }
            clone.time.changeTime(interval.hours, interval.minutes, interval.seconds);
            return clone.toSeconds();
        }
        return 0;
    }

    /**
     * Takes in a timestamp in seconds and converts it to a date object.
     * @param seconds
     */
    public static timestampToDate(seconds: number){
        const result = {
            year: 0,
            month: 0,
            day: 0,
            dayOfTheWeek: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            monthName: "",
            yearName: "",
            yearZero: 0,
            weekdays: <string[]>[]
        };
        if(SimpleCalendar.instance && SimpleCalendar.instance.currentYear){
            const dateTime = SimpleCalendar.instance.currentYear.secondsToDate(seconds);
            result.year = dateTime.year;
            result.month = dateTime.month;
            result.day = dateTime.day;
            result.hours = dateTime.hour;
            result.minutes = dateTime.minute;
            result.seconds = dateTime.seconds;

            const month = SimpleCalendar.instance.currentYear.months[dateTime.month];
            result.monthName = month.name;
            result.yearZero = SimpleCalendar.instance.currentYear.yearZero;
            result.yearName = SimpleCalendar.instance.currentYear.getYearName(result.year);
            result.dayOfTheWeek = SimpleCalendar.instance.currentYear.dayOfTheWeek(result.year, result.month, result.day);
            result.weekdays = SimpleCalendar.instance.currentYear.weekdays.map(w => w.name);
        }
        return result;
    }

    /**
     * Attempts to convert the passed in seconds to an interval (day, month, year, hour, minute, second etc)
     * @param seconds
     */
    public static secondsToInterval(seconds: number){
        let results = {
            years: 0,
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        if(SimpleCalendar.instance && SimpleCalendar.instance.currentYear) {
            results = SimpleCalendar.instance.currentYear.secondsToInterval(seconds);
        }
        return results;
    }

    /**
     * Returns the current status of the clock
     */
    public static clockStatus(){
        const data = {
            started: false,
            stopped: true,
            paused: false
        };
        if(SimpleCalendar.instance && SimpleCalendar.instance.currentYear){
            const status = SimpleCalendar.instance.currentYear.time.getClockClass();
            data['started'] = status === 'started';
            data['stopped'] = status === 'stopped';
            data['paused'] = status === 'paused';
        }
        return data;
    }

    /**
     * Shows the calendar. If a date is passed in, the calendar will open so that date is visible and selected
     * @param {DateParts | null} [date=null] The date to set as visible, it not passed in what ever the users current date will be used
     */
    public static showCalendar(date: DateParts | null = null){
        if(SimpleCalendar.instance && SimpleCalendar.instance.currentYear){
            if(date !== null){
                if(date.hasOwnProperty('year') && Number.isInteger(date.year) && date.hasOwnProperty('month') && Number.isInteger(date.month) && date.hasOwnProperty('day') && Number.isInteger(date.day)){
                    const isLeapYear = SimpleCalendar.instance.currentYear.leapYearRule.isLeapYear(SimpleCalendar.instance.currentYear.visibleYear);
                    SimpleCalendar.instance.currentYear.visibleYear = date.year;
                    if(date.month === -1 || date.month > SimpleCalendar.instance.currentYear.months.length){
                        date.month = SimpleCalendar.instance.currentYear.months.length - 1;
                    }
                    SimpleCalendar.instance.currentYear.resetMonths('visible');
                    SimpleCalendar.instance.currentYear.months[date.month].visible = true;

                    const numberOfDays = isLeapYear? SimpleCalendar.instance.currentYear.months[date.month].numberOfLeapYearDays : SimpleCalendar.instance.currentYear.months[date.month].numberOfDays;
                    if(date.day > 0){
                        date.day = date.day - 1;
                    }
                    if(date.day == -1 || date.day > numberOfDays){
                        date.day = numberOfDays - 1;
                    }
                    SimpleCalendar.instance.currentYear.resetMonths('selected');
                    SimpleCalendar.instance.currentYear.months[date.month].days[date.day].selected = true;
                    SimpleCalendar.instance.currentYear.months[date.month].selected = true;
                    SimpleCalendar.instance.currentYear.selectedYear = SimpleCalendar.instance.currentYear.visibleYear;
                } else {
                    Logger.error('SimpleCalendar.api.showCalendar: Invalid date passed in.');
                }
            }
            SimpleCalendar.instance.showApp();
        } else {
            Logger.error('The current year is not defined.');
        }
    }
}
