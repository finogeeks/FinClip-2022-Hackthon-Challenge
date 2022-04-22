//
//  FATAppletMenuProtocol.h
//  FinApplet
//
//  Created by Haley on 2020/2/26.
//  Copyright © 2020 finogeeks. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "FATConstant.h"

@protocol FATAppletMenuProtocol <NSObject, NSCopying>

/**
 菜单id
 */
@property (nonatomic, copy) NSString *menuId;

/**
 菜单的icon图标
 我们固定菜单的大小：3倍图：90*90
 图标中间小logo与图标宽度比是 5:8。
 注意：菜单标题显示优先级：后台配置icon > APP注入icon
 */
@property (nonatomic, strong) UIImage *menuIconImage;

/**
 菜单的标题
 注意：菜单标题显示优先级：后台配置标题 > APP注入标题
 */
@property (nonatomic, copy) NSString *menuTitle;

/**
 菜单的类型
 FATAppletMenuStyleCommon：通用的按钮，不需要小程序提供额外信息就可以调用的，比如收藏；
 FATAppletMenuStyleOnMiniProgram：需要小程序配合实现的按钮，也就是说需要小程序提供额外调用参数的按钮，比如分享到微信
 */
@property (nonatomic, assign) FATAppletMenuStyle menuType;

@end
