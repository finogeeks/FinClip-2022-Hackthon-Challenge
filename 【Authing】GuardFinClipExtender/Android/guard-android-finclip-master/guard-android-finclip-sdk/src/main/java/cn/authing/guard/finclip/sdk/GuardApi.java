package cn.authing.guard.finclip.sdk;

import android.content.Context;
import android.util.Log;

import com.finogeeks.lib.applet.api.AbsApi;
import com.finogeeks.lib.applet.interfaces.ICallback;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import cn.authing.guard.AuthCallback;
import cn.authing.guard.Authing;
import cn.authing.guard.data.UserInfo;
import cn.authing.guard.network.Guardian;
import cn.authing.guard.social.Wechat;
import cn.authing.guard.util.Util;

public class GuardApi extends AbsApi {

    private static final String TAG = "GuardApi";
    private static final String METHOD_GUARD_REQUEST = "guardRequest";
    private static final String METHOD_ENCRYPT_PASSWORD = "encryptPassword";
    private static final String METHOD_GET_TOKEN = "getToken";
    private static final String METHOD_WECHAT_LOGIN = "login";

    private static final String HTTP_URL = "url";
    private static final String HTTP_METHOD = "method";
    private static final String HTTP_BODY = "body";
    private static final String PARAMS_PASSWORD = "password";
    private static final String PARAMS_ERROR_MESSAGE = "errMsg";
    private static final String PARAMS_CODE = "code";
    private static final String PARAMS_DATA = "data";
    private static final String PARAMS_TOKEN = "token";

    private final Context mContext;

    public GuardApi(Context mContext) {
        this.mContext = mContext;
    }

    @Override
    public String[] apis() {
        return new String[]{
                METHOD_GUARD_REQUEST,
                METHOD_ENCRYPT_PASSWORD,
                METHOD_GET_TOKEN,
                METHOD_WECHAT_LOGIN};
    }

    @Override
    public void invoke(String event, JSONObject param, ICallback callback) {
        Log.i(TAG, "invoke event = " + event);
        if (METHOD_GUARD_REQUEST.equals(event)){
            guardRequest(param, callback);
        } else if (METHOD_ENCRYPT_PASSWORD.equals(event)){
            encryptPassword(param, callback);
        } else if (METHOD_GET_TOKEN.equals(event)){
            getToken(callback);
        } else if (METHOD_WECHAT_LOGIN.equals(event)){
            weChatLogin(callback);
        }
    }

    private void weChatLogin(ICallback callback) {
        Wechat wechat = new Wechat();
        wechat.login(mContext, (AuthCallback<UserInfo>) (code, message, data) -> {
            Log.i(TAG, "weChatLogin code = " + code);
            if (code == 200) {
                getToken(callback);
            } else {
                onFail("login fail", callback);
            }
        });
    }

    private void encryptPassword(JSONObject param, ICallback callback) {
        try {
            String password = Util.encryptPassword(param.getString(PARAMS_PASSWORD));
            Map<String, Object> data = new HashMap<>();
            data.put(PARAMS_PASSWORD, password);
            onSuccess(data, callback);
        } catch (JSONException e) {
            callback.onFail();
            e.printStackTrace();
        }
    }

    private void guardRequest(JSONObject param, ICallback callback) {
        try {
            String method = param.getString(HTTP_METHOD);
            String url = param.getString(HTTP_URL);
            JSONObject body = param.getJSONObject(HTTP_BODY);
            Authing.getPublicConfig(config -> new Thread() {
                public void run() {
                    String fullUrl = Authing.getScheme() + "://" + Util.getHost(config) + url;
                    String newBody = body.toString();
                    if ("{}".equals(newBody)){
                        if ("POST".equalsIgnoreCase(method)){
                            newBody = new JSONObject().toString();
                        } else {
                            newBody = null;
                        }
                    }
                    Guardian.request(config, fullUrl, method, newBody, response -> {
                        if (response.getCode() == 200){
                            Map<String, Object> data = new HashMap<>();
                            data.put(PARAMS_CODE, response.getCode());
                            data.put(PARAMS_DATA, response.getData());
                            onSuccess(data, callback);
                        } else {
                            onFail(response.getMessage(), callback);
                        }
                    });
                }
            }.start());
        } catch (Exception e) {
            callback.onFail();
            e.printStackTrace();
        }
    }

    private void getToken(ICallback callback){
        UserInfo currentUser = Authing.getCurrentUser();
        if (null == currentUser){
            onFail("no token", callback);
            return;
        }
        String token = currentUser.getIdToken();
        if (Util.isNull(token)) {
            token = currentUser.getAccessToken();
        }
        if (Guardian.MFA_TOKEN != null) {
            token = Guardian.MFA_TOKEN;
        }
        if (Util.isNull(token)) {
            onFail("no token", callback);
            return;
        }

        Map<String, Object> data = new HashMap<>();
        data.put(PARAMS_TOKEN, token);
        Log.i(TAG, "getToken token = " + token);
        onSuccess(data, callback);
    }

    private void onSuccess(Map<String, Object> data, ICallback callback){
        try {
            JSONObject result = new JSONObject();
            for (Map.Entry<String, Object> entry : data.entrySet()) {
                result.put(entry.getKey(), entry.getValue());
            }
            callback.onSuccess(result);
        } catch (JSONException e) {
            callback.onFail();
            e.printStackTrace();
        }
    }

    private void onFail(String errMsgValue, ICallback callback){
        JSONObject result = new JSONObject();
        try {
            result.put(PARAMS_ERROR_MESSAGE, errMsgValue);
            callback.onFail(result);
        } catch (JSONException e) {
            callback.onFail();
            e.printStackTrace();
        }
    }

}
