/**
 * Created by Onibi/Guillaume Dupont v0.1.0
 */
var popupExist = false;
(function ($) {
	$.fn.customPopup = function (divId, params) {
		$(divId).css({display: "none"});
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
		var appendPopup = "body";
		var popupName = "custom-popup";
		var overlayName = popupName + "-overlay";
		var popupContainerName = popupName + "-content";
		var popup = "#" + popupName;
		var overlay = "#" + overlayName;
		var popupContainer = "." + popupContainerName;
		var closeButtonName = options.closeButtonName;
		var $customPopup = this;
		this.close = function () {
			$(popup).stop(true, true).fadeTo(options.duration, 0, function () {
				$(overlay).fadeTo(options.duration, 0, function () {
					$(popup).stop(true, true).removeClass(options.customClass).hide().empty();
					$(overlay).stop(true, true).hide();
				});
			});
		}
		var openCustomPopup = function (popupContent) {
			$(popup).css({top: getPopupTop(popupContent), left: getPopupLeft(popupContent) }).stop(true, true).fadeTo(options.duration, 1);
		}
		var getPopupTop = function (popupContent) {
			return ($(window).height() / 2) - (popupContent.outerHeight() / 2);
		}
		var getPopupLeft = function (popupContent) {
			return ($(window).width() / 2) - ((popupContent.outerWidth()) / 2);
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
			$(popup).css({
				minWidth       : options.minWidth,
				minHeight      : options.minHeight,
				maxWidth       : options.maxWidth,
				backgroundColor: options.background,
				position       : "fixed",
				padding        : 15,
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
			$(popupContainer).css({
				position: "relative"
			});
		}
		this.open = function () {
			var popupContent = $(divId);
			if (popupContent.length > 0) {
				if (!popupExist) {
					$(appendPopup).append("<div id='" + popupName + "' style='display:none;'></div>");
					$(appendPopup).append("<div id='" + overlayName + "' style='display:none;'></div>");
					popupExist = true;
				}
				if (jQuery(popup + ' ' + divId).length == 0) {
					popupContent.clone().appendTo(popup).addClass(popupContainerName);
				}
				$(popup).append('<span class="' + closeButtonName + '">X</span>');
				if (options.customClass != null) {
					$(popup).addClass(options.customClass);
				}
				$(popup + ' .' + closeButtonName).on('click', $customPopup.close);
				getCssPopup();
				$(popupContainer).show();
				$(overlay).fadeTo(options.duration, options.opacityOverlay, openCustomPopup($(popup))).stop(true, true).on('click', $customPopup.close);
				return $customPopup;
			}
		}
		return $customPopup.on('click', $customPopup.open);
	};
}(jQuery));