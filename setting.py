import json
import os


if os.path.isfile(".clasp.json"):
    with open(".clasp.json",mode="r", encoding="utf-8") as f:
        dict_json = json.load(f)
        dict_json["rootDir"] = "./gas/"
    with open(".clasp.json",mode="w",encoding="utf-8") as f:
        json.dump(dict_json,f)
else:
    raise BaseException("まずは`clasp create --parentId <スプレッドシートのID>`を実行してください")
