this.ckan.module('daterangepicker-module', function($, _) {
    return {
        initialize: function() {

            // Add hidden <input> tags #ext_startdate and #ext_enddate,
            // if they don't already exist.
            //var form = $("#dataset-search");
            var form2 = $("<form></form>");
            form2.id = "dataset-search2";
            if ($("#ext_startdate").length === 0) {
                //$('<input type="hidden" id="ext_startdate" name="ext_startdate" />').appendTo(form);
                $('<input type="hidden" id="ext_startdate" name="ext_startdate" />').appendTo(form2);
            }
            if ($("#ext_enddate").length === 0) {
                //$('<input type="hidden" id="ext_enddate" name="ext_enddate" />').appendTo(form);
                $('<input type="hidden" id="ext_enddate" name="ext_enddate" />').appendTo(form2);
            }
            $("body").append(form2);

            // Add a date-range picker widget to the <input> with id #daterange
            $('input[id="daterange"]').daterangepicker({
                    ranges: {
                        //'Heute': [moment().startOf('day'), moment().endOf('day')],
                        //'Gestern': [moment().subtract('days', 1), moment().subtract('days', 1)],
                        //'Diese Woche': [moment().startOf('week'), moment().endOf('week')],
                        //'Die letzten 7 Tage': [moment().subtract('days', 6), moment()],
                        //'Dieser Monat': [moment().startOf('month'), moment().endOf('month')],
                        //'Die letzten 30 Tage': [moment().subtract('days', 29), moment()],
                        //'Letzter Monat': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                    },
                    //startDate: moment().subtract('days', 29),
                    //endDate: moment(),
                    showDropdowns: true,
                    timePicker: true
                },
                function(start, end) {

                    // Bootstrap-daterangepicker calls this function after the user
                    // picks a start and end date.

                    // Format the start and end dates into strings in a date format
                    // that Solr understands.
                    start = start.format('YYYY-MM-DDTHH:mm:ss') + 'Z';
                    end = end.format('YYYY-MM-DDTHH:mm:ss') + 'Z';

                    // Set the value of the hidden <input id="ext_startdate"> to
                    // the chosen start date.
                    $('#ext_startdate').val(start);

                    // Set the value of the hidden <input id="ext_enddate"> to
                    // the chosen end date.
                    $('#ext_enddate').val(end);
                    // Submit the <form id="dataset-search">.
                    form2.submit();
                });
            var url_str = window.location.href;
            console.log(url_str)
            if (url_str.includes("catalog.gis.lrg.tum.de/dataset?ext_startdate=")) {
                try {
                    var start_t = url_str.split("ext_startdate=")[1].split("T00")[0];
                    var end_t = url_str.split("ext_enddate=")[1].split("T00")[0];
                    start_t = start_t.split("-");
                    end_t = end_t.split("-");
                    var date_field = document.getElementById("daterange");
                    date_field.value = start_t[2] + "/" + start_t[1] + "/" + start_t[0] + " - " + end_t[2] + "/" + end_t[1] + "/" + end_t[0];
                } catch (e) {}
            }
        }
    }
});