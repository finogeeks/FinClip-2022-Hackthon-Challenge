export default {
    baseUrl: 'https://exam.blscy.cn',
    wsUrl: 'wss://chat.blscy.cn/ws?',
    emojiUrl: 'https://chat.blscy.cn/data/static/img/emoji/',
	terminal: 'h5', // h5 | weixin | toutiao
	requestCode:{
		ok:"0",
		loginTimeOut:"2",
	},
	storageCode:{
		UserId:"UserId",
		loginToken:"loginToken",
		IsSupper:"IsSupper",
		WebSocketConnectState:"WebSocketConnectState",
		NeedUserInfo:"NeedUserInfo",
		
		// 会话
		Conversations:"Conversations",
		// 置顶会话
		TopConversations:"TopConversations",
		
		SingleChatMessage:"SingleChatMessage",
		TemporaryGroupChatMessage:"TemporaryGroupChatMessage",
	}
}