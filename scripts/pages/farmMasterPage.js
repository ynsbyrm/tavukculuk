const extend                = require('js-base/core/extend');
const FarmMasterPageDesign  = require('ui/ui_farmMasterPage');
const HeaderBarItem         = require('sf-core/ui/headerbaritem');
const Router                = require('sf-core/router');
const Database              = require('sf-core/data').Database;
const Path                  = require('sf-core/io/path');
const File                  = require('sf-core/io/file');
const ListViewItem          = require('sf-core/ui/listviewitem');
const Label                 = require('sf-core/ui/label');
const TextAlignment         = require('sf-core/ui/textalignment');

const farmMasterPage = extend(FarmMasterPageDesign)(
  // Constructor
  function(_super) {
    // Initalizes super class for this page scope
    _super(this);
    // overrides super.onShow method
    this.onShow = onShow.bind(this, this.onShow.bind(this));
    // overrides super.onLoad method
    this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    var myItem = new HeaderBarItem({title: "Add Farm", onPress: function() { Router.go("farmCreatePage");}    });
    this.headerBar.setItems([myItem]);
  });

function listView(myListView, myDataSet){
  myListView.itemCount = myDataSet.length;
  myListView.onRowCreate = function() {
            var myListViewItem = new ListViewItem();
            var myLabelTitle = new Label({
                id: 102,
                height: 80,
                borderWidth: 3,
                borderRadius: 20,
                textAlignment: TextAlignment.MIDCENTER,
            });
            myListViewItem.addChild(myLabelTitle);
            return myListViewItem;
        };
        myListView.onRowBind = function(listViewItem, index) {
            var myLabelTitle = listViewItem.findChildById(102);
            var titleDegeri = "  ";
            titleDegeri += myDataSet[index].farmcode;
            titleDegeri += "  ";
            titleDegeri += myDataSet[index].title;
            myLabelTitle.text = titleDegeri;
        };
        myListView.onRowSelected = function(listViewItem, index) {
            alert("selected index = " + index);
        };

        myListView.onPullRefresh = function() {
            myDataSet.push({
            });
            myListView.itemCount = myDataSet.length;
            myListView.refreshData();
            myListView.stopRefresh();
        };
}

function onShow(superOnShow) {
    var myListView = this.children.listView1;
    var database = new Database({
        file: new File({path:  Path.DataDirectory + "//tavukculuk.sqlite" })
      });

    var myDataSet = [{}];
    var result = database.query("SELECT * FROM 'F40601'");
    
    for(var j=0; j < result.count(); j++)
    {
      var farmName = result.get(j).getString('FARMNAME');
      var code = result.get(j).getInteger('FARMCODE');
      var menuItem1 = ({title : farmName, farmcode : code});
      myDataSet[j] = menuItem1;
    }
    if(myDataSet[0].title != null)
    {
      listView(myListView, myDataSet);
    }
  superOnShow();
}

function onLoad(superOnLoad) {
  superOnLoad();
}

module && (module.exports = farmMasterPage);