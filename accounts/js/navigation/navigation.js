
var React = require("react") ;
var Link = require("react-router").Link ;

var Menu = React.createClass({
    render: function(){
        return (
            <li> <Link to={this.props.menuItem.handler}> {this.props.menuItem.name} </Link> </li>
        );
    }
});

var NavigationItem = React.createClass({
    render: function() {
        var menu = this.props.item.menu.map(function(menuItem){
          return (<Menu menuItem = {menuItem} />);
        });
        return (
            <li className ="dropdown">
               <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                   {this.props.item.name} 
                   <span class="caret"></span>
               </a>
               <ul className="dropdown-menu" role="menu">
                   {menu}
               </ul>
            </li>
        );
    }
});

var Navigation = React.createClass({
  render: function(){
    var items = this.props.items.map(function(item){
      return (
                <NavigationItem item={item} />
      );
    });

    return (
      <nav className = "navbar navbar-inverse navbar-fixed-top">
        <div className = "container-fluid">
          <div className = "navbar-header">
            <a className = "navbar-brand" href = "#"> Accounts </a>
          </div>


          <div className = "collapse navbar-collapse" id = "collapse-1">
            <ul className = "nav navbar-nav">
              { items }
            </ul>
          </div>
        </div>
      </nav>
    ) ;
  }
});

module.exports = Navigation ;
