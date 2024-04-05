// calendar 

export class MatchingCls{

  private calendar  :GoogleAppsScript.Calendar.Calendar;

  constructor (){
    // get id
    const calendarId = PropertiesService.getScriptProperties().getProperty("calendarID");
    // get calendar
    this.calendar = CalendarApp.getCalendarById(calendarId!);
    // spreadSheet
  }

  /**
   * # test function
   */
  getCalendarName():String{
    return this.calendar.getName();
  }

  getWorksCalendar(day:string){
      let date = new Date(day);
      let events = this.calendar.getEventsForDay(date);
      let eventNum = events.length;
      console.log(eventNum);
      for (let i = 0; i < eventNum; i++) {
        let title = events[i].getTitle(); //予定のタイトル
        let startTime = events[i].getStartTime(); //予定の開始日時
        let endTime = events[i].getEndTime(); //予定の終了日時
        let description = events[i].getDescription(); //予定の説明
        let location = events[i].getLocation(); //場所
        console.log(title);
        console.log(startTime);
        console.log(endTime);
        console.log(description);
        return events;
    }
  }

  getStaff(){
    // get all rows
  }
}
