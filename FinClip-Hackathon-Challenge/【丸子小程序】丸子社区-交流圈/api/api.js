const API = require('@/api/base')

const getSiteInfo = function(data) {
	return API.get('/wp-json/mp/v2/setting', data);
}


/**
 * 获取用户信息
 * @param  {object} args 参数
 * @return {promise}
 */
const getProfile = function(e) {
	return API.getUserInfo(e);
}

const getBanner = function() {
	// #ifdef MP-WEIXIN
	return API.get('/wp-json/mp/v2/banner/wechat');
	// #endif
	// #ifdef MP-QQ
	return API.get('/wp-json/mp/v2/banner/qq');
	// #endif
	// #ifdef MP-BAIDU
	return API.get('/wp-json/mp/v2/banner/baidu');
	// #endif
	// #ifdef MP-TOUTIAO
	return API.get('/wp-json/mp/v2/banner/toutiao');
	// #endif
	// #ifndef MP
	return API.get('/wp-json/mp/v2/banner/wechat');
	// #endif


}


const getStickyPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?sticky=true', data);
}

const getPostsList = function(data) {
	return API.get('/wp-json/mp/v2/posts', data, {
		token: true
	});
}

const getRelatePosts = function(type, id) {
	return API.get('/wp-json/mp/v2/' + type + '?custom=relate&per_page=3&id=' + id);
}

const getPostsbyID = function(type, id) {
	return API.get('/wp-json/mp/v2/' + type + '/' + id, {}, {
		token: true
	});
}

const getPagesList = function(data) {
	return API.get('/wp-json/mp/v2/pages', data);
}

const getPageByID = function(id) {
	return API.get('/wp-json/mp/v2/pages/' + id);
}

const getCategories = function(data) {
	return API.get('/wp-json/wp/v2/categories?orderby=id&order=asc', data);
}

const getCategoryByID = function(id) {
	return API.get('/wp-json/wp/v2/categories/' + id);
}

const getTags = function(data) {
	return API.get('/wp-json/wp/v2/tags?orderby=rand&order=asc', data);
}

const getTagsList = function(data) {
	return API.get('/wp-json/wp/v2/tags', data);
}

const getTagByID = function(id) {
	return API.get('/wp-json/wp/v2/tags/' + id);
}

const getRandPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?orderby=rand', data);
}


const getMostViewsPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?custom=most', data);
}

const getMostFavPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?custom=most&meta=favs', data);
}

const getMostLikePosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?custom=most&meta=likes', data);
}

const getMostCommentPosts = function(data) {
	return API.get('/wp-json/mp/v2/posts?custom=most&meta=comments', data);
}

const getcustomTopicList = function(type, data) {
	switch (type) {
		case 'views':
			return API.get('/wp-json/mp/v2/forums?custom=most', data);
			break;
		case 'comment':
			return API.get('/wp-json/mp/v2/forums?custom=most&meta=comments', data);
			break;
		case 'likes':
			return API.get('/wp-json/mp/v2/forums?custom=most&meta=likes', data);
			break;
		case 'favs':
			return API.get('/wp-json/mp/v2/forums?custom=most&meta=favs', data);
			break;
	}

}


const getRecentCommentPosts = function(data) {
	return API.get('/wp-json/mp/v2/comments/recent', data);
}

const getComments = function(data) {
	return API.get('/wp-json/mp/v2/comments', data);
}

const Loginout = function() {
	return API.logout();
}

const fav = function(data) {
	return API.post('/wp-json/mp/v2/comments?type=fav', data, {
		token: true
	});
}

const like = function(data) {
	return API.post('/wp-json/mp/v2/comments?type=like', data, {
		token: true
	});
}

const getFavPosts = function(data) {
	return API.get('/wp-json/mp/v2/comments/posts?type=fav', data, {
		token: true
	});
}

const getLikePosts = function(data) {
	return API.get('/wp-json/mp/v2/comments/posts?type=like', data, {
		token: true
	});
}

