
import { MatchingCls,xorShiftRandom } from "./code";
import { matchingGraph,node } from "./matching";


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

/**
 * # test01
 * マッチングクラスのテスト
 */
function test01() {
    const works:Array<String> = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F"
    ]
    const staff_ability = [
        {
            name: "1",
            capable: ["B", "D"]
        },
        {
            name: "2",
            capable: ["A", "C", "E"]
        },
        {
            name: "3",
            capable: ["B"]
        },
        {
            name: "4",
            capable: ["D", "E", "F"]
        },
        {
            name: "5",
            capable: ["B", "D"]
        },
    ]

    ////nodeの設定
    const staff_nodes = [...Array(staff_ability.length)].map((i,j)=>new node(j,staff_ability[j]));
    const works_nodes = [...Array(works.length)]        .map((i,j)=>new node(j,works[j]));

    let mgraph = new matchingGraph(
        staff_nodes,
        works_nodes
    );//インスタンス化

    for (const i of staff_nodes){
        for (const j of i.data.capable){
            // jは役職の名前　例:A,B (..etc)
            mgraph.addSide(
                i.id,
                works.indexOf(j)
            );
        }
    }

    console.log(mgraph.maxMatching());
}

