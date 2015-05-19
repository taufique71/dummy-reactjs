var React = require("react");

var AssetTableHeader = React.createClass({
    render: function() {
        var headerRow;
        if(this.props.data.length > 0) {
            headerRow = Object.keys(this.props.data[0]).map(function (col) {
                return (
                    <th>{col}</th>
                    );
            });
        }
        else
            headerRow = ""

        return (
            <thead>
                <tr>
                    {headerRow}
                </tr>
            </thead>
        );
    }
});

var AssetTableRow = React.createClass({
    render: function() {
        var rowData = this.props.data;
        var singleRow = Object.keys(rowData).map(function(key) {
          return (
              <td>{rowData[key]}</td>
          );
        });
        return (
            <tr>
                {singleRow}
            </tr>
        );
    }
});

var AssetTableBody = React.createClass({
    render: function() {
        var rows = this.props.data.map(function(row) {
            return (
                <AssetTableRow data={row} />
            );
        });
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
});

var AssetTable = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
    	if(this.props.url)
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <table className="table table-striped table-bordered table-hover">
                <AssetTableHeader data={this.state.data}  />
                <AssetTableBody data={this.state.data} />
            </table>
        );
    }
});

var AssetsList = React.createClass({
    render: function(){
        var URL = config.accounts.base_url + '/accounts/v1/assets_list';
        return (
            <div id = "container">
                <h2>Asset List</h2>
                <hr/>
                <AssetTable url = {URL} />
            </div>
        );
    }
});

module.exports = AssetsList;
