# shift management app

googleカレンダーを使用した、Google Apps Scriptのシフト管理ツールです

## 使いみち🤷

与えられた条件のなかで、最大限に人と仕事をマッチさせます

## 必要なもの🧰

- googleアカウント

## 準備⚙️

### 設定ファイルの準備

- 適当なスプレッドシートを作成し、そのidを記録する。

- 適当なカレンダーを作成し、そのidを記録する。

### GASの準備

このリポジトリをローカル環境にクローンします

```
git clone <リポジトリのurl>
```

`clasp`をインストールします

```
npm install -g @google/clasp
```

適当なGASプロジェクトを作成し、その`projectId`を以下のように自分のものに書き換えた`.clasp.json`ファイルをrootディレクトリに保存します。

.clasp.json
```json
{"scriptId":"<projectId>","rootDir":"./gas"}
```


## スクリプトプロパティの設定🕵

最初に、準備しておいたカレンダーのid、スプレッドシートのidを

GASプロジェクトの設定に移動して必要なスクリプトプロパティに設定します。


| key | value |
| ---- | ---- |
| calendarID | <カレンダーid> |

