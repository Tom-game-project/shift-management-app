// calendar 

export class xorShiftRandom{
  private seed:number
  constructor (seed:number){
    this.seed = seed;
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >> 17;
    this.seed ^= this.seed << 5;
  }

  /**
   * # gen
   * シードをもとに乱数を生成する
   * @param end 
   * @param start 
   * @returns 
   */
  gen(end:number,start:number):number{
    console.log(this.seed);
    return this.seed % (end - start);    
  }
}


export class MatchingCls{

  private taskCalendar :GoogleAppsScript.Calendar.Calendar;
  private staffCalendar:GoogleAppsScript.Calendar.Calendar;

  constructor (){
    // get id
    const taskCalendarId  = PropertiesService.getScriptProperties().getProperty("taskcalendarID");
    const staffCalendarId = PropertiesService.getScriptProperties().getProperty("staffcalendarID");
    // get calendar
    this.taskCalendar  = CalendarApp.getCalendarById(taskCalendarId!);
    this.staffCalendar = CalendarApp.getCalendarById(staffCalendarId!);
  }

  getWorkEventById(id:string){
    return this.taskCalendar.getEventById(id);
  }

  /**
   * ## getStaffFromTimeRange
   * 取得した仕事の時間範囲からその時間帯に働けるスタッフを取得する
   * @param startTime 
   * @param endTime 
   * @returns 
   */
  getStaffFromTimeRange(
    startTime:GoogleAppsScript.Base.Date,
    endTime  :GoogleAppsScript.Base.Date
  ):GoogleAppsScript.Calendar.CalendarEvent[] {
    let events = this.staffCalendar.getEvents(startTime,endTime);
    return events;
  }

  /**
   * ## getWorksCalendar
   * ある日の仕事をすべて取得する
   * @param day 
   * @returns 
   */
  getWorksCalendar(day:string){
      let date = new Date(day);
      let events = this.taskCalendar.getEventsForDay(date);
      let eventNum = events.length;
      console.log("length of events",eventNum);
      for (let i = 0; i < eventNum; i++) {
        let title = events[i].getTitle(); //予定のタイトル
        let startTime = events[i].getStartTime(); //予定の開始日時
        let endTime = events[i].getEndTime(); //予定の終了日時
        let description = events[i].getDescription(); //予定の説明
        let location = events[i].getLocation(); //場所
        // console.log("title",title);
        // console.log("startTime",startTime);
        // console.log("startTime",startTime.getTime());
        // console.log("endTime",endTime);
        // console.log("description",description);
        return events;
    }
  }
}