const getCommentsPosts = function(data) {
	return API.get('/wp-json/mp/v2/comments/posts?type=comment', data, {
		token: true
	});
}

const addComment = function(data) {
	return API.post('/wp-json/mp/v2/comments?type=comment', data, {
		token: true
	});
}

const addBooks = function(data) {
	return API.post('/wp-json/mp/v2/posts?type=books', data, {
		token: true
	});
}

const getCodeImg = function(data) {
	return API.post('/wp-json/mp/v2/qrcode', data, {
		token: false
	});
}

const getMenuSetting = function(data) {
	return API.get('/wp-json/mp/v2/menu', data);
}

const indexAdsense = function(data) {
	// #ifdef MP-WEIXIN  || APP-PLUS || H5
	return API.get('/wp-json/mp/v2/advert/wechat?type=index', data);
	// #endif
	// #ifdef MP-QQ
	return API.get('/wp-json/mp/v2/advert/qq?type=index', data);
	// #endif
	// #ifdef MP-BAIDU
	return API.get('/wp-json/mp/v2/advert/baidu?type=index', data);
	// #endif
	// #ifdef MP-TOUTIAO
	return API.get('/wp-json/mp/v2/advert/toutiao?type=index', data);
	// #endif
}

const listAdsense = function(data) {
	// #ifdef MP-WEIXIN
	return API.get('/wp-json/mp/v2/advert/wechat?type=list', data);
	// #endif
	// #ifdef MP-QQ
	return API.get('/wp-json/mp/v2/advert/qq?type=list', data);
	// #endif
	// #ifdef MP-BAIDU
	return API.get('/wp-json/mp/v2/advert/baidu?type=list', data);
	// #endif
	// #ifdef MP-TOUTIAO
	return API.get('/wp-json/mp/v2/advert/toutiao?type=list', data);
	// #endif
}

const detailAdsense = function(data) {
	// #ifdef MP-WEIXIN
	return API.get('/wp-json/mp/v2/advert/wechat?type=detail', data);
	// #endif
	// #ifdef MP-QQ
	return API.get('/wp-json/mp/v2/advert/qq?type=detail', data);
	// #endif
	// #ifdef MP-BAIDU
	return API.get('/wp-json/mp/v2/advert/baidu?type=detail', data);
	// #endif
	// #ifdef MP-TOUTIAO
	return API.get('/wp-json/mp/v2/advert/toutiao?type=detail', data);
	// #endif
}

const pageAdsense = function(data) {
	return API.get('/wp-json/mp/v2/advert/wechat?type=page', data);
}

const insertAdsense = function(data) {
	return API.get('/wp-json/mp/v2/advert/wechat?type=insert', data);
}

const videoAdsense = function(data) {
	return API.get('/wp-json/mp/v2/advert/wechat?type=video', data);
}

const checkUser = function(data) {
	return API.get('/wp-json/mp/v2/user/check', data, {
		token: true
	})
}

const getUserById = function(data) {
	return API.get('/wp-json/mp/v2/user/view', data,{
		token: true
	});
}

const getMineInfo = function(data) {
	return API.get('/wp-json/mp/v2/user/mine', data, {
		token: true
	});
}

const getCredit = function(data) {
	return API.get('/wp-json/mp/v2/credit', data, {
		token: true
	})
}

const updateCredit = function(data) {
	return API.post('/wp-json/mp/v2/credit', data, {
		token: true
	})
}

const creditRank = function(data) {
	return API.get('/wp-json/mp/v2/credit/rank?orderby=credits', data)
}

const creditSubscribe = function(data) {
	return API.post('/wp-json/mp/v2/credit/subscribe', data, {
		token: true
	})
}

const qrcodeLogin = function(data) {
	return API.post('/wp-json/mp/v2/user/auth', data, {
		token: true
	});
}

const qrcodeScanLogin = function(data) {
	return API.post('/wp-json/mp/v2/user/scene', data, {
		token: false
	});
}

const getTwitterPosts = function(data) {
	return API.get('/wp-json/wp/v2/tweets', data);
}

