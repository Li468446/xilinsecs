# IP信息显示位置调整计划

## 任务目标
将首页左下角显示的IPv6/IPv4、地区、ISP、时区等信息，移至工信部备案信息下方，居中、浅灰色、横排显示。

## 当前状态分析
- IP信息当前显示在 `.footer-brand` 区域（左侧第一列），通过 `.visitor-ip-info` 样式控制
- 位置在"致力于提供专业的信息化解决方案..."这段描述下方
- 备案信息位于 `.footer-bottom` 区域，包含ICP证号和站点类型

## 修改方案

### 1. 修改 HTML 结构
在 `footer-bottom` 中的备案信息下方，新增IP信息展示区域。

### 2. 修改样式
- 将 `.visitor-ip-info` 的定位改为居中显示
- 添加浅灰色文字颜色 (`color: #8e8e93` 或类似)
- 调整为横排显示 (`display: flex; gap: ...`)

### 3. 修改 JS 逻辑
- 将获取IP信息的逻辑目标元素从 `footer-brand` 内的 `.visitor-ip-info` 改为新位置

## 具体改动文件
- `/Users/a0000/WebstormProjects/hkx-cms/source/footer.js`

## 实施步骤

### Step 1: 修改 footer-bottom HTML 结构
在备案信息行下方增加IP信息容器：
```html
<p class="footer-ip-info"></p>
```

### Step 2: 添加/修改 CSS 样式
- 新增 `.footer-ip-info` 样式：居中、浅灰色、横排flex布局
- 或修改现有 `.visitor-ip-info` 样式适配新位置

### Step 3: 调整 JS 中 IP 信息渲染逻辑
- 将 `ipInfoElem` 的查询选择器从 `.visitor-ip-info` 改为 `.footer-ip-info`
- 调整内部HTML格式为横排展示：`IPv6: xxx | 地区: xxx | ISP: xxx | 时区: xxx`
