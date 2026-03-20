# 页脚增强功能规范

## Why

增强页脚信息展示，提供更完整的企业资质和法律合规信息，提升用户信任度。

## What Changes

* 移除独立的亮证按钮，改为在工信部备案号上方添加查验证件选项

* 新增互联网违法信息举报入口（12377.cn）

* 更新版权标识为"2025-2026 sec.hn.cn 版权所有"

## Impact

* 受影响文件：`source/footer.js`

* 用户体验：增强企业可信度和法律合规展示

## Impact

* 受影响文件：`source/footer.js`

* 用户体验：增强企业可信度和法律合规展示

## ADDED Requirements

### Requirement: 互联网违法信息举报

系统 SHALL 提供互联网违法信息举报入口

#### Scenario: 用户举报违法信息

* **WHEN** 用户点击举报链接

* **THEN** 跳转到12377.cn举报页面

### Requirement: 版权标识

系统 SHALL 展示网站版权信息

#### Scenario: 查看版权信息

* **WHEN** 用户查看页脚

* **THEN** 显示"sec.hn.cn 版权所有"

### Requirement: 亮证入口

系统 SHALL 在链接列表中提供营业执照查看入口

#### Scenario: 用户查看营业执照

* **WHEN** 用户点击亮证选项

* **THEN** 弹窗显示营业执照PDF

