class Moment {
    dateObject = new Date();

    date = {
        day: this.getDay(),
        month: this.getMonth(),
        year: this.getYear(),
    }

    time = {
        hours: this.getHours(),
        minutes: this.getMinutes(),
        seconds: this.getSeconds(),
    }

    getDay() {
        let day = this.dateObject.getDate();

        if (day < 10)
            day = `0${day}`;

        return day;
    }

    getMonth() {
        let month = this.dateObject.getMonth() + 1;

        if (month < 10)
            month = `0${month}`;

        return month;
    }

    getYear() {
        return this.dateObject.getFullYear();
    }

    getHours() {
        let hours = this.dateObject.getHours();

        if (hours < 10)
            hours = `0${hours}`;

        return hours;
    }

    getMinutes() {
        let minutes = this.dateObject.getMinutes();

        if (minutes < 10)
            minutes = `0${minutes}`;

        return minutes;
    }

    getSeconds() {
        let seconds = this.dateObject.getSeconds();

        if (seconds < 10)
            seconds = `0${seconds}`;

        return seconds;
    }

    getDateISO() {
        return `${this.date.year}-${this.date.month}-${this.date.day}`;
    }

    getTimeISO() {
        return `${this.time.hours}:${this.time.minutes}`;
    }

    getDateTimeISO() {
        return `${this.getDateISO()}, ${this.getTimeISO()}`;
    }

    getDateTimeLocal() {
        return `${this.date.day}.${this.date.month}.${this.date.year}, ${this.time.hours}:${this.time.minutes}`;
    }

    convertLocalDateToISO(dateToReverse) {
        const pulledOutDate = dateToReverse.split(',');
        const [day, month, year] = pulledOutDate[0].split('.');

        return `${month}-${day}-${year},${pulledOutDate[1]}`;
    }

}

export default Moment;