// -------------------- 全局页脚配置部分 --------------------
window.siteConfig = {
    footer: {
        brand: {
            name: "XSEC",
            description: "致力于提供专业的信息化解决方案,助力企业数字化转型升级。"
        },
        links: [
            {
                title: "关于我们",
                items: [
                    { text: "企业简介", href: "/leadership/me/" },
                    { text: "企业动态", href: "/leadership/" },
                    { text: "领导团队", href: "/leadership/me/lead/" },
                    { text: "发展历程", href: "#" },
                    { text: "隐私政策", href: "/legal/privacy/" }
                ]
            },
            {
                title: "工作机会",
                items: [
                    { text: "XSEC 职业机会", href: "/careers/cn/" },
                    { text: "在 XSEC 生活", href: "/careers/cn/life-at-xsec.html" },
                    { text: "在 XSEC 工作", href: "/careers/cn/work-at-xsec.html" }
                ]
            },
            {
                title: "资源",
                items: [
                    { text: "技术博客", href: "https://blog.csdn.net/qq_73252299?spm=1000.2115.3001.5343", target: "_blank" },
                    { text: "支持中心", href: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af" },
                    { text: "公共服务", href: "/business/g/" }
                ]
            },
            {
                title: "联系我们",
                items: [
                    { text: "客服咨询", href: "https://work.weixin.qq.com/kfid/kfc5c60f929a2e703af", target: "_blank" },
                    { text: "商务合作", href: "/business/c/subscription.html", target: "_blank" },
                    { text: "客户服务", href: "/business/c/", target: "_blank" }
                ]
            }
        ],
        copyright: "© 2025 海口希灵赛斯网络科技有限公司. 保留所有权利.",
        beian: {
            icp: "琼ICP备2025060601号",    //ICP备案
            police: "                "   //公安备案
        }
    }
};

// -------------------- 样式部分 --------------------
const footerStyle = `
.footer {
    background: #1d1d1f;
    color: #f5f5f7;
    padding: 40px 0 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    transition: all 0.3s ease;
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.3);
}
.footer h3, .footer h4 {
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 15px;
    font-size: 16px;
    letter-spacing: 0.5px;
}
.footer p {
    color: #d1d1d6;
    font-size: 14px;
    line-height: 1.5;
    transition: all 0.3s ease;
}
.footer ul {
    padding: 0;
    list-style: none;
}
.footer ul li {
    margin-bottom: 12px;
}
.footer ul li a {
    color: #d1d1d6;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease, transform 0.2s ease;
}
.footer ul li a:hover {
    color: #0a84ff;
    transform: translateY(-2px);
}
.footer-bottom {
    text-align: center;
    border-top: 1px solid #2c2c2e;
    margin-top: 30px;
    padding-top: 15px;
    font-size: 13px;
    color: #8e8e93;
    opacity: 0;
    animation: fadeIn 1s forwards;
}
.footer-bottom a {
    color: #8e8e93;
    text-decoration: none;
    transition: none;
}
.footer-bottom a:hover {
    color: #8e8e93;
    transform: none;
}
.footer .row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
}
.footer .col {
    flex: 1 1 0;
    min-width: 150px;
    transition: all 0.3s ease;
}
@media (max-width: 768px) {
    .footer .row {
        flex-direction: column;
    }
    .footer .col {
        min-width: auto;
    }
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

// 注入样式到页面
const styleTag = document.createElement('style');
styleTag.innerHTML = footerStyle;
document.head.appendChild(styleTag);

// -------------------- 渲染页脚 --------------------
function renderFooter(containerId = "site-footer") {
    const container = document.getElementById(containerId);
    if (!container || !window.siteConfig || !window.siteConfig.footer) return;

    const cfg = window.siteConfig.footer;

    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="row footer-top">
                <div class="col footer-brand">
                    <h3>${cfg.brand.name}</h3>
                    <p>${cfg.brand.description}</p>
                </div>
                ${cfg.links.map(linkSection => `
                    <div class="col footer-section">
                        <h4>${linkSection.title}</h4>
                        <ul>
                            ${linkSection.items.map(item => `
                                <li><a href="${item.href}" ${item.target ? `target="${item.target}"` : ""} rel="noopener noreferrer">${item.text}</a></li>
                            `).join("")}
                        </ul>
                    </div>
                `).join("")}
            </div>
            <div class="footer-bottom">
                <p>${cfg.copyright}</p>
                <p class="beian-info"></p>
            </div>
        </div>
    </footer>
    `;

    container.innerHTML = footerHTML;

    // 动态设置备案信息
    const beianInfo = container.querySelector('.beian-info');
    if (beianInfo && cfg.beian) {
        beianInfo.innerHTML = `
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">${cfg.beian.icp}</a> | 
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${cfg.beian.police.replace('琼公网安备', '')}" target="_blank" rel="noopener noreferrer">${cfg.beian.police}</a>
        `;
    }

    // 根据内容自动调整列高度
    const cols = container.querySelectorAll('.footer .col');
    let maxHeight = 0;
    cols.forEach(col => {
        if(col.offsetHeight > maxHeight) maxHeight = col.offsetHeight;
    });
    cols.forEach(col => col.style.minHeight = maxHeight + "px");
}

// 页面加载完成后渲染
document.addEventListener('DOMContentLoaded', () => renderFooter("site-footer"));
