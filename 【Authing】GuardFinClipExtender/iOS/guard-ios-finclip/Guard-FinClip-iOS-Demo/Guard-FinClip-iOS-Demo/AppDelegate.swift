//
//  AppDelegate.swift
//  Guard-FinClip-iOS-Demo
//
//  Created by JnMars on 2022/3/30.
//

import UIKit
import Guard
import GuardFinClipExtender

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        let config = FATStoreConfig.init()
        config.sdkKey = "HwTK/a2BZ1vl68P6K84o1nm9mWwxqcuK6wGDV6MkrZg="
        config.sdkSecret = "f666c6fffbf81c30"
        config.apiServer = "https://api.finclip.com"
        let configs = FATConfig.init(storeConfigs: [config])
        
        Authing.setupWechat("wx1cddb15e280c0f67", universalLink: "https://developer-beta.authing.cn/app/")

        GuardFinClipExt.initSDK(authingAppId: "6244398c8a4575cdb2cb5656", finclipConfigs: configs)
        
        return true
    }
    
    // MARK: UISceneSession Lifecycle
    
    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }
    
    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        return FATClient.shared().handleOpen(url)
    }

    func application(_ application: UIApplication, open url: URL, sourceApplication: String?, annotation: Any) -> Bool {
        return FATClient.shared().handleOpen(url)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "wechatLoginOK"), object: userActivity)
        return true
    }
}

