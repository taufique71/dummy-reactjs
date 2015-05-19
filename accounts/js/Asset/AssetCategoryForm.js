var React = require("react");

var AssetCategoryForm = React.createClass({
    getInitialState: function(){
        return {
            'method_number': null,
            'method_end': null,
            'account_asset_id': null,
            'account_depreciation_id': null,
            'company_id': null,
            'method_time': null,
            'method_progress_factor': null,
            'account_expense_depreciation_id': null,
            'name': null,
            'journal_id': null,
            'note': null,
            'prorata': null,
            'open_asset': null,
            'method_period': null,
            'account_analytic_id': null,
            'method': null
        }
    },
    handleChange: function(event){
        var data = {};
        if(event.target['type']){
            if(event.target.type=='checkbox'){
                if(event.target.checked) data[event.target.name] = true;
                else data[event.target.name] = false;
            }
            else{
                data[event.target.name] = event.target.value;
            }
        }
        else data[event.target.name] = event.target.value;
        this.setState(data);
    },
    handleSubmit: function(event){
        event.preventDefault();
        var data = {
            'method_number': this.state.method_number,
            'method_end': this.state.method_end,
            'account_asset_id': this.state.account_asset_id,
            'account_depreciation_id': this.state.account_depreciation_id,
            'company_id': this.state.company_id,
            'method_time': this.state.method_time,
            'method_progress_factor': this.state.method_progress_factor,
            'account_expense_depreciation_id': this.state.account_expense_depreciation_id,
            'name': this.state.name,
            'journal_id': this.state.journal_id,
            'note': this.state.note,
            'prorata': this.state.prorata,
            'open_asset': this.state.open_asset,
            'method_period': this.state.method_period,
            'account_analytic_id': this.state.account_analytic_id,
            'method': this.state.method
        }
        console.log(data);
        $.ajax({
            url: config.generic.base_url + '/accounts/v1/create_asset_category',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            method: 'POST',
            success: function(data) {
                console.log('Request successful');
                $('#asset-category-create-form').prepend(
                    $('<div/>').attr({
                        'class': 'alert alert-success alert-dismissible',
                        'role': 'alert'
                    }).append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>').append('Submission successful')
                );
            },
            error: function(xhr, status, err) {
                console.log('Request unsuccessful');
                $('#asset-category-create-form').prepend(
                    $('<div/>').attr({
                        'class': 'alert alert-danger alert-dismissible',
                        'role': 'alert'
                    }).append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>').append('Submission unsuccessful')
                );
            }
        });
    },
    render: function(){
        return (
            <div >
                <h2>Create Asset Category</h2>
                <hr/>
                <form className="form-horizontal" id="asset-category-create-form">
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Name</label>
                        <div className="col-sm-6">
                            <input className="form-control" name="name" value={this.state.name} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Journal</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="journal_id" value={this.state.journal_id} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="5">Miscellenious Journal</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Asset Account</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="account_asset_id" value={this.state.account_asset_id} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="3">Fixed Assets</option>
                                <option value="4">Fixed Asset Account</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Depreciation Account</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="account_depreciation_id" value={this.state.account_depreciation_id} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="3">Fixed Assets</option>
                                <option value="4">Fixed Asset Account</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Depreciation Expense Account</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="account_expense_depreciation_id" value={this.state.account_expense_depreciation_id} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="3">Fixed Assets</option>
                                <option value="4">Fixed Asset Account</option>
                            </select>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Time Method</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="method_time" value={this.state.method_time} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="number">Number of Depreciations</option>
                                <option value="end">Ending Date</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Number of Depreciations</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="method_number" value={this.state.method_number} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Period Length</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="method_period" value={this.state.method_period} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Ending Date</label>
                        <div className="col-sm-3">
                            <input className="form-control" type="date" name="method_end" value={this.state.method_end} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Company</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="company_id" value={this.state.company_id} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="1">Your Company</option>
                            </select>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Computation Method</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="method" value={this.state.method} onChange={this.handleChange}>
                                <option value="null"></option>
                                <option value="linear">Linear</option>
                                <option value="degressive">Degressive</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Degression Factor</label>
                        <div className="col-sm-3">
                            <input className="form-control" name="method_progress_factor" value={this.state.method_progress_factor} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Prorata Temporis</label>
                        <div className="col-sm-1">
                            <input className="form-control" type="checkbox" name="prorata" value={this.state.prorata} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Skip Draft State</label>
                        <div className="col-sm-1">
                            <input className="form-control" type="checkbox" name="open_asset" value={this.state.open_asset} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Analytic Account</label>
                        <div className="col-sm-3">
                            <select className="form-control" name="account_analytic_id" value={this.state.account_analytic_id} onChange={this.handleChange}>
                                <option value="null"></option>
                            </select>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label">Note</label>
                        <div className="col-sm-6">
                            <textarea className="form-control" rows="3" name="note" value={this.state.note} onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <hr/>

                    <div className="form-group">
                        <label className="col-sm-3 control-label"></label>
                        <div className="col-sm-3">
                            <input className="btn btn-default" type="submit" value="Create" onClick={this.handleSubmit} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});


module.exports = AssetCategoryForm;
