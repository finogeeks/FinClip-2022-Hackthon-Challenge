export default {
	file:{
		upload:"/api/file/upload",
	},
	auth:{		
		checkLogin:"/auth/check",
		wxlogin:"/auth/wx/mini_program",
		ttlogin:"/auth/tt/mini_program",
		aplogin:"/auth/account-password-login",
		apRegistered:"/auth/account-password-registered",
	},
	callBoard:{
		list:"/call-board/list"
	},
	course:{
		list:"/course/list",
		classList:'/course/class-list',
		detail:'/course/detail',
		learn:'/course/learn',
		courseware:'/course/courseware',
	},
	exam:{
		list:"/exam/list",
		classList:'/exam/class-list',
		detail:'/exam/detail',
		question:'/exam/question',
		result:'/exam/result',
		submit:'/exam/submit',
	},
	knowledge:{
		list:"/knowledge/list",
		detail:"/knowledge/detail",
	}
}