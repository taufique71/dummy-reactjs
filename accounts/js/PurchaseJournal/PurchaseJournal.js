
var React = require("react") ;

var PurchaseJournal = React.createClass({
  render: function(){
    var URL = config.accounts.base_url + "/accounts/v1/purchase_journal" ;
    return (
      <div id = "container">  
        <Table url = {URL} />
      </div>  
    ) ;
  }
});



var Table = React.createClass({
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
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

      
    },
    render: function() {
      if(this.props.data){
        this.setState({data : this.props.data}) ;
      }
        return (
            <table className="table table-striped table-bordered table-hover">
                <TableHeader data={this.state.data}  />
                <TableBody data={this.state.data} />
            </table>
        );
    }

});


var TableHeader = React.createClass({
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

var TableRow = React.createClass({
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

var TableBody = React.createClass({
    render: function() {
      // console.log("BODY: " + JSON.stringify(this.props.data) ) ;
        var rows = this.props.data.map(function(row) {
          // console.log("ROW : " + row) ;
            return (
                <TableRow data={row} />
            );
        });
        return (
            <tbody>
              {rows}
            </tbody>
        );
    }
});



module.exports = PurchaseJournal ;