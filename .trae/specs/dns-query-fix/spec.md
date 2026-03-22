# DNS 查询页面查询失败问题修复 Spec

## Why
DNS 查询页面 `dns-query.html` 在查询时经常失败，原因是当 DOH 服务器返回错误状态（如 403、404、500 等）时，返回的是 HTML 错误页面而非 JSON 格式数据，导致前端 `fetchResponse.json()` 解析失败。

## What Changes
- 添加 HTTP 响应状态检查，在解析 JSON 前验证响应是否成功
- 增强错误处理：当服务器返回错误时，尝试提取错误信息并显示给用户
- 添加网络错误和 CORS 错误的专门处理
- 优化用户体验：显示更清晰的错误提示

## Impact
- Affected specs: DNS 查询功能
- Affected code: `business/services/g/dns-query.html`

## ADDED Requirements
### Requirement: 健壮的 DNS 查询错误处理
系统 SHALL 在 DNS 查询失败时提供清晰的错误信息，而不是静默崩溃。

#### Scenario: DOH 服务器返回非 JSON 错误页面
- **WHEN** 用户发起 DNS 查询且服务器返回 HTML 错误页面
- **THEN** 系统应检测到响应状态异常，显示 "服务器返回异常响应，请稍后重试" 错误信息

#### Scenario: 网络连接失败
- **WHEN** 用户发起 DNS 查询且网络不可达或超时
- **THEN** 系统应显示 "网络连接失败，请检查网络设置" 错误信息

#### Scenario: 查询被服务器拒绝 (HTTP 403)
- **WHEN** 用户发起 DNS 查询且服务器返回 403 禁止访问
- **THEN** 系统应显示 "查询被服务器拒绝，可能存在异常访问行为" 错误信息
