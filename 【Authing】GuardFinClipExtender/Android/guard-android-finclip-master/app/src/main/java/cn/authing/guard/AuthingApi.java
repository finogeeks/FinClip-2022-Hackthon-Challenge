package cn.authing.guard;

import android.util.Log;

import com.finogeeks.lib.applet.api.AbsApi;
import com.finogeeks.lib.applet.interfaces.ICallback;

import org.json.JSONException;
import org.json.JSONObject;

import cn.authing.guard.data.UserInfo;
import cn.authing.guard.network.AuthClient;

public class AuthingApi extends AbsApi {
    
    private static final String TAG = "AuthingApi";

    private static final String METHOD_GET_USER_INFO = "getCurrentUser";
    private static final String METHOD_GET_USER_AVATAR = "getUserAvatar";
    private static final String METHOD_GET_ID_TOKEN = "getIdToken";
    private static final String METHOD_CHANGE_USER_NICK_NAME = "changeUserNickName";

    private static final String METHOD_GET_USER_NICK_NAME = "getUserNickName";
    private static final String METHOD_GET_USER_NAME = "getUserName";
    private static final String METHOD_GET_USER_USER_NAME = "userUserName";
    private static final String METHOD_GET_USER_PHONE = "userPhone";
    private static final String METHOD_GET_USER_EMAIL = "userEmail";

    private static final String METHOD_UPDATE_USER_INFO = "updateUserInfo";

    /**
     * 返回可调用的api名称的数组
     * @return 可调用的api名称的数组
     */
    @Override
    public String[] apis() {
        return new String[]{METHOD_GET_USER_INFO,
                METHOD_GET_USER_AVATAR,
                METHOD_GET_ID_TOKEN,
                METHOD_CHANGE_USER_NICK_NAME,
                METHOD_GET_USER_NICK_NAME,
                METHOD_GET_USER_NAME,
                METHOD_GET_USER_USER_NAME,
                METHOD_GET_USER_PHONE,
                METHOD_GET_USER_EMAIL,
                METHOD_UPDATE_USER_INFO};
    }

    /**
     * 接收到对应的API调用时，会触发此方法，在此方法中实现API的业务逻辑
     * @param event    事件名称，即API名称
     * @param param    事件参数
     * @param callback 回调接口，用于执行完业务逻辑之后把结果回调给小程序
     */
    @Override
    public void invoke(String event, JSONObject param, ICallback callback) {
        Log.i(TAG, "invoke event = " + event);
        if (METHOD_GET_USER_INFO.equals(event)){
            getCurrentUser(callback);
        } else if (METHOD_GET_USER_AVATAR.equals(event)){
            getUserAvatar(callback);
        } else if (METHOD_GET_ID_TOKEN.equals(event)){
            getIdToken(callback);
        } else if (METHOD_CHANGE_USER_NICK_NAME.equals(event)){
            changeUserNickName(param, callback);
        }else if (METHOD_GET_USER_NICK_NAME.equals(event)){
            getUserNickName(callback);
        } else if (METHOD_GET_USER_NAME.equals(event)){
            getUserName(callback);
        } else if (METHOD_GET_USER_USER_NAME.equals(event)){
            getUserUserName(callback);
        } else if (METHOD_GET_USER_PHONE.equals(event)){
            getUserPhoneNumber(callback);
        } else if (METHOD_GET_USER_EMAIL.equals(event)){
            getUserEmail(callback);
        } else if (METHOD_UPDATE_USER_INFO.equals(event)){
            updateUserInfo(param, callback);
        }
    }

    private void getCurrentUser(ICallback callback){
        Log.i(TAG, "getCurrentUser");
        UserInfo userInfo = Authing.getCurrentUser();
//        String data = new Gson().toJson(userInfo);
//        try {
//            Log.i(TAG, "getCurrentUser data = " + data);
//            callback.onSuccess(new JSONObject(userInfo));
//        } catch (JSONException e) {
//            e.printStackTrace();
//            Log.i(TAG, "getCurrentUser e = " + e);
//        }
    }

