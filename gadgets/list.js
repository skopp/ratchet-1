(function (root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        // AMD
        define(function(require, exports, module) {

            require("css!ratchet-gadgets/common.css");
            require("css!ratchet-gadgets/list.css");

            var html = require("text!ratchet-gadgets/list.html");
            var Ratchet = require("ratchet");

            require("ratchet-web");
            require("ratchet-tmpl");
            require("bootstrap");
            require("datatables");
            require("datatables-bootstrap");
            var _ = require("underscore");

            factory(Ratchet, html, _);

            return Ratchet;
        });
    }
    else
    {
        return factory(root.Ratchet, "./list.html", root._);
    }

}(this, function(Ratchet, html, _) {

    return Ratchet.GadgetRegistry.register("list", Ratchet.AbstractDynamicGadget.extend({

        TEMPLATE: html,

        selectedItems: function() {
            return this._observable("selectedItems", arguments,{});
        },

        clearSelectedItems: function() {
            this.observable("selectedItems").clear();
        },

        itemsCount : function(obj) {

            if (!obj) {
                return 0;
            }

            var count = 0, key;

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    count++;
                }
            }
            return count;
        },

        firstItem : function(obj) {

            if (!obj) {
                return null;
            }

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    return obj[key];
                }
            }
        },

        onSelectedItems: function() {
            var self = this;
            var toolbarName = self.subscription == 'list' ? 'toolbar' : self.subscription + "-toolbar";
            var toolbar = self._observable(toolbarName,[]);
            /*
             if (toolbar && toolbar.items) {
             var displayedItemCounter = 0;
             $.each(toolbar.items, function(key, item) {

             item["visibility"] = item.requiredAuthorities ? false : true;

             if (item.requiredAuthorities) {
             var selectedItemsRequiredAuthorities = [];
             $.each(self.selectedItems(),function(i,v) {
             if ($.isArray(item.requiredAuthorities)) {
             $.each(item.requiredAuthorities,function() {
             var permissioned = this['permissioned'] ? this['permissioned'] : v;
             if ($.isFunction(permissioned)) {
             permissioned = permissioned(v);
             }
             selectedItemsRequiredAuthorities.push({
             "permissioned" : permissioned,
             "permissions" : this['permissions']
             });
             })
             } else {
             var permissioned = item.requiredAuthorities['permissioned'] ? item.requiredAuthorities['permissioned'] : v;
             if ($.isFunction(permissioned)) {
             permissioned = permissioned(v);
             }
             selectedItemsRequiredAuthorities.push({
             "permissioned" : item.requiredAuthorities['permissioned'] ? item.requiredAuthorities['permissioned'] : v,
             "permissions" : item.requiredAuthorities['permissions']
             });
             }
             });
             self.checkAuthorities(function(isEntitled) {
             if (isEntitled) {
             if (item.selection && item.selection == 'single') {
             if (self.itemsCount(self.selectedItems()) == 1) {
             $('#toolbar-item-' + key).show();
             displayedItemCounter ++;
             }
             }
             if (item.selection && item.selection == 'multiple') {
             if (self.itemsCount(self.selectedItems()) >= 1) {
             $('#toolbar-item-' + key).show();
             displayedItemCounter ++;
             }
             }
             }
             item["visibility"] = isEntitled;
             }, selectedItemsRequiredAuthorities);
             }

             if (item.selection && item.selection == 'single') {
             if (self.itemsCount(self.selectedItems()) == 1 && item["visibility"]) {
             $('#toolbar-item-'+key).show();
             displayedItemCounter ++;
             } else {
             $('#toolbar-item-'+key).hide();
             }
             }
             if (item.selection && item.selection == 'multiple') {
             if (self.itemsCount(self.selectedItems()) >= 1 && item["visibility"]) {
             $('#toolbar-item-'+key).show();
             displayedItemCounter ++;
             } else {
             $('#toolbar-item-'+key).hide();
             }
             }
             });

             var options = $.browser.msie ? {
             "left" : "-270px",
             "width" : "225px",
             "z-index" : "999",
             "border" : "1px solid #25333c",
             "display" : "block",
             "position" : "absolute"
             } : {
             "left" : "-280px",
             "width" : "225px",
             "z-index" : "999",
             "border": "1px solid #25333c",
             "border-radius": "5px 5px 5px 5px",
             "box-shadow": "0 0 5px rgba(0, 0, 0, 0.5)"
             };

             $('.list-toolbar').css(options).stickySidebar();

             if (displayedItemCounter == 0) {
             $('.list-toolbar').css({
             "border": "0px none"
             });
             }
             }
             */
        },

        processActions: function(model) {

            /*
             var self = this;
             if (list.actions) {
             var toolbarName = self.subscription == 'list' ? 'toolbar' : self.subscription + "-toolbar";
             var toolbar = this._observable(toolbarName,[]);
             for (var action in list.actions) {
             var actionObject = list.actions[action];
             var actionTitle = actionObject.title;
             var actionClick = actionObject.click;
             var actionIcon = actionObject.icon ? actionObject.icon : "";
             var actionSelection = actionObject.selection ? actionObject.selection : 'single';
             // CREATE
             var button = {
             "id": action,
             "title": actionTitle,
             "icon": actionIcon,
             "selection" : actionSelection,
             "click": function(actionClick) {
             return function(event) {
             if (this.selection == 'single') {
             if (self.itemsCount(self.selectedItems()) == 1) {
             actionClick.call(self, self.firstItem(self.selectedItems()), self.oTable);
             }
             } else if (this.selection == 'multiple') {
             if (self.itemsCount(self.selectedItems()) >= 1) {
             actionClick.call(self, self.selectedItems(), self.oTable);
             }
             } else if (this.selection == 'none') {
             actionClick.call(self, self.oTable);
             }
             };
             }(actionClick)
             };
             if (actionObject.requiredAuthorities) {
             button.requiredAuthorities = actionObject.requiredAuthorities;
             }
             toolbar.items[button.id] = button;
             }
             this.observable(toolbarName).set( toolbar);
             }
             */
        },

        prepareModel: function(el, model, callback)
        {
            this.base(el, model, function() {

                if (!model.items)
                {
                    model.items = [];
                }

                callback();

            });
        },

        beforeSwap: function(el, model, callback)
        {
            var self = this;

            // detect changes to the list and redraw when they occur
            // this.subscribe(this.subscription, this.refresh);

            /*
             if (this.filterSubscription) {
             this.subscribe(this.filterSubscription, this.refresh);
             }
             */

            self.clearSelectedItems();

            callback();
        },

        afterSwap: function(el, model, context, callback)
        {
            var self = this;

            //////////////////////////////////////////////////////////////////////////////
            //
            // DEFINE THE DATA TABLE
            //
            //////////////////////////////////////////////////////////////////////////////

            var tableConfig = {
                "bPaginate": true,
                "bFilter": true,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false,
                "oLanguage": {
                    "sLengthMenu": "Display _MENU_ records per page",
                    "sZeroRecords": "Nothing found - sorry",
                    "sInfo": "Showing _START_ to _END_ of _TOTAL_ records",
                    "sInfoEmpty": "Showing 0 to 0 of 0 records",
                    "sInfoFiltered": "(filtered from _MAX_ total records)",
                    "sSearch": "Filter:"
                }
            };
            // bootstrap
            //tableConfig["sDom"] = "<'row-fluid'<'span6'T><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>";
            /*
             $.extend( $.fn.dataTableExt.oStdClasses, {
             "sWrapper": "dataTables_wrapper form-inline"
             } );
             */

            if (model.lengthMenu)
            {
                tableConfig["aLengthMenu"] = [];
                tableConfig["aLengthMenu"].push(model.lengthMenu.values);
                tableConfig["aLengthMenu"].push(model.lengthMenu.labels);
                //[[10, 25, 50, -1], [10, 25, 50, "All"]]
            }

            //tableConfig["bJQueryUI"] = true;
            //tableConfig["sPaginationType"] = "full_numbers";
            var tableExists = ($(el).find(".display").length > 0);
            if (tableExists) {
                tableConfig.bDestroy = tableExists;
            }
            tableConfig["bProcessing"] = true;
            tableConfig["bServerSide"] = true;
            tableConfig["aoColumns"] = [];
            if (model.checkbox)
            {
                tableConfig["aoColumns"].push({
                    "bVisible": true,
                    "bSearchable": false,
                    "bSortable": false,
                    "sWidth": "10px",
                    "sTitle": "<input type='checkbox' class='table-overall-checkbox'/>"
                });
            }
            if (model.icon)
            {
                tableConfig["aoColumns"].push({
                    "bVisible": true,
                    "bSearchable": false,
                    "bSortable": false,
                    "sTitle": ""
                });
            }

            // push for each column
            if (model.columns)
            {
                for (var i = 0; i < model.columns.length; i++) {
                    var item = model.columns[i];

                    var columnSortable = item.sortingExpression ? true : false;

                    var config = {
                        "bVisible": true,
                        "bSearchable": true,
                        "bSortable": columnSortable
                    };

                    if (model.columns[i].hidden) {
                        config["bVisible"] = false;
                    }

                    tableConfig["aoColumns"].push(config);
                }
            }
            else
            {
                throw new Error("Missing model.columns");
            }




            //////////////////////////////////////////////////////////////////////////////
            //
            // FUNCTIONS FOR INTERPRETING DATA THAT IS LOADED INTO THE TABLE
            //
            //////////////////////////////////////////////////////////////////////////////

            // load
            tableConfig["fnServerData"] = function(sSource, aoData, fnCallback)
            {
                // create key value map for facility of looking up DataTables values
                var keyValues = {};
                for (var i = 0; i < aoData.length; i++) {
                    keyValues[aoData[i].name] = aoData[i].value;
                }

                // build json that we'll pass into data tables
                var json = {};
                json["sEcho"] = keyValues["sEcho"];
                json["aaData"] = [];


                //////////////////////////////////////////////////////////////////////////////
                // SEARCH TERM
                //////////////////////////////////////////////////////////////////////////////

                // allow search term from data tables default control
                var searchTerm = keyValues["sSearch"];
                if (!searchTerm) {

                    // if not specified, allow lookup from an observable
                    var searchTermObservableName = model.observables.searchTerm;
                    if (!searchTermObservableName) {
                        searchTermObservableName = "searchTerm";
                    }
                    searchTerm = self.observable(searchTermObservableName).get();
                }


                //////////////////////////////////////////////////////////////////////////////
                // QUERY
                //////////////////////////////////////////////////////////////////////////////

                // allow query to be set from an external observable
                var queryObservableName = model.observables.query;
                if (!queryObservableName) {
                    queryObservableName = "query";
                }
                var query = self.observable(queryObservableName).get();



                //////////////////////////////////////////////////////////////////////////////
                // PAGINATION
                //////////////////////////////////////////////////////////////////////////////

                var pagination = {
                    "skip": keyValues["iDisplayStart"],
                    "limit": keyValues["iDisplayLength"]
                };

                // apply sort to pagination
                var sortColIndex = keyValues["iSortCol_0"];
                if (sortColIndex > 1) {
                    var sortColProperty = model.columns[sortColIndex - 2].property;
                    pagination["sort"] = { };
                    var direction = keyValues["sSortDir_0"] == 'asc' ? 1 : -1;
                    if (Ratchet.isString((sortColProperty))) {
                        pagination["sort"][sortColProperty] = direction;
                    }
                    if (Ratchet.isFunction(sortColProperty) && model.columns[sortColIndex - 2].sortingExpression) {
                        pagination["sort"][model.columns[sortColIndex - 2].sortingExpression] = direction;
                    }
                }





                //////////////////////////////////////////////////////////////////////////////
                // LOAD FROM SERVER
                //////////////////////////////////////////////////////////////////////////////

                var loaderId = model.loader;
                if (!loaderId) {
                    loaderId = "default";
                }
                var loader = self.loaders[loaderId];
                if (!loader) {
                    throw new Error("Cannot find loader: " + loaderId);
                }

                loader.call(self, context, model, keyValues, sSource, aoData, searchTerm, query, pagination, function(aaData, attrs) {

                    for (var i = 0; i < aaData.length; i++)
                    {
                        json["aaData"].push(aaData[i]);
                    }

                    if (attrs)
                    {
                        if (attrs.iTotalRecords || attrs.iTotalRecords == 0)
                        {
                            json["iTotalRecords"] = attrs.iTotalRecords;
                        }

                        if (attrs.iTotalDisplayRecords || attrs.iTotalDisplayRecords == 0)
                        {
                            json["iTotalDisplayRecords"] = attrs.iTotalDisplayRecords;
                        }
                    }

                    fnCallback(json);
                });
            };


            // register callbacks
            tableConfig["fnCreatedRow"] = function( nRow, aData, iDataIndex ) {
                self.handleCreatedRow.call(self, el, model, this, nRow, aData, iDataIndex);
            };
            tableConfig["fnRowCallback"] = function(nRow, aData, iDisplayIndex) {
                self.handleRowCallback.call(self, el, model, this, nRow, aData, iDisplayIndex);
            };
            tableConfig["fnInitComplete"] = function(oSettings, json) {
                self.handleInitComplete.call(self, el, model, this, oSettings, json);
            };



            if (model.tableConfig) {
                $.extend(true, tableConfig, model.tableConfig);
            }

            if (model.hideCheckbox) {
                tableConfig["aoColumns"][0]["bVisible"] = false;
            }

            if (model.hideIcon) {
                tableConfig["aoColumns"][1]["bVisible"] = false;
            }

            // RENDER THE TABLE
            self.oTable = $(el).find("table").dataTable(tableConfig);

            if (el.uniform) {
                $("select, input:checkbox, input:text, input:password, input:radio, input:file, textarea",$(el)).uniform();
            }

            // select/unselect-all checkbox
            $('.table-overall-checkbox',$(el)).click(function() {
                if ($(this).attr("checked")) {
                    $(".gitanaselectbox").each(function() {
                        if (! $(this).attr("checked")) {
                            $(this).attr("checked",true);
                        }
                    });
                    self.clearSelectedItems();
                    var allItems = {};
                    /*
                     $.each(map.map,function(key,val) {
                     if( $("input:checkbox[gitanatargetobjectid='" + key +"']").length > 0) {
                     allItems[key] = Chain(val);
                     }
                     });
                     */
                    self.selectedItems(allItems);
                    self.onSelectedItems();
                } else {
                    $(".gitanaselectbox").each(function() {
                        if ($(this).attr("checked")) {
                            $(this).attr("checked",false);
                        }
                    });
                    self.clearSelectedItems();
                    self.onSelectedItems();
                }
            });

            // special actions
            self.processActions(model);

            // init any buttons
            $('.dropdown-toggle', el).dropdown();

            //el.swap();

            // all done - fire callback
            callback();
        },

        /**
         * Converts a single row of JSON data to a DataTables format.
         *
         * The incoming JSON row looks like:
         *
         *   {
         *     "id": "id1",
         *     "title": "title1",
         *     "description": "description1"
         *   }
         *
         * And the data table JSON row that gets generated looks like:
         *
         *   {
         *     "DT_RowId": "id1",
         *     "DT_RowClass": "row_id1",
         *     "0": "title1",
         *     "1": "description1"
         *   }
         *
         * This method takes into account the configuration of the list control for things like links, checkboxes
         * and icon columns.
         */
        toDataTableRow: function(model, row)
        {
            var self = this;



            //////////////////////////////////////////////////////////////////////////////
            //
            // LINK URI
            //
            //////////////////////////////////////////////////////////////////////////////

            var linkUri = this.linkUri.call(self, row);



            //////////////////////////////////////////////////////////////////////////////
            //
            // READ ONLY
            //
            //////////////////////////////////////////////////////////////////////////////

            var readOnly = this.isReadOnly.call(self, row);




            //////////////////////////////////////////////////////////////////////////////
            //
            // DATA
            //
            //////////////////////////////////////////////////////////////////////////////

            var id = row["id"];
            var data = {
                "DT_RowId": id,
                "DT_RowClass": "row_" + id
            };
            var counter = 0;

            // COLUMN: checkbox?
            if (model.checkbox)
            {
                if (readOnly) {
                    data["" + counter] = "";
                } else {
                    data["" + counter] = "<input type='checkbox' class='gitanaselectbox' gitanatargetobjectid='" + id + "'>";
                }
                counter++;
            }


            // COLUMN: icon?
            if (model.icon)
            {
                var markup = "";
                if (self.iconUri) {
                    var iconUri = self.iconUri.call(self, row);
                    if (iconUri) {
                        markup = "<img align='center' src='" + iconUri + "' style='height: 128px'>";
                    }
                }

                if (!markup && self.iconClass) {
                    var iconClass = self.iconClass.call(self, row);
                    if (iconClass) {
                        markup = "<div class='" + iconClass + "'></div>";
                    }
                }

                data["" + counter] = markup;

                counter++;
            }




            // DATA COLUMNS
            if (model.columns)
            {
                for (var i = 0; i < model.columns.length; i++)
                {
                    var item = model.columns[i];

                    var value = this.handleColumnValue(row, item);
                    data["" + counter] = value;

                    if (!data["" + counter])
                    {
                        data["" + counter] = "";
                        if (i == 0)
                        {
                            data["" + counter] = id;
                        }
                    }

                    if (item.link && linkUri)
                    {
                        var val = data["" + counter];
                        data["" + counter] = "<a href='" + linkUri + "' >" + val + "</a>";
                    }

                    counter++;
                }
            }
            else
            {
                throw new Error("Missing model.columns property");
            }

            return data;
        },



        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        // CALLBACKS
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        handleCreatedRow: function(el, model, table, nRow, aData, iDataIndex) {
            this.createdRow(el, model, table, nRow, aData, iDataIndex);
        },

        handleInitComplete: function(el, model, table, oSettings, json)
        {
            // TODO: anything?
            table.fnAdjustColumnSizing();
            table.fnDraw();

            $('.dataTables_scrollBody').css('overflow','hidden');

            this.initComplete(el, model, table, oSettings, json);
        },

        handleRowCallback: function(el, model, table, nRow, aData, iDisplayIndex)
        {
            var self = this;

            // mouse over

            /*
             $(nRow).mouseover(function() {

             // clear other selected rows
             $(".row_selected").removeClass("row_selected");

             // mark ourselves selected
             $(this).addClass("row_selected");

             });
             */

            /*
             // bind the checkbox selections for this row
             $(nRow).find(".gitanaselectbox").click(function(event) {

             var targetObjectId = $(this).attr("gitanatargetobjectid");
             var item = map.get(targetObjectId);
             var chainedItem = Chain(item);

             var currentSelectedItems = self.selectedItems();

             if ($(this).attr("checked")) {
             currentSelectedItems[targetObjectId] = chainedItem;
             self.selectedItems(currentSelectedItems);
             } else {
             if (currentSelectedItems[targetObjectId]) {
             delete currentSelectedItems[targetObjectId];
             };
             self.selectedItems(currentSelectedItems);
             }

             // Enable or disable buttons
             self.onSelectedItems();
             });
             */

            // callout to extension point
            this.rowCallback(el, model, table, nRow, aData, iDisplayIndex)
        },

        handleColumnValue: function(row, item)
        {
            var value = null;

            var type = item.type;
            if (!type && item.property) {
                type = "property";
            }
            if (type == "property") {
                var property = item.property;
                if (Ratchet.isFunction(property)) {
                    property.call(self, row, function(value, index) {
                        var rowIndex = index ? "" + index : "" + counter;
                        data[rowIndex] = value;
                    });
                }
                else
                {
                    if (property.indexOf(".") > -1)
                    {
                        // dot-notation
                        var v = row;
                        var x = -1;
                        do
                        {
                            x = property.indexOf(".");
                            if (x > -1) {
                                var p1 = property.substring(0, x);
                                property = property.substring(x + 1);

                                v = v[p1];
                            }
                        } while (x > -1);

                        value = v;
                    }
                    else {
                        // simple case (property name)
                        value = row[property];
                    }
                }
            }
            else
            {
                value = this.columnValue(row, item);
            }

            return value;
        },







        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        // EXTENSION POINTS
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /**
         * EXTENSION POINT
         */
        createdRow: function(el, model, table, nRow, aData, iDataIndex)
        {
        },

        /**
         * EXTENSION POINT
         */
        initComplete: function(el, model, table, oSettings, json)
        {

        },

        /**
         * EXTENSION POINT
         */
        rowCallback: function(el, model, table, nRow, aData, iDisplayIndex)
        {

        },

        /**
         * EXTENSION POINT
         */
        linkUri: function(row)
        {
            return null;
        },

        /**
         * EXTENSION POINT
         */
        iconUri: function(row)
        {
            return null;
        },

        /**
         * EXTENSION POINT
         */
        iconClass: function(row)
        {
            return null;
        },

        /**
         * EXTENSION POINT
         */
        isReadOnly: function(row)
        {
            return false;
        },

        /**
         * EXTENSION POINT
         *
         * Determines the value to map into a column for a given row/item.
         **/
        columnValue: function(row, item)
        {
            return null;
        },








        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        // LOADERS
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /*
         * Loads the data from the server and passes it back into the callback function.
         * We expect back:
         *
         *  [["v1", "v2", "v3"], ["v1", "v2", "v3"]]
         */
        loaders: {

            "default": function(context, model, keyValues, sSource, aoData, searchTerm, query, pagination, callback) {

                var self = this;

                // the default implementation simply converts what is in our model.rows into data table
                // it does not deal with searchTerm or query

                var attrs = {
                    "iTotalRecords": 0,
                    "iTotalDisplayRecords": 0
                };

                var aaData = [];
                if (model.rows)
                {
                    for (var i = 0; i < model.rows.length; i++)
                    {
                        var rowData = [];

                        var row = model.rows[i];
                        for (var j = 0; j < row.cells.length; j++)
                        {
                            var cell = row.cells[j];

                            rowData.push(cell.value);

                            attrs.iTotalRecords++;
                            attrs.iTotalDisplayRecords++;
                        }

                        aaData.push(self.toDataTableRow(model, rowData));
                    }
                }

                callback.call(self, aaData, attrs);
            },

            "gitana": function(context, model, keyValues, sSource, aoData, searchTerm, query, pagination, callback) {

                var self = this;


                //////////////////////////////////////////////////////////////////////////////
                //
                // QUERY (for Cloud CMS)
                //
                //////////////////////////////////////////////////////////////////////////////

                /*
                 var query = {};
                 if (searchTerm)
                 {
                 // plug in a query
                 query["$or"] = [];

                 for (var i = 0; i < model.columns.length; i++)
                 {
                 var property = model.columns[i].property;
                 if (Ratchet.isFunction(property)) {
                 property = property.call();
                 }

                 var obj = {};
                 obj[property] = {"$regex": "^" + searchTerm };

                 query["$or"].push(obj);
                 }
                 }
                 */


                //////////////////////////////////////////////////////////////////////////////
                //
                // LOAD FROM SERVER
                //
                //////////////////////////////////////////////////////////////////////////////

                self.doGitanaQuery.call(self, context, model, searchTerm, query, pagination, function(resultMap) {

                    // TOTAL ROWS
                    var totalRows = -1;
                    if (resultMap.totalRows) {
                        if (_.isFunction(resultMap.totalRows)) {
                            totalRows = resultMap.totalRows();
                        } else {
                            totalRows = resultMap.totalRows;
                        }
                    }
                    delete resultMap.totalRows;
                    if (!totalRows) {
                        totalRows = 0;
                    }

                    // SIZE
                    var size = -1;
                    if (resultMap.size) {
                        if (_.isFunction(resultMap.size)) {
                            totalRows = resultMap.size();
                        } else {
                            totalRows = resultMap.size;
                        }
                    }
                    delete resultMap.size;
                    if (!size) {
                        size = 0;
                    }

                    // OFFSET?
                    var offset = -1;
                    if (resultMap.offset) {
                        if (_.isFunction(resultMap.offset)) {
                            totalRows = resultMap.offset();
                        } else {
                            totalRows = resultMap.offset;
                        }
                    }
                    delete resultMap.offset;
                    if (!offset) {
                        offset = 0;
                    }

                    var aaData = [];

                    for (var k in resultMap) {
                        if (_.has(resultMap, k) && !_.isFunction(resultMap[k])) {
                            var obj = resultMap[k];
                            obj["id"] = obj["_doc"];
                            aaData.push(self.toDataTableRow(model, obj));
                        }
                    }

                    var attrs = {
                        "iTotalRecords": totalRows,
                        "iTotalDisplayRecords": size
                    };

                    callback.call(self, aaData, attrs);
                });
            },
            "remote": function(context, model, keyValues, sSource, aoData, searchTerm, query, pagination, callback) {

                var self = this;

                /**
                 * Results should come back like:
                 *
                 *   {
                 *     "totalRows": 0,
                 *     "size": 0,
                 *     "offset": 0,
                 *     "rows": [{}, {}, {}]
                 */
                self.doRemoteQuery.call(self, context, model, searchTerm, query, pagination, function(results) {

                    var aaData = [];

                    for (var i = 0; i < results.rows.length; i++) {

                        var obj = results.rows[i];
                        aaData.push(self.toDataTableRow(model, obj));
                    }

                    var attrs = {
                        "iTotalRecords": results.totalRows,
                        "iTotalDisplayRecords": results.size
                    };

                    callback.call(self, aaData, attrs);
                });

            }
        },

        /**
         * TO BE PROVIDED BY IMPLEMENTATION CLASS IF THE GITANA LOADER IS USED
         *
         * @param context
         * @param model
         * @param query
         * @param pagination
         * @param callback
         */
        doGitanaQuery: function(context, model, searchTerm, query, pagination, callback)
        {

        },

        /**
         * TO BE PROVIDED BY IMPLEMENTATION CLASS IF THE REMOTE LOADER IS USED
         *
         * @param context
         * @param model
         * @param query
         * @param searchTerm
         * @param callback
         */
        doRemoteQuery: function(context, model, searchTerm, query, pagination, callback)
        {

        }

    }));

}));

