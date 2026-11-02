/**
 * 文件：js/cf_tabs.js
 * 作者：陈福
 * 建立时间：2026-11-02
 * 使用模型：DeepSeek-V4.1-Flash
 * 功能名称：可复用 Tab 选项卡组件
 * 功能简介：为页面上任意一个 .cf_tab 容器提供选项卡切换能力。点击选项卡时，先清除同一组内所有选项卡的
 *           选中状态，再把选中状态设置到当前被点击的元素，同时只显示该选项卡对应的内容面板。
 *           一个页面可以放多组选项卡，各组互不干扰；脚本加载后自动初始化所有 [data-cf-tab] 容器。
 *
 * 页面结构约定（记在注释里便于复用）：
 *
 * <div class="cf_tab" data-cf-tab>
 *   <div class="cf_tab_bar" role="tablist">
 *     <button class="cf_tab_item cf_tab_item--active" role="tab"
 *             data-cf_tab_target="cf_panel_a" aria-selected="true">选项卡 A</button>
 *     <button class="cf_tab_item" role="tab"
 *             data-cf_tab_target="cf_panel_b" aria-selected="false">选项卡 B</button>
 *   </div>
 *   <div class="cf_tab_panel cf_tab_panel--active" id="cf_panel_a" role="tabpanel">内容 A</div>
 *   <div class="cf_tab_panel" id="cf_panel_b" role="tabpanel">内容 B</div>
 * </div>
 */
(function (cf_window, cf_document) {
	'use strict';

	// 选中状态用到的类名集中定义，避免在多处硬编码字符串
	var CF_ITEM_ACTIVE = 'cf_tab_item--active';
	var CF_PANEL_ACTIVE = 'cf_tab_panel--active';
	var CF_ARIA_ATTRIBUTE = 'aria-selected';
	var CF_READY_FLAG = 'cfTabReady';

	/**
	 * 清除所有选项卡的选中状态
	 * 核心实现：拿到同一组里的全部选项卡按钮与全部内容面板，逐个移除表示选中的类名，
	 *          并把 aria-selected 复位为 false。先整体清空再设置当前项，可以避免出现
	 *          “两个选项卡同时高亮”或“面板与高亮项错位”的情况。
	 * @param {HTMLElement[]} cf_items  同一组内的全部选项卡按钮
	 * @param {HTMLElement[]} cf_panels 同一组内的全部内容面板
	 * @returns {void}
	 */
	function cf_clearActive(cf_items, cf_panels) {
		var cf_i;

		for (cf_i = 0; cf_i < cf_items.length; cf_i += 1) {
			cf_items[cf_i].classList.remove(CF_ITEM_ACTIVE);
			cf_items[cf_i].setAttribute(CF_ARIA_ATTRIBUTE, 'false');
		}

		for (cf_i = 0; cf_i < cf_panels.length; cf_i += 1) {
			cf_panels[cf_i].classList.remove(CF_PANEL_ACTIVE);
		}
	}

	/**
	 * 设置当前选项卡为选中状态
	 * 核心实现：给被点击的按钮加上选中类名并同步 aria-selected；再按按钮上的
	 *          data-cf_tab_target 找到对应面板的 id，只让该面板显示出来。
	 *          目标面板不存在时只切换按钮状态，不报错，保证组件在结构不全时也不崩。
	 * @param {HTMLElement} cf_item     当前被选中的选项卡按钮
	 * @param {HTMLElement[]} cf_panels 同一组内的全部内容面板
	 * @returns {void}
	 */
	function cf_setActive(cf_item, cf_panels) {
		var cf_targetId = cf_item.getAttribute('data-cf_tab_target');
		var cf_targetPanel = null;
		var cf_i;

		cf_item.classList.add(CF_ITEM_ACTIVE);
		cf_item.setAttribute(CF_ARIA_ATTRIBUTE, 'true');

		for (cf_i = 0; cf_i < cf_panels.length; cf_i += 1) {
			if (cf_panels[cf_i].id === cf_targetId) {
				cf_targetPanel = cf_panels[cf_i];
				break;
			}
		}

		if (cf_targetPanel) {
			cf_targetPanel.classList.add(CF_PANEL_ACTIVE);
		}
	}

	/**
	 * 初始化单个选项卡容器
	 * 核心实现：用事件委托把 click 监听统一挂在 .cf_tab_bar 上，而不是给每个按钮各绑一个监听，
	 *          这样选项卡数量变化时无需重绑；事件冒泡到容器后通过 closest 找出真正被点击的按钮，
	 *          只处理点击落在选项卡上的情况。键盘 Enter / Space 也走同一套切换逻辑，保证可访问性。
	 *          容器上加 data-cfTabReady 标记，重复调用初始化不会重复绑定事件。
	 * @param {HTMLElement} cf_root 带 data-cf-tab 属性的选项卡容器
	 * @returns {void}
	 */
	function cf_initTabs(cf_root) {
		var cf_bar;
		var cf_items;
		var cf_panels;

		if (!cf_root || cf_root.getAttribute(CF_READY_FLAG) === '1') {
			return;
		}

		cf_bar = cf_root.querySelector('.cf_tab_bar');
		if (!cf_bar) {
			return;
		}

		cf_items = cf_root.querySelectorAll('.cf_tab_item');
		cf_panels = cf_root.querySelectorAll('.cf_tab_panel');

		// 事件委托：一个监听覆盖组内全部选项卡
		cf_bar.addEventListener('click', function (cf_event) {
			var cf_clicked = cf_event.target.closest('.cf_tab_item');

			// 点击落点不在选项卡上（例如点在选项卡之间的空隙）时直接返回
			if (!cf_clicked || !cf_bar.contains(cf_clicked)) {
				return;
			}

			// 先清除全部选中状态，再设置当前元素
			cf_clearActive(cf_items, cf_panels);
			cf_setActive(cf_clicked, cf_panels);
		});

		// 键盘操作：焦点在选项卡按钮上时，Enter 或 Space 等同于点击
		cf_bar.addEventListener('keydown', function (cf_event) {
			var cf_focused = cf_event.target.closest('.cf_tab_item');

			if (!cf_focused || (cf_event.key !== 'Enter' && cf_event.key !== ' ')) {
				return;
			}

			// 阻止空格键在按钮上触发页面滚动
			cf_event.preventDefault();
			cf_clearActive(cf_items, cf_panels);
			cf_setActive(cf_focused, cf_panels);
		});

		cf_root.setAttribute(CF_READY_FLAG, '1');
	}

	/**
	 * 初始化页面上所有选项卡容器
	 * 核心实现：遍历所有 [data-cf-tab] 容器逐个调用 cf_initTabs，因此一个页面里放多组选项卡
	 *          也能各自独立工作，状态互不影响。
	 * @returns {void}
	 */
	function cf_initAll() {
		var cf_rootList = cf_document.querySelectorAll('[data-cf-tab]');
		var cf_i;

		for (cf_i = 0; cf_i < cf_rootList.length; cf_i += 1) {
			cf_initTabs(cf_rootList[cf_i]);
		}
	}

	// 暴露到全局，方便动态插入的选项卡结构在插入后手动初始化
	cf_window.cf_initTabs = cf_initTabs;

	// 脚本在 <body> 末尾引入时 DOM 已就绪，直接初始化；放在 <head> 则等 DOMContentLoaded
	if (cf_document.readyState === 'loading') {
		cf_document.addEventListener('DOMContentLoaded', cf_initAll);
	} else {
		cf_initAll();
	}
})(window, document);
