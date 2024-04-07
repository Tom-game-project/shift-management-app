
import { MatchingCls,xorShiftRandom} from "./code";
import { matchingGraph,node } from "./matching";


// # menu bar 

function onOpen() {
    SpreadsheetApp.getUi()
    .createMenu("シフト設定")
    .addItem("exampleダイアログを表示", "showExampleDialog")
    .addToUi();
    SpreadsheetApp.getUi()
    .createMenu("シフト作成")
    .addItem("一回分のシフトを作成", "showCreateShiftDialog")
    .addToUi();
}

function showExampleDialog() {
  const html = HtmlService
    .createHtmlOutputFromFile("exampleExampleDialog")
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp
    .getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showModalDialog(html, "example dialog");
}

function showCreateShiftDialog(){
  const html = HtmlService
    .createHtmlOutputFromFile("CreateShiftDialog")
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp
    .getUi() // Or DocumentApp or SlidesApp or FormApp.
    .showModalDialog(html, "一回分のシフトを作成");
}

// # 補助関数

/**
 * # getTasksFromWorkEvent
 * カレンダーイベントからタスクを抽出する関数
 * @param event 
 * @returns 
 */
function getTasksFromWorkEvent(event:GoogleAppsScript.Calendar.CalendarEvent):String[]{
  let works = event.getDescription();
  works = works.replace(/<span>/g,"\n");
  works = works.replace(/<\/span>/g,"\n");
  works = works.replace(/<br>/g,"\n");
  let workslist = works.split(/\n/);
  workslist = workslist.filter((a)=>a.length != 0);
  return workslist;
}


/**
 * # staff2matchingformat
 * マッチングライブラリに渡すために整形する関数
 * @param staffs 
 * @param works_list 
 * @returns 
 */
function staff2matchingformat(staffs:GoogleAppsScript.Calendar.CalendarEvent[],works_list:Array<String>){
  let rlist:Array<any> = [];
  for (const staff of staffs){
        let staff_name = staff.getTitle();
        let staff_cap = getTasksFromWorkEvent(staff);
        rlist.push({
            "name":staff_name,
            "capable":staff_cap.filter((a)=>works_list.includes(a))
        });
  }
  return rlist;
}

// # Call function

/**
 * # getWorksDataOfTheDay
 */
function getWorksDataOfTheDay(date:string):Array<any>{
  /**
   * i.title
   * i.date  yyyy/mm/dd
   * i.timeRange 
   * i.id
  */
  const mc = new MatchingCls();
  let rlist:Array<any> = [];
  let works = mc.getWorksCalendar(date)!;
  for (const a of works){
    let startDate = a.getStartTime();
    let endDate   = a.getEndTime();
    rlist.push({
      title    :a.getTitle(),
      date     :`${startDate.getFullYear()}/${String(startDate.getMonth()).padStart(2,'0')}/${String(startDate.getDate()).padStart(2,'0')}`,
      timeRange:`${String(startDate.getHours()).padStart(2,'0')}:${String(startDate.getMinutes()).padStart(2,'0')}~${String(endDate.getHours()).padStart(2,'0')}:${String(endDate.getMinutes()).padStart(2,'0')}`,
      id       :a.getId()
    });
  }
  return rlist;
}


/**
 * # genMatching
 * 仕事イベント固有のidを入力
 * @param caledarWorkEventId 
 * @returns 
 */
function genMatching(caledarWorkEventId:string){
  let matching_result;
  const mc = new MatchingCls();
  let work = mc.getWorkEventById(caledarWorkEventId)!;
  let staffs = mc.getStaffFromTimeRange(
      work.getStartTime(),
      work.getEndTime()
  );
  let works_list = getTasksFromWorkEvent(work);
  let staff_list = staff2matchingformat(staffs,works_list);
  console.log(staff_list);
  const staff_nodes = [...Array(staff_list.length)].map((i,j)=> new node(j,staff_list[j]));
  const works_nodes = [...Array(works_list.length)].map((i,j)=> new node(j,works_list[j]));
  console.log(staff_nodes);
  console.log(works_nodes);
  let mgraph = new matchingGraph(
      staff_nodes,
      works_nodes
  );//インスタンス化
   
  for (const i of staff_nodes){
      for (const j of i.data.capable){
          // jは役職の名前　例:A,B (..etc)
          mgraph.addSide(
              i.id,
              works_list.indexOf(j)
          );
      }
  }
  console.log("最大マッチング",mgraph.maxMatching());
  matching_result = mgraph
    .maxMatching()
    .map(i => 
      [
          works_list[i[1]],
          staff_list[i[0]],
      ]
    );
  // test
  
  console.log(matching_result);
  return matching_result;
}

// # test function

/**
 * # test00
 */
function test00(){
  const mc = new MatchingCls();
  let works = mc.getWorksCalendar("2024/05/01")!;
  for (const work of works!){
    let staffs = mc.getStaffFromTimeRange(
        work.getStartTime(),
        work.getEndTime()
    );
    let works_list = getTasksFromWorkEvent(work);
    let staff_list = staff2matchingformat(staffs,works_list);
    console.log(staff_list);
    const staff_nodes = [...Array(staff_list.length)].map((i,j)=> new node(j,staff_list[j]));
    const works_nodes = [...Array(works_list.length)].map((i,j)=> new node(j,works_list[j]));
    console.log(staff_nodes);
    console.log(works_nodes);
    let mgraph = new matchingGraph(
        staff_nodes,
        works_nodes
    );//インスタンス化
     
    for (const i of staff_nodes){
        for (const j of i.data.capable){
            // jは役職の名前　例:A,B (..etc)
            mgraph.addSide(
                i.id,
                works_list.indexOf(j)
            );
        }
    }
    console.log("最大マッチング",mgraph.maxMatching());
    let matching_result = mgraph
      .maxMatching()
      .map(i => 
        [
            works_list[i[1]],
            staff_list[i[0]],
        ]
      );
    // test
    
    console.log(matching_result);
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
            capable: ["B", "D", "G"]
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

