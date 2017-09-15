const extend              = require('js-base/core/extend');
const ChartsPageDesign    = require('ui/ui_chartsPage');
const JET                 = require('sf-extension-oracle-jet');
const getCombinedStyle    = require("library/styler-builder").getCombinedStyle;
const color2Hex           = require("lib/ui/color2Hex");

const ChartsPage = extend(ChartsPageDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    this.children.button1.onPress = button1_onPress.bind(this);
    //this.children.flexLayout2.children.firstVal.onTextChange = firstVal_onTextChanged.bind(this);
    //-----------------------------
    
});

    
function button1_onPress(){
    var page = this;
    var x = 1;
    var jet = new JET({
        jetPath: "assets://jet/",
        webView: page.children.wvChart
    });
    var val1String = this.children.flexLayout2.children.firstVal.text;
    var val1Integer = 0;
    val1Integer = val1String;
    var val2String = this.children.flexLayout2.children.secondVal.text;
    var val2Integer = 0;
    val2Integer = val2String;
    var val3String = this.children.flexLayout2.children.thirdVal.text;
    var val3Integer = 0;
    val3Integer = val3String;
    var val4String = this.children.flexLayout2.children.fourthVal.text;
    var val4Integer = 0;
    val4Integer = val4String;
    var desc1 = this.children.flexLayout4.children.firstDesc.text;
    var desc2 = this.children.flexLayout4.children.secDesc.text;
    var desc3 = this.children.flexLayout4.children.thirdDesc.text;
    var desc4 = this.children.flexLayout4.children.fourthDesc.text;
    if(x == 1)
    {
    page.children.wvChart.visible = true;
    page.children.wvChart.bounceEnabled = false;
    const flexlayout1Style = getCombinedStyle(".flexLayout .flexLayout-headerBar", {
        width: null,
        flexGrow: null
    });
    var backgroundColor = color2Hex.getRGB(flexlayout1Style.backgroundColor);

    Object.assign(jet, {
        series: [{
            name: desc1,
            items: [val1Integer],
        }, {
            name: desc2,
            items: [val2Integer],
        }, {
            name: desc3,
            items: [val3Integer],
        },{
            name: desc4,
            items: [val4Integer],
        }],
        styleDefaults: {
            pieInnerRadius: 0.3,
            dataLabelPosition: "center"
        },
        plotArea: {
          backgroundColor:   backgroundColor
        },
        type: JET.Type.PIE,
        orientation: JET.Orientation.VERTICAL,
        stack: JET.Stack.OFF,
        animationOnDisplay: JET.AnimationOnDisplay.AUTO,
        animationOnDataChange: JET.AnimationOnDataChange.AUTO,
        legend: {
            rendered: JET.LegendRendered.AUTO,
            backgroundColor: backgroundColor,
            textStyle: "color:black;"
        },
        xAxis: {
            axisLine: {
                lineColor: "white"
            }
        },
        yAxis: {
            axisLine: {
                lineColor: "white"
            },
            tickLabel: {
                style: "color:white;",
                scaling: "none"
            }
        }

    });
    jet.legend.rendered = false;
    jet.jetData.backgroundColor = backgroundColor;
    jet.refresh();
    x++;
    }
    else
    {
        jet.refresh();
    }
}


    



function onShow(superOnShow) {
  superOnShow();
}


function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = ChartsPage);

/*

*/