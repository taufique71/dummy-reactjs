var React = require("react");

AssetAnalysis = React.createClass({
    render: function(){
        return (
            <div>
                <h2> Asset Analysis </h2>
                <iframe src="#" height="600" width="1000"></iframe>
            </div>
        )
    },
    componentDidMount: function(){
        var URL = config.accounts.base_url + '/accounts/v1/report/get_asset_report';
        $.ajax({
            url: URL,
            dataType: 'json',
            success: function(data) {
                $(React.findDOMNode(this)).find("iframe").attr({
                    "src": data,
                    "height": 600,
                    "width": 1000
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log( status, err.toString());
            }.bind(this)
        });
    }
});

module.exports = AssetAnalysis;
