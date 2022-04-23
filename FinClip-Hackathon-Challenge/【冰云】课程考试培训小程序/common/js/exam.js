import config from "./config.js";
import urls from "./urls.js";
import http from "./http.js";

function callBoardList(successCallback)
{
	http.post({
		url: urls.callBoard.list,
		success: successCallback
	})
}
function courseList(data,successCallback)
{
	http.post({
		url: urls.course.list,
		data:data,
		success: successCallback
	})
}
function courseLearn(data,successCallback)
{
	http.post({
		url: urls.course.learn,
		data:data,
		success: successCallback
	})
}
function courseDetail(data,successCallback)
{
	http.post({
		url: urls.course.detail,
		data:data,
		success: successCallback
	})
}
function courseCourseware(data,successCallback)
{
	http.post({
		url: urls.course.courseware,
		data:data,
		success: successCallback
	})
}
function examList(data,successCallback)
{
	http.post({
		url: urls.exam.list,
		data:data,
		success: successCallback
	})
}
function examDetail(data,successCallback)
{
	http.post({
		url: urls.exam.detail,
		data:data,
		success: successCallback
	})
}
function examQuestions(data,successCallback)
{
	http.post({
		url: urls.exam.question,
		data:data,
		success: successCallback
	})
}
function examResult(data,successCallback)
{
	http.post({
		url: urls.exam.result,
		data:data,
		success: successCallback
	})
}
function examSubmit(data,successCallback)
{
	http.post({
		url: urls.exam.submit,
		data:data,
		success: successCallback
	})
}

function knowledgeList(data,successCallback)
{
	http.post({
		url: urls.knowledge.list,
		data:data,
		success: successCallback
	})
}
function knowledgeDetail(data,successCallback)
{
	http.post({
		url: urls.knowledge.detail,
		data:data,
		success: successCallback
	})
}
module.exports = {
  callBoardList:callBoardList,
  courseList:courseList,
  courseDetail:courseDetail,
  courseLearn:courseLearn,
  courseCourseware:courseCourseware,
  
  examList:examList,
  examDetail:examDetail,
  examQuestions:examQuestions,
  examResult:examResult,
  examSubmit:examSubmit,
  
  knowledgeList:knowledgeList,
  knowledgeDetail:knowledgeDetail,
}
