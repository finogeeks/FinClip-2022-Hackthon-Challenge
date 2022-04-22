package cn.authing.guard;

import androidx.appcompat.app.AppCompatActivity;
import androidx.databinding.DataBindingUtil;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import com.finogeeks.lib.applet.client.FinAppClient;

import cn.authing.guard.databinding.ActivityMainBinding;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityMainBinding mainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);

        mainBinding.guard.setOnClickListener(view -> startMiniProgram("6244175278c1a7000142b2c5"));
    }

    private void startMiniProgram(String appId){
        FinAppClient.INSTANCE.getAppletApiManager().startApplet(MainActivity.this, appId);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.user, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.menu_user) {
            Intent intent = new Intent(this, UserActivity.class);
            startActivity(intent);
        }
        return super.onOptionsItemSelected(item);
    }

}