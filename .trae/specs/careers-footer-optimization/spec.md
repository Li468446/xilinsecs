# 页脚查验证件功能优化规范

## Why

当前页脚存在以下问题：1) 查验证件按钮和MD5值显示已不适用（PDF已更换为海易办）；2) 页面组件首次访问加载速度较慢，需要优化加载性能。

## What Changes

- 移除页脚中的MD5值和防篡改验证链接
- 恢复查验证件按钮，点击后跳转到海易办查验链接
- 优化页面首次访问加载速度：
  - 图片懒加载
  - 动画延迟执行
  - 优化首屏渲染

## Impact

- 受影响文件：`source/footer.js`、`careers/cn/index.html`
- 用户体验：页脚更简洁，页面加载更快，查验证件更便捷

## MODIFIED Requirements

### Requirement: 页脚亮证入口

**旧版**：点击"查验证件"按钮后弹出模态框显示PDF，支持MD5校验

**新版**：点击"查验证件"按钮后新窗口打开海易办查验页面

#### Scenario: 用户查看营业执照
- **WHEN** 用户点击"查验证件"按钮
- **THEN** 新窗口打开海易办查验链接

### Requirement: 页面加载性能

系统 SHALL 优化组件首次访问加载速度

#### Scenario: 页面首次加载
- **WHEN** 用户首次访问页面时
- **THEN** 首屏内容快速显示，动画依次渐入

#### Scenario: 非首屏内容
- **WHEN** 非首屏内容进入可视区域前
- **THEN** 延迟加载或使用占位符

## REMOVED Requirements

### Requirement: 静态图片展示

**Reason**: 不再使用静态图片展示营业执照

### Requirement: MD5校验功能

**Reason**: 海易办查验平台已提供官方验证

### Requirement: 防篡改验证链接

**Reason**: 通过海易办官方平台验证

## 新增配置

### siteConfig.extra.license

```javascript
license: {
  buttonText: "查验证件",
  verifyUrl: "https://e-register.amr.hainan.gov.cn:17089/#/?qyxx=I8%20HAEmgoR6TVmokEB2TW1jqNWu%2F6cwhlApRTM7toGszlRcs6ZUi30MySmjBAtsgtZrbljvmf6FmOfpPbwlMUXvXAKOaWdJBSpMNk53TLb0OV2l7K2tyrV5eL%20ru5FxZeM%20zBV09hFpPXdWTrE13jYyjlD6xSGFbyQCUx1f3M4I%3D"
}
```