const getTwitterDetail = function(id) {
	return API.get('/wp-json/wp/v2/tweets/' + id, {}, {
		token: true
	});
}

const markComment = function(args) {
	return API.post('/wp-json/mp/v2/comments/mark', args, {
		token: true,
	})
}

const getVideoList = function(args) {
	return API.get('/wp-json/mp/v2/posts?format=video', args)
}

const acountlogin = function(data) {
	return API.post('/wp-json/mp/v2/site/login', data);
}

const getPassWord = function(data) {
	return API.post('/wp-json/mp/v2/site/lostpass', data);
}

const getEmailCode = function(data) {
	return API.post('/wp-json/mp/v2/site/code', data);
}

const getRegistra = function(data) {
	return API.post('/wp-json/mp/v2/site/signup', data);
}

const upLoadImage = function(filePath) {
	return API.upload('/wp-json/mp/v2/media', filePath, {
		token: true
	})
}

export function updataUsers(args) {
	return API.post('/wp-json/mp/v2/user/update', args, {
		token: true
	});
}

const getMessage = function(args) {
	return API.get('/wp-json/mp/v2/message', args, {
		token: true
	});
}

const getMessagedetail = function(args) {
	return API.get('/wp-json/mp/v2/message/view', args, {
		token: true
	});
}

const getCircleList = function(data) {
	return API.get('/wp-json/wp/v2/circle?orderby=id&order=asc&per_page=20', data, {
		token: true
	});
}


const getStickyList = function(args) {
	return API.get('/wp-json/mp/v2/forums?sticky=true', args);
}

const getUserList = function(args) {
	return API.get('/wp-json/mp/v2/user/rand', args,{
		token:true
	});
}

const getTopicList = function(data) {
	return API.get('/wp-json/mp/v2/forums', data, {
		token: true
	});
}

const getTopicsTags = function(data) {
	return API.get('/wp-json/wp/v2/topic', data);
}

const getUserSearch = function(data) {
	return API.get('/wp-json/mp/v2/user/search', data, {
		token: false
	});
}


const getMessageNum = function(data) {
	return API.get('/wp-json/mp/v2/message/notice', data)
}


const getCircleByID = function(id) {
	return API.get('/wp-json/wp/v2/circle/' + id, {}, {
		token: true
	});
}

const getMemberlist = function(id, data) {
	return API.get('/wp-json/mp/v2/circle/' + id, data, {
		token: true,
	})
}


const getUserForum = function(data) {
	return API.get('/wp-json/mp/v2/forums', data);
}

const getArchive = function(args) {
	return API.get('/wp-json/mp/v2/credit/archive', args, {
		token: true
	})
}

const getMessageslist = function(args) {
	return API.get('/wp-json/mp/v2/message/comments', args, {
		token: true,
	})
}

const getPrivateMessage = function(args) {
	return API.get('/wp-json/mp/v2/message/private', args, {
		token: true
	});
}


const getCreditShopList = function(data) {
	return API.get('/wp-json/mp/v2/products', data, {
		token: true
	})
}


const addForums = function(type, data) {
	if (type == 'posts') {
		return API.post('/wp-json/mp/v2/posts', data, {
			token: true
		});
	} else {
		return API.post('/wp-json/mp/v2/posts?type=forums', data, {
			token: true
		});
	}
}

const getOrderLists = function(args) {
	return API.get('/wp-json/mp/v2/user/orders', args, {
		token: true
	});
}

const getExpresss = function(args) {
	return API.post('/wp-json/mp/v2/express', args, {
		token: true
	});
}


const getFollow = function(id, page) {
	return API.get('/wp-json/mp/v2/user?type=follow&per_page=20&id=' + id + "&page=" + page, "", {
		token: true
	});
}



const getFans = function(id, page) {
	return API.get('/wp-json/mp/v2/user?type=fans&per_page=20&id=' + id + "&page=" + page, "", {
		token: true
	});
}

const getFollowForums = function(data) {
	return API.get('/wp-json/mp/v2/forums?custom=follow', data, {
		token: true
	});
}


