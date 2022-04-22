package cn.authing.guard;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import cn.authing.guard.activity.UserProfileActivity;
import cn.authing.guard.network.AuthClient;

public class UserActivity extends UserProfileActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Button btn = findViewById(R.id.btn_logout);
        btn.setOnClickListener(v -> logout());
    }

    private void logout() {
        AuthClient.logout((code, message, data)->{
            Intent intent = new Intent(this, SplashActivity.class);
            startActivity(intent);
            finish();
        });
    }

}
