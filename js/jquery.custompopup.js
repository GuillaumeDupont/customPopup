/**
 * Created by Onibi/Guillaume Dupont v0.1.0
 */
var popupExist = false;
(function ($) {
	$.fn.popin = function (content, params) {
		var options = {
			customClass    : null,
			opacityOverlay : 0.65,
			duration       : "fast",
			closeButtonName: "close",
			minWidth       : 300,
			minHeight      : 50,
			maxWidth       : "50%",
			maxHeight      : "50%",
			background     : "#ffffff"
		}
		$.extend(options, params);
		var errorMsg = "An error occured";
		var ajaxContentName = "ajaxContent";
		var htmlContentName = "htmlContent";
		var appendPopup = "body";
		var popupName = "custom-popup";
		var name = "Winny";
		var overlayName = popupName + "-overlay";
		var popupContainerName = popupName + "-content";
		var popup = "#" + popupName;
		var overlay = "#" + overlayName;
		var popupContainer = "." + popupContainerName;
		var ajaxContent = "#" + ajaxContentName;
		var htmlContent = "#" + htmlContentName;
		var closeButtonName = options.closeButtonName;
		var $customPopup = this;
		$customPopup.css({
			cursor:"pointer"
		})
		this.close = function () {
			$(popup).stop(true, true).fadeTo(options.duration, 0, function () {
				$(overlay).fadeTo(options.duration, 0, function () {
					$(popup).stop(true, true).removeClass(options.customClass).hide().empty();
					$(overlay).stop(true, true).hide();
				});
			});
		}
		var openCustomPopup = function (popup) {
			$(popup).css({top: getPopupTop(popup), left: getPopupLeft(popup) }).stop(true, true).fadeTo(options.duration, 1);
		}
		var getPopupTop = function (popup) {
			var height = ((((window.innerHeight / 2) - (popup.height() / 2)) * 100) / (window.innerHeight));
			return height.toFixed(2) + '%';
		}
		var getPopupLeft = function (popup) {
			var width = ((((window.innerWidth / 2) - ((popup.width()) / 2)) * 100) / (window.innerWidth));
			return width.toFixed(2) + "%";
		}
		var getCssPopup = function () {
			$(overlay).css({
				position       : "fixed",
				top            : 0,
				left           : 0,
				width          : "100%",
				height         : "100%",
				backgroundColor: "#000000",
				zIndex         : 9998
			});
			$(popupContainer).css({
				position: "relative"
			});
			$(popup).css({
				minWidth       : options.minWidth,
				minHeight      : options.minHeight,
				maxWidth       : options.maxWidth,
				maxHeight      : options.maxHeight,
				backgroundColor: options.background,
				overflow	   : "auto",
				position       : "fixed",
				padding        : "25px 15px 15px",
				zIndex         : 9999
			});
			$(popup + " ." + closeButtonName).css({
				fontSize     : 20,
				textTransform: "uppercase",
				position     : "absolute",
				right        : 10,
				top          : 5,
				cursor       : "pointer",
				display      : "block"
			});

		}
		var createDiv = function () {
			$(appendPopup).append("<div id='" + popupName + "' style='display:none;'></div>");
			$(appendPopup).append("<div id='" + overlayName + "' style='display:none;'></div>");
		}
		var isHTML = function (str) {
			return !!$(str)[0];
		}
		var isSelector = function (str) {
			if (str[0] != "#" && str[0] != ".") {
				return false;
			} else {
				return true;
			}
		}
		if (isSelector(content)) {
			$(content).css({display: "none"});
		}
		var initPopup = function () {
			if (!popupExist) {
				createDiv();
				popupExist = true
			}
			return;
		}
		var contentSetup = function(isAjax, isHtml, popupContent){
			this.isAjax = isAjax;
			this.isHtml = isHtml;
			this.popupContent = $(popupContent);
			return this;
		}
		this.open = function () {
			if (isHTML(content) && !isSelector(content)) {
				initPopup();
				$(popup).append("<div id='" + htmlContentName + "'></div>");
				$(htmlContent).append(content).addClass(popupContainerName);
				var contents = contentSetup(false, true,htmlContent);
			} else if (!isSelector(content) && !isHTML(content)) {
				initPopup();
				$(popup).append("<div id='" + ajaxContentName + "'></div>");
				$(ajaxContent).load(content,function (response, status, xhr) {
					if (status == "error") {
						$(this).append('<p>' + errorMsg + " : " + xhr.status + " " + xhr.statusText + '</p>');
					}
				}).addClass(popupContainerName);
				var contents = contentSetup(true, false,ajaxContent);
			} else if (isSelector(content)) {
				var contents = contentSetup(false, false,content);
			}
			if (contents.popupContent.length > 0) {
				initPopup();
				if (!contents.isAjax && !contents.isHtml && $(popup + ' ' + content).length == 0) {
					contents.popupContent.clone().appendTo(popup).addClass(popupContainerName);
				}
				$(popup).append('<span class="' + closeButtonName + '">X</span>');
				if (options.customClass != null) {
					$(popup).addClass(options.customClass);
				}
				$(popup + ' .' + closeButtonName).on('click', $customPopup.close);
				$(popupContainer).show();
				console.log(name);
				getCssPopup();
				$(overlay).fadeTo(options.duration, options.opacityOverlay, openCustomPopup($(popup))).stop(true, true).on('click', $customPopup.close);
				return $customPopup;
			}
		}
		return $customPopup.on('click', $customPopup.open);
	};
}(jQuery));