const getCircleByMines = function(data) {
	return API.get('/wp-json/mp/v2/circle', data, {
		token: true
	});
}

const uploadMedia = function(files) {
	return API.media(files, {
		token: true
	})
}

const getShareLink = function(data) {
	return API.get('https://mall.guqule.com/mp/share.php', data, {
		isCusUrl: true
	});
}

const reViewPostByAdmin = function(args) {
	return API.put('/wp-json/mp/v2/posts', args, {
		token: true
	});
}
const deletePostByAdmin = function(id) {
	return API.delete('/wp-json/mp/v2/posts?post_id=' + id, {}, {
		token: true
	});
}

const reViewPostByUser = function(args) {
	return API.post('/wp-json/mp/v2/circle/posts', args, {
		token: true
	});
}
const deletePostByUser = function(id) {
	return API.delete('/wp-json/mp/v2/circle/posts?id=' + id, {}, {
		token: true
	});
}
const getAuditList = function(data) {
	return API.get('/wp-json/mp/v2/circle/posts', data, {
		token: true
	});
}

const getAuditCircleList = function(data) {
	return API.get('/wp-json/mp/v2/circle/audit', data, {
		token: true
	});
}

const verifyAudits = function(data) {
	return API.post('/wp-json/mp/v2/circle/audit', data, {
		token: true
	});
}

const deleteAudits = function(id) {
	return API.delete('/wp-json/mp/v2/circle/audit?id=' + id, {}, {
		token: true
	});
}

const getReview = function(args) {
	return API.get('/wp-json/mp/v2/review', args, {
		token: true,
	})
}

const getProductByID = function(id) {
	return API.get('/wp-json/mp/v2/products/' + id, {}, {
		token: true
	});
}

const credit = function(args) {
	return API.post('/wp-json/mp/v2/pay/credit', args, {
		token: true
	});
}

const setOrder = function(args) {
	return API.post('/wp-json/mp/v2/user/orders', args, {
		token: true
	});
}


const joinCircles = function(id) {
	return API.post('/wp-json/mp/v2/circle?action=join&id=' + id, {
		token: true
	})
}

const quitCircles = function(id) {
	return API.post('/wp-json/mp/v2/circle?action=quit&id=' + id, {
		token: true
	})
}

const updateFollow = function(data) {
	return API.post('/wp-json/mp/v2/user', data, {
		token: true
	});
}

const creatCircles = function(data) {
	return API.post('/wp-json/mp/v2/circle/creat', data, {
		token: true
	});
}

const postMessages = function(args) {
	return API.post('/wp-json/mp/v2/message', args, {
		token: true
	});
}

const getBbpUserInfo = function(args) {
	return API.get('/wp-json/wp/v2/bbpuser', args, {
		token: true
	});
}

const getShopList = function(data) {
	return API.get('/wp-json/mp/v2/goods', data, {
		token: true
	})
}

const getPhoneCode = function(args) {
	return API.post('/wp-json/mp/v2/mobile/code', args, {
		token: true
	});
}

const phoneLogin = function(args) {
	return API.post('/wp-json/mp/v2/mobile/login', args, {
		token: true
	});
}

const deleteComment = function(id) {
  return API.delete('/wp-json/mp/v2/comments?comment_id=' + id, {}, {
    token: true
  });
}


const loginByWeixin=function(args){
	return API.post('/wp-json/mp/v2/weixin/login', args, {
		token: true
	});
}


const getCommentDetailById=function(id) {
  return API.get('/wp-json/mp/v2/comments/' + id);
}

const getReplayLists=function (id, data) {
  return API.get('/wp-json/mp/v2/comments/reply/' + id, data, {
    token: false
  })
}



