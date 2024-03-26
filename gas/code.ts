// calendar 

class MatchingCls{

  private worksSheet:GoogleAppsScript.Spreadsheet.Sheet;
  private staffSheet:GoogleAppsScript.Spreadsheet.Sheet;
  private calendar  :GoogleAppsScript.Calendar.Calendar;

  constructor (){
    // get id
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty("spreadsheetID");
    const calendarId = PropertiesService.getScriptProperties().getProperty("calendarID");
    // get calendar
    this.calendar = CalendarApp.getCalendarById(calendarId!);
    // spreadSheet
    let spreadSheet = SpreadsheetApp.openById(spreadsheetId!);
    this.worksSheet = spreadSheet.getSheetByName("works")!;
    this.staffSheet = spreadSheet.getSheetByName("staff")!;
  }

  getWorks(){
    let rlist:Array<String> = [];
    let range = this.worksSheet.getDataRange();
    for (const work of range.getValues()){
      rlist.push(work[0]);
    }
    return rlist;
  }

  getStaff(){
    // get all rows
    let range = this.staffSheet.getDataRange();
    return range.getValues();
  }
}


/**
 * # test00
 */
function test00(){
  const mc = new MatchingCls();
  console.log(mc.getWorks());
  console.log(mc.getStaff());
}

