const scloudjs = require("scloudjs"); //scloudjsをモジュールとして使えるようにする
let clouddatas = new Object();//このオブジェクトにクラウド変数のデータが入る

// ユーザーリスト
var userlist = [];

const main = (data) => {//メッセージを受け取ったときにどんな処理をするかを設定する
	const temp = scloudjs.parsedata(data, clouddatas);//受け取ったメッセージを整理する
	clouddatas = temp.clouddatas;//クラウド変数のデータ
	const changedlists = temp.changedlists;//変更された変数一覧
	// scloudjs.sendtocloud("HOST", 19);//変数HOSTを19にする

	const id = clouddatas["usr"].value.substr(0, 6);
	const dat = clouddatas["usr"].value;

	switch (dat[6]) {
		case "0":
			scloudjs.sendtocloud("sev", id + "1");
			console.log(`Request 0: ${id}`);
			break;

		default:
			console.log(`Inveid Request: ${dat[6]}`);
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