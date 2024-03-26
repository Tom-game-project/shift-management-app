// calendar 

function getCalendar(){
  // カレンダーを取得する
  const calendarId = PropertiesService.getScriptProperties().getProperty("calendarID");
  let calendar = CalendarApp.getCalendarById(calendarId!);
  console.log(calendar.getName());
}



