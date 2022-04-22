//
//  GuardFinClipExtender.swift
//  Authing-Finclip-iOS-Demo
//
//  Created by JnMars on 2022/3/30.
//

import Foundation
import Guard

open class GuardFinClipExt {
    
    public static func initSDK(authingAppId: String, finclipConfigs: FATConfig) {

        Authing.start(authingAppId)

        do {
            try FATClient.shared().initWith(finclipConfigs)
        } catch {
            print("unable to init FATClient config, error: \(error)")
        }
        
        GuardFinClipExt.registerMiniProgramsApis()
    }

    static func registerMiniProgramsApis(){

        FATClient.shared().registerExtensionApi("guardRequest") { param, callback in

            if let method = (param as? NSDictionary)?["method"] as? String,
                let url =  (param as? NSDictionary)?["url"] as? String {
                if method == "GET" {
                    AuthClient().get(url) { code, msg, data in
                        if code == 200{
                            let dic: NSDictionary = ["code": code as Any,
                                                            "data": data as Any]
                            callback?(FATExtensionCode.success, dic as? [String : NSObject])
                        }else{
                            let dic: NSDictionary = ["code": code as Any,
                                                            "errMsg": msg as Any]
                            callback?(FATExtensionCode.failure,  dic as? [String: NSObject])
                        }
                    }
                } else if method == "POST" {
                    if let body = (param as? NSDictionary)?["body"] as? NSDictionary {
                        AuthClient().post(url, body) { code, msg, data in
                            if code == 200{
                                let dic: NSDictionary = ["code": code as Any,
                                                                "data": data as Any]
                                callback?(FATExtensionCode.success, dic as? [String : NSObject])
                            }else{
                                let dic: NSDictionary = ["code": code as Any,
                                                                "errMsg": msg as Any]
                                callback?(FATExtensionCode.failure,  dic as? [String: NSObject])
                            }
                        }
                    }
                } else if method == "DELETE" {
                    AuthClient().delete(url) { code, msg, data in
                        if code == 200 {
                            let dic: NSDictionary = ["code": code as Any,
                                                            "data": data as Any]
                            callback?(FATExtensionCode.success, dic as? [String : NSObject])
                        } else {
                            let dic: NSDictionary = ["code": code as Any,
                                                            "errMsg": msg as Any]
                            callback?(FATExtensionCode.failure,  dic as? [String: NSObject])
                        }
                    }
                }else{
                    callback?(FATExtensionCode.failure, nil)
                }
            } else {
                callback?(FATExtensionCode.failure, nil)
            }
        }

        FATClient.shared().registerExtensionApi("encryptPassword") { param, callback in
            if let password = (param as? NSDictionary)?["password"] as? String{
                let dic: NSDictionary = ["password": Util.encryptPassword(password) as Any]
                callback?(FATExtensionCode.success, dic as? [String : NSObject])
            }else{
                let dic: NSDictionary = ["errMsg": "encryptPassword fail" as Any]
                callback?(FATExtensionCode.failure,  dic as? [String: NSObject])
            }
        }
        
        FATClient.shared().registerExtensionApi("login") { param, callback in
            WechatLogin.shared.login(viewController: GuardFinClipExt.topViewController() ?? UIViewController()) { code, msg, userInfo in
                if code == 200 {
                    let dic: NSDictionary = ["code": code as Any,
                                                    "token": userInfo?.token as Any]
                    callback?(FATExtensionCode.success, dic as? [String : NSObject])
                } else {
                    let dic: NSDictionary = ["code": code as Any,
                                                    "errMsg": msg as Any]
                    callback?(FATExtensionCode.failure,  dic as? [String: NSObject])
                }
            }
        }
    }
    
    class func topViewController(base: UIViewController? = UIApplication.shared.keyWindow?.rootViewController) -> UIViewController? {

        if let nav = base as? UINavigationController {
            return topViewController(base: nav.visibleViewController)

        } else if let tab = base as? UITabBarController, let selected = tab.selectedViewController {
            return topViewController(base: selected)

        } else if let presented = base?.presentedViewController {
            return topViewController(base: presented)
        }
        return base
    }
}