    private void getUserAvatar(ICallback callback){
        Log.i(TAG, "getUserAvatar");
        UserInfo userInfo = Authing.getCurrentUser();
        String photo = userInfo.getPhoto();
        if (photo != null && photo.startsWith("\ufeff")) {
            photo = photo.substring(1);
        }
        if (null == photo){
            return;
        }
        try {
            JSONObject params = new JSONObject();
            params.put("photo", photo);
            Log.i(TAG, "getUserAvatar params = " + params);
            callback.onSuccess(params);
        } catch (JSONException e) {
            e.printStackTrace();
            Log.i(TAG, "getUserAvatar e = " + e);
        }
    }

    private void getIdToken(ICallback callback){
        Log.i(TAG, "getIdToken");
        UserInfo userInfo = Authing.getCurrentUser();
        String idToken = userInfo.getIdToken();
        try {
            JSONObject params = new JSONObject();
            params.put("idToken", idToken);
            Log.i(TAG, "getIdToken idToken = = " + params);
            callback.onSuccess(params);
        } catch (JSONException e) {
            e.printStackTrace();
            Log.i(TAG, "getIdToken e = " + e);
        }
    }

    private void changeUserNickName(JSONObject param, ICallback callback) {
        Log.i(TAG, "changeNickName param = "+param);
        if (null == param || !param.has("nickName")){
            callback.onFail();
            return;
        }
        JSONObject object = new JSONObject();
        try {
            object.put("nickname", param.get("nickName"));
        } catch (JSONException e) {
            e.printStackTrace();
        }
        AuthClient.updateProfile(object, (code, message, res) -> {
            if (code == 200) {
                UserInfo userInfo = Authing.getCurrentUser();
                String nickName = userInfo.getNickname();
                Log.i(TAG, "changeNickName code = 200， nickName = "+nickName);
                callback.onSuccess(object);
            } else {
                Log.i(TAG, "changeNickName code = "+code + " message = " + message);
                try {
                    callback.onFail(new JSONObject(message));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void updateUserInfo(JSONObject params, ICallback callback) {
        AuthClient.updateProfile(params, (code, message, res) -> {
            if (code == 200) {
                UserInfo userInfo = Authing.getCurrentUser();
                String nickName = userInfo.getNickname();
                Log.i(TAG, "changeNickName code = 200， nickName = "+nickName);
                callback.onSuccess(getSuccessMessage());
            } else {
                Log.i(TAG, "changeNickName code = "+code + " message = " + message);
                callback.onFail(getFailMessage(message));
            }
        });
    }

    private JSONObject getSuccessMessage(){
        JSONObject object = new JSONObject();
        try {
            object.put("msg", "success");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return object;
    }

    private JSONObject getFailMessage(String message){
        JSONObject object = new JSONObject();
        try {
            object.put("msg", message);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return object;
    }

    private void getUserNickName(ICallback callback){
        Log.i(TAG, "getUserNickName");
        UserInfo userInfo = Authing.getCurrentUser();
        String nickName = userInfo.getNickname();
        try {
            JSONObject params = new JSONObject();
            params.put("nickname", nickName);
            Log.i(TAG, "getUserNickName params = " + params);
            callback.onSuccess(params);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void getUserName(ICallback callback){
        UserInfo userInfo = Authing.getCurrentUser();
        String name = userInfo.getName();
        try {
            callback.onSuccess(new JSONObject(name));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void getUserUserName(ICallback callback){
        UserInfo userInfo = Authing.getCurrentUser();
        String name = userInfo.getUsername();
        try {
            callback.onSuccess(new JSONObject(name));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void getUserPhoneNumber(ICallback callback){
        UserInfo userInfo = Authing.getCurrentUser();
        String value = userInfo.getPhone_number();
        try {
            callback.onSuccess(new JSONObject(value));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void getUserEmail(ICallback callback){
        UserInfo userInfo = Authing.getCurrentUser();
        String value = userInfo.getEmail();
        try {
            callback.onSuccess(new JSONObject(value));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

}