API.getSiteInfo = getSiteInfo
API.getStickyPosts = getStickyPosts
API.getPostsList = getPostsList
API.getPostsbyID = getPostsbyID
API.getPagesList = getPagesList
API.getPageByID = getPageByID
API.getCategories = getCategories
API.getCategoryByID = getCategoryByID
API.getTags = getTags
API.getTagByID = getTagByID
API.getRandPosts = getRandPosts
API.getRelatePosts = getRelatePosts
API.getMostViewsPosts = getMostViewsPosts
API.getMostFavPosts = getMostFavPosts
API.getMostLikePosts = getMostLikePosts
API.getMostCommentPosts = getMostCommentPosts
API.getcustomTopicList = getcustomTopicList
API.getComments = getComments
API.getProfile = API.guard(getProfile)
API.fav = API.guard(fav)
API.getFavPosts = API.guard(getFavPosts)
API.like = API.guard(like)
API.getLikePosts = API.guard(getLikePosts)
API.getCommentsPosts = API.guard(getCommentsPosts)
API.addComment = API.guard(addComment)
API.addBooks = API.guard(addBooks)
API.getCodeImg = getCodeImg
API.Loginout = Loginout
API.getMenuSetting = getMenuSetting
API.indexAdsense = indexAdsense
API.listAdsense = listAdsense
API.detailAdsense = detailAdsense
API.pageAdsense = pageAdsense
API.insertAdsense = insertAdsense
API.videoAdsense = videoAdsense
API.checkUser = checkUser
API.getUserById = getUserById
API.getMineInfo = getMineInfo
API.updateCredit = API.guard(updateCredit)
API.getCredit = getCredit
API.creditRank = creditRank
API.creditSubscribe = API.guard(creditSubscribe)
API.qrcodeLogin = API.guard(qrcodeLogin)
API.qrcodeScanLogin = qrcodeScanLogin
API.getBanner = getBanner
API.getTwitterPosts = getTwitterPosts
API.getTwitterDetail = getTwitterDetail
API.markComment = API.guard(markComment)
API.getVideoList = getVideoList
API.acountlogin = acountlogin
API.getPassWord = getPassWord
API.getEmailCode = getEmailCode
API.getRegistra = getRegistra
API.upLoadImage = upLoadImage
API.updataUsers = updataUsers
API.getMessage = getMessage
API.getMessagedetail = getMessagedetail
API.getTagsList = getTagsList
API.getCircleList = getCircleList
API.getStickyList = getStickyList
API.getUserList = getUserList
API.getTopicList = getTopicList
API.getTopicsTags = getTopicsTags
API.getUserSearch = getUserSearch
API.getMessageNum = getMessageNum
API.getCircleByID = getCircleByID
API.getMemberlist = getMemberlist
API.getUserForum = getUserForum
API.getArchive = getArchive
API.getMessageslist = getMessageslist
API.getPrivateMessage = getPrivateMessage
API.getCreditShopList = getCreditShopList
API.addForums = addForums
API.getOrderLists = getOrderLists
API.getExpresss = getExpresss
API.getFans = getFans
API.getFollow = getFollow
API.getFollowForums = getFollowForums
API.getCircleByMines = getCircleByMines
API.uploadMedia = uploadMedia
API.getShareLink = getShareLink
API.reViewPostByUser = reViewPostByUser
API.deletePostByUser = deletePostByUser
API.reViewPostByAdmin = reViewPostByAdmin
API.deletePostByAdmin = deletePostByAdmin
API.getAuditList = getAuditList
API.getAuditCircleList = getAuditCircleList
API.verifyAudits = verifyAudits
API.deleteAudits = deleteAudits
API.getReview = getReview
API.getProductByID = getProductByID
API.credit = credit
API.setOrder = setOrder
API.joinCircles = joinCircles
API.quitCircles = quitCircles
API.updateFollow = updateFollow
API.creatCircles = creatCircles
API.postMessages = postMessages
API.getBbpUserInfo = getBbpUserInfo
API.getShopList = getShopList
API.getPhoneCode = getPhoneCode
API.phoneLogin = phoneLogin
API.deleteComment=deleteComment
API.loginByWeixin=loginByWeixin
API.getCommentDetailById=getCommentDetailById
API.getReplayLists=getReplayLists
module.exports = API
