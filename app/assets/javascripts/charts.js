// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

////////////////// Venga DataSource

var basicGuestStatsDataSource = null;

function dataSource() {
    var self = this;
    self.basicGuestStatsDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: base_url + "/guests/basic_guest_stats.jsonp",
                dataType: "jsonp",
                type: 'GET'
            },
            parameterMap: function (data, type) {
                if (type === "read") {
                    return {
                        venue_id: self.venue.value(),
                        period_days: 7,
                        api_key: $("meta[name='venga_api_key']").attr("content")
                    };
                }
            }
        },
         sort: {
            field: "year",
            dir: "desc"
        },
    });
}

function createChart() {
    $("#chart").kendoChart({
        dataSource: self.basicGuestStatsDataSource,
        legend: {
           visible: false
        },
        title: {
            text: "Spain windpower electricity production (GWh)"
        },
        seriesDefaults: {
            type: "funnel",
            dynamicSlope: true,
            dynamicHeight: false,
            labels: {
                visible: true,
                template: "#= dataItem.year #"
            }
        },
        series: [{
            field: "wind",
            categoryField: "year",
            segmentSpacing: 2
        }],
        tooltip: {
            visible: true,
            template: "#= category # - #= value # GWh"
        }
    });
}

$(document).ready(createChart);
$(document).bind("kendo:skinChange", createChart);