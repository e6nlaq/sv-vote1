const scloudjs = require("scloudjs"); //scloudjsをモジュールとして使えるようにする
let clouddatas = new Object();//このオブジェクトにクラウド変数のデータが入る

// ユーザーリスト
var userlist = [];

// 票数
var a = 0, b = 0, c = 0;

function ango(str) {
	const ang = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '_'];
	var ans = "";

	for (var i = 0; i < str.length; i += 2) {
		ans += ang[Number(str.substr(i, 2))];
	}

	return ans;

}

const main = (data) => {//メッセージを受け取ったときにどんな処理をするかを設定する
	const temp = scloudjs.parsedata(data, clouddatas);//受け取ったメッセージを整理する
	clouddatas = temp.clouddatas;//クラウド変数のデータ
	const changedlists = temp.changedlists;//変更された変数一覧
	// scloudjs.sendtocloud("HOST", 19);//変数HOSTを19にする

	const id = clouddatas["usr"].value.substr(0, 6);
	const dat = clouddatas["usr"].value;

	var usr = "";

	if (dat[6] != "0") {
		usr = ango(dat.substr(7));

		// if (userlist.includes(usr)) {
		// 	scloudjs.sendtocloud("sev", id + "2");
		// }
	}

	switch (dat[6]) {
		case "0":
			scloudjs.sendtocloud("sev", id + "1");
			console.log(`ID${id}さんが参加しました。`);
			break;

		case "1":
			if (userlist.includes(usr)) {
				scloudjs.sendtocloud("sev", id + "2");
				console.log(`ID${id}(${usr})さんが重複しました。`);
			} else {
				a++;
				console.log(`ID${id}(${usr})さんがAに投票しました。Aの投票数: ${a}`);
				scloudjs.sendtocloud("sev", id + "3");
				userlist.push(usr);
			}
			break;

		case "2":
			if (userlist.includes(usr)) {
				scloudjs.sendtocloud("sev", id + "2");
				console.log(`ID${id}(${usr})さんが重複しました。`);
			} else {
				b++;
				console.log(`ID${id}(${usr})さんがBに投票しました。Bの投票数: ${b}`);
				scloudjs.sendtocloud("sev", id + "3");
				userlist.push(usr);
			}
			break;

		case "3":
			if (userlist.includes(usr)) {
				scloudjs.sendtocloud("sev", id + "2");
				console.log(`ID${id}(${usr})さんが重複しました。`);
			} else {
				c++;
				console.log(`ID${id}(${usr})さんがCに投票しました。Bの投票数: ${c}`);
				scloudjs.sendtocloud("sev", id + "3");
				userlist.push(usr);
			}
			break;

		default:
			console.log(`無効なリクエスト(${dat[6]})`);
			break;
	}

};

scloudjs.setdatas(process.env.username, process.env.password, process.env.project, main);//いろいろデータを設定する

const func = async () => {//実行

	await scloudjs.login();//scratchにログイン
	await scloudjs.connect();//scratchのクラウド変数サーバーに接続
	await scloudjs.handshake();//プロジェクトに接続
};
func();