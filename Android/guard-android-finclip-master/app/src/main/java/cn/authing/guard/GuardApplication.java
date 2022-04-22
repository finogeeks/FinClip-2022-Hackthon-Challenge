package cn.authing.guard;

import android.app.Application;
import android.util.Log;

import com.finogeeks.lib.applet.client.FinAppConfig;
import com.finogeeks.lib.applet.interfaces.FinCallback;

import cn.authing.guard.finclip.sdk.GuardFinClipExt;

public class GuardApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        FinAppConfig config = new FinAppConfig.Builder()
                .setSdkKey("8QLZmDxYi9qY5L6V1biny13xS0VMNoQmalb2XagbWS8=")   // SDK Key
                .setSdkSecret("714c5988f71630bd")   // SDK Secret
                .setApiUrl("https://api.finclip.com")   // 服务器地址
                .setApiPrefix("/api/v1/mop/")   // 服务器接口请求路由前缀
                .setEncryptionType("SM")   // 加密方式，国密:SM，md5: MD5
                .build();
        GuardFinClipExt.getInstance().init(this, "6244398c8a4575cdb2cb5656", config, new FinCallback<Object>() {
            @Override
            public void onSuccess(Object result) {
                Log.i("GuardApplication", "fin app client init success: result = " + result);
            }

            @Override
            public void onError(int code, String error) {
                Log.e("GuardApplication", "fin app client init error: code = " + code + " error = " + error);
            }

            @Override
            public void onProgress(int status, String error) {
                Log.i("GuardApplication", "fin app client init progress: status = " + status + " error = " + error);
            }
        });

    }
}
