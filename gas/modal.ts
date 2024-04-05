
import { MatchingCls,xorShiftRandom } from "./code";


function onOpen() {
    SpreadsheetApp.getUi()
    .createMenu("環境設定")
    .addItem("googleカレンダーの設定","")
    .addToUi();
    SpreadsheetApp.getUi()
    .createMenu("シフト設定")
    .addItem("exampleダイアログを表示", "showExampleDialog")
    .addToUi();
}

function showExampleDialog() {
  const html = HtmlService
    .createHtmlOutputFromFile("exampleExampleDialog")
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp
    .getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showModalDialog(html, "My custom dialog");
}

/**
 * # test00
 */
function test00(){
  const mc = new MatchingCls();
  let tasks = mc.getWorksCalendar("2024/04/02")!;
  for (const event of tasks!){
    console.log(mc.getTasksFromWorkEvent(event));
    let staffs = mc.getStaffFromTimeRange(
        event.getStartTime(),
        event.getEndTime()
    );
    console.log(staffs!);
  }
}

function test01() {
    
}

