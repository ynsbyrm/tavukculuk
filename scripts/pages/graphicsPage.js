/*globals lang*/
const extend              = require('js-base/core/extend');
const GraphicsPageDesign  = require('ui/ui_graphicsPage');
const JET                 = require('sf-extension-oracle-jet');
const FlexLayout          = require('sf-core/ui/flexlayout');
const Font                = require('sf-core/ui/font');
const Label               = require('sf-core/ui/label');
const WebView             = require('sf-core/ui/webview');
const theme               = require("../lib/theme");
const StatusBarStyle      = require('sf-core/ui/statusbarstyle');

var labelFont = Font.create(Font.DEFAULT, 16, Font.BOLD);
var webViewHeight = 375;
var webViewMargin = 5;
var labelHeigth = 50;
var labelWidth = 150;
var viewMargin = 10;
var oneChartHeight = webViewHeight + (2 * webViewMargin) + labelHeigth + (2 * viewMargin);

const GraphicsPage = extend(GraphicsPageDesign)(
  // Constructor
  function(_super) {
    var page = this;
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    var baseOnLoad = page.onLoad;
    var baseOnShow = page.onShow;
    page.onLoad = function onLoad() {
            baseOnLoad && baseOnLoad();
            var selectedTheme = theme[theme.selected];
            var charts = [{
                title: "bu yuvarlak",
                jetData: {
                    series: [{
                        name: lang.closed,
                        items: [1],
                        color: selectedTheme.chartColors[0]
                    }, {
                        name: lang.assigned,
                        items: [1],
                        color: selectedTheme.chartColors[1]
                    }, {
                        name: lang.progress,
                        items: [6],
                        color: selectedTheme.chartColors[2]
                    }],
                    styleDefaults: {
                        pieInnerRadius: 0.5,
                    },
                    type: JET.Type.PIE,
                    orientation: JET.Orientation.VERTICAL,
                    stack: JET.Stack.OFF,
                    animationOnDisplay: JET.AnimationOnDisplay.AUTO,
                    animationOnDataChange: JET.AnimationOnDataChange.AUTO,
                },
            }, {
                title: "bu çubuklu",
                jetData: {
                    series: [{
                        name: lang.closed,
                        items: [1, 3, 4, 2, 3, 4],
                        color: selectedTheme.chartColors[0]
                    }, {
                        name: lang.assigned,
                        items: [2, 3, 6, 4, 3, 4],
                        color: selectedTheme.chartColors[1]
                    }, {
                        name: lang.progress,
                        items: [0, 0, 1, 0, 0, 3],
                        color: selectedTheme.chartColors[2]
                    }],
                    groups: ["ali", "seval", "okan", "rukiye", "önder", "tankut"],
                    type: JET.Type.BAR,
                    orientation: JET.Orientation.VERTICAL,
                    stack: JET.Stack.ON,
                    hoverBehavior: JET.HoverBehavior.DIM,
                    animationOnDisplay: JET.AnimationOnDisplay.AUTO,
                    animationOnDataChange: JET.AnimationOnDataChange.AUTO
                }
            }, {
                title: "bu çizgili",
                jetData: {
                    series: [{
                        name: "Abc",
                        items: [0, 0, 2, 4, 0, 4],
                        color: selectedTheme.chartColors[0]
                    }, {
                        name: "FridgeCare",
                        items: [2, 2, 0, 1, 0, 0],
                        color: selectedTheme.chartColors[1]
                    }, {
                        name: "Nordica",
                        items: [0, 8, 4, 4, 2, 0],
                        color: selectedTheme.chartColors[2]
                    }, {
                        name: "Microwave",
                        items: [0, 6, 2, 3, 0, 1],
                        color: selectedTheme.chartColors[3]
                    }, {
                        name: "DishWaze",
                        items: [2, 2, 0, 1, 2, 1],
                        color: selectedTheme.chartColors[4]
                    }],
                    groups: ["ocak", "şubat", "mart", "nisan", "mayıs", "haziranfa"],
                    type: JET.Type.LINE,
                    orientation: JET.Orientation.VERTICAL,
                    stack: JET.Stack.ON,
                    hoverBehavior: JET.HoverBehavior.DIM,
                    animationOnDisplay: JET.AnimationOnDisplay.AUTO,
                    animationOnDataChange: JET.AnimationOnDataChange.AUTO
                }
            }];

            var svChart = page.children.svChart;
            charts.forEach(function(element) {
                svChart.layout.addChild(generateChartTemplate(element.jetData, element.title, element.url));
            });

            svChart.layout.height = (svChart.layout.getChildCount()) * oneChartHeight;
            // myScrollView.layout.justifyContent = FlexLayout.JustifyContent.SPACE_AROUND;
            svChart.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
        };

        page.onShow = function onShow(data) {
            baseOnShow && baseOnShow(data);
            page.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
            applyTheme();
            page.headerBar.title = lang.dashboard;
        };

        function applyTheme() {
            var selectedTheme = theme[theme.selected];
            page.statusBar.android && (page.statusBar.android.color = selectedTheme.topBarColor);
            page.headerBar.backgroundColor = selectedTheme.topBarColor;
            //page.imgReports.image = selectedTheme.reportImage;
            page.layout.backgroundColor = selectedTheme.dashboardColor;
        }




  });

function generateChartTemplate(jetData, labelText, chartUrl) {
    var layout = new FlexLayout({
        margin: viewMargin,
        height: webViewHeight + (2 * webViewMargin) + labelHeigth
    });

    var labelArea = new Label({
        height: labelHeigth,
        width: labelWidth,
        font: labelFont,
        text: labelText
    });
    var webView = new WebView({
        height: webViewHeight,
        margin: webViewMargin,
        alignSelf: FlexLayout.AlignSelf.STRETCH,
        touchEnabled: false
    });

    var jet = new JET({
        jetPath: "assets://jet/",
        webView: webView
    });
    // jet.plotArea.backgroundColor = "#FF0000";
    // jet.legend.backgroundColor = "#FFFFFF";
    jet.jetData.backgroundColor = "#FFFFFF";


    Object.assign(jet, jetData);
    layout.addChild(labelArea);
    layout.addChild(webView);
    return layout;
}

function onShow(superOnShow) {
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = GraphicsPage);