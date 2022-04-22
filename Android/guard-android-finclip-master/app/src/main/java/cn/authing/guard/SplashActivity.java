package cn.authing.guard;

import static cn.authing.guard.activity.AuthActivity.OK;
import static cn.authing.guard.activity.AuthActivity.RC_LOGIN;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import java.util.Objects;

import cn.authing.guard.Authing;
import cn.authing.guard.data.UserInfo;
import cn.authing.guard.flow.AuthFlow;

@SuppressLint("CustomSplashScreen")
public class SplashActivity extends AppCompatActivity {

    private int flag;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Objects.requireNonNull(getSupportActionBar()).hide();
        setContentView(R.layout.activity_splash);


        new Handler().postDelayed(()-> next(1), 1000);

        Authing.autoLogin((code, message, userInfo) -> next(2));
    }

    private void next(int f) {
        flag |= f;

        // both condition meets
        if (flag == 3) {
            if (Authing.getCurrentUser() != null) {  Intent intent;
                intent = new Intent(this, MainActivity.class);
                startActivity(intent);
                finish();
            } else {
                AuthFlow.start(this);
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == RC_LOGIN && resultCode == OK && data != null) {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
            finish();
        }
    }
}
