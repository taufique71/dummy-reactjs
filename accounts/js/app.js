var React = require("react") ;
var Router = require("react-router") ;
var RouteHandler = Router.RouteHandler;

var DefaultRoute = Router.DefaultRoute ;
var Link = Router.Link ;
var Route = Router.Route ;


var Navigation = require("./navigation/navigation.js");

var App = React.createClass({
	getInitialState: function(){
        return ({
			activeNavigationUrl: "",
            navigationItems: [
                {
                    "name": "Sales",
                    "menu": [
                        {
                            "name": "Create Sales",
                            "handler": "createnew"
                        },
                        {
                            "name": "Sales Journal",
                            "handler": "salesjournal"
                        }
                    ]
                },
                {
                    "name": "Purchase",
                    "menu": [
                        {
                            "name": "Create New Purchase",
                            "handler": "createnewpurchase"
                        },
                        {
                            "name": "Purchase Journal",
                            "handler": "purchasejournal"
                        }
                    ]
                },
                {
                    "name": "Invoice",
                    "menu": [
                    ]
                },
                {
                    "name": "Manual Journal Entry",
                    "menu": [
                        {
                            "name": "Create Journal Entry",
                            "handler": "createManualJEntry"
                        }
                    ]
                },
                {
                    "name": "Bank",
                    "menu": [
                        {
                            "name": "Create Bank Account",
                            "handler": "createBankAccount"
                        }
                    ]
                },
                {
                    "name": "Asset",
                    "menu": [
                        {
                            "name": "Create Asset Category",
                            "handler": "createAssetCategory"
                        },
                        {
                            "name": "Create Asset",
                            "handler": "createAsset"
                        },
                        {
                            "name": "Asset List",
                            "handler": "assetslist"
                        }
                    ]
                },
                {
                    "name": "Report",
                    "menu": [
                        {
                            "name": "Asset Analysis",
                            "handler": "assetAnalysis"
                        }
                    ]
                }
            ],
			storyItems: []
		});
	},
	render: function(){
		return (
			<div id = 'container'>
				<div id = 'top-nav'>
					<Navigation items = {this.state.navigationItems} />
				</div>
				<div id = "container" style={{'padding-top': '50px'}}>
					<RouteHandler/>
				</div>
			</div>
		);
	}
});

var SalesJournal = require("./SalesJournal/SalesJournal") ;
var SalesReceiptForm = require("./SalesReceiptForm/SalesReceiptForm") ;
var PurchaseOrderForm = require("./PurchaseOrderForm/PurchaseOrderForm") ;
var PurchaseJournal = require("./PurchaseJournal/PurchaseJournal") ;
var SupplierInvoice = require("./invoice/SupplierInvoice") ;
var CreateBankAccount = require("./Bank/CreateBankAccount") ;
var Invoice = require("./invoice/Invoice") ;

var AssetsList = require("./Asset/AssetsList");
var AssetForm = require("./Asset/AssetForm");
var AssetCategoryForm = require("./Asset/AssetCategoryForm");
var AssetUpdateForm = require("./Asset/AssetUpdateForm");
var AssetAnalysis = require("./Asset/AssetAnalysis");

var ManualJournalEntry = require('./ManualJournalEntry/ManualJournalEntry') ;
 
var routes = (
	<Route name = "app" path = "/" handler = {App}>
		<Route name = "createnew" handler = {SalesReceiptForm} />
		<Route name = "salesjournal" handler = {SalesJournal} />
		<Route name = "invoice" path = "invoice/:invoiceId" handler = {Invoice} />
		<Route name = "purchasejournal" handler = {PurchaseJournal} />
		<Route name = "createnewpurchase" handler = {PurchaseOrderForm} />
		<Route name = "supplierinvoice" path = "supplierinvoice/:invoiceId" handler = {SupplierInvoice}  />
        <Route name = "createBankAccount" handler = {CreateBankAccount} /> 
        <Route name = "createManualJEntry" handler = {ManualJournalEntry} />

        <Route name = "assetslist" handler = {AssetsList} />
        <Route name = "createAssetCategory" handler = {AssetCategoryForm} />
        <Route name = "createAsset" handler = {AssetForm} />
        <Route name = "updateAsset" path = "update_asset/:assetId" handler = {AssetUpdateForm} />
        <Route name = "assetAnalysis" path = "report/asset_analysis" handler = {AssetAnalysis} />
	</Route>

);


Router.run(routes, function (Handler){
    React.render( <Handler/> , document.body) ;
});

