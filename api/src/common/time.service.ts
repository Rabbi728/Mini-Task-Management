import { forwardRef, Inject, Injectable } from "@nestjs/common";

@Injectable()
export class TimeService {
    private cachedTimezone: string | null = null
    private cacheExpiry: number = 0
    

    // constructor(
    //     @Inject(forwardRef(() => SettingsService))
    //     private readonly settingsService: SettingsService
    // ) { }

    // private async fetchTimezone(): Promise<string> {
    //     const now = Date.now()
    //     if (this.cachedTimezone && now < this.cacheExpiry) {
    //         return this.cachedTimezone
    //     }

    //     const setting = await this.settingsService.findByKey('timezone')
    //     const timezone = setting?.value || 'UTC'

    //     this.cachedTimezone = timezone
    //     this.cacheExpiry = now + 1440 * 60 * 1000
    //     return timezone
    // }

    // getTimezoneOffsetMs(timezone: string, date = new Date()) {
    //     const formatter = new Intl.DateTimeFormat('en-US', {
    //         timeZone: timezone,
    //         year: 'numeric',
    //         month: 'numeric',
    //         day: 'numeric',
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         second: 'numeric',
    //         hour12: false,
    //     });

    //     const parts = formatter.formatToParts(date);
    //     const partValues: { [key: string]: string } = {};

    //     parts.forEach(({ type, value }) => {
    //         partValues[type] = value;
    //     });

    //     const localTimeInTz = Date.UTC(
    //         parseInt(partValues.year),
    //         parseInt(partValues.month) - 1,
    //         parseInt(partValues.day),
    //         parseInt(partValues.hour) === 24 ? 0 : parseInt(partValues.hour),
    //         parseInt(partValues.minute),
    //         parseInt(partValues.second)
    //     );

    //     return localTimeInTz - date.getTime();
    // }

    // async getNow(): Promise<Date> {
    //     const timezone = await this.fetchTimezone()
    //     const offset = this.getTimezoneOffsetMs(timezone)
    //     const now = new Date()
    //     return new Date(now.getTime() + offset)
    // }

    // async getMomentNow(): Promise<string> {
    //     const timezone = await this.fetchTimezone()
    //     return moment().tz(timezone).format('YYYY-MM-DD HH:mm:ss')
    // }

    // async resetTimeCache() {
    //     this.cachedTimezone = null
    //     this.cacheExpiry = 0
    // }
}
