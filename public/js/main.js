(function () {
    var colors = [["#F7464A", "#FF5A5E"],["#46BFBD", "#5AD3D1"], ['#FDB45C','#FFC870'],['#949FB1','#A8B3C5'],['#4D5360','#616774']];
    var pieData = [];

    var ctx = document.getElementById("chart-area").getContext("2d");

    $(function (){
        var table = $('#example').DataTable({
            columnDefs: [
                {
                    // The `data` parameter refers to the data for the cell (defined by the
                    // `data` option, which defaults to the column being worked with, in
                    // this case `data: 0`.
                    render: function ( data, type, row ) {
                        return '<input type="text" value="' + data + '">';
                    },
                    "targets": 7
                }
            ],
            ajax: '/data.json'
        });
        // keep cells up todate with changes
        $('#example').on('blur', 'input', function () {
            var cell = table.cell(this.parentElement);

            var pg = table.page();
            cell.data(this.value);
            return true;
        });

        $('#update').click( function() {
            pieData = [];
            var types = {};

            _.each(table.data(), function (row) {
                if (row[3] < 0)
                    types[row[7]] = !!types[row[7]] ? types[row[7]] + -1*row[3] : -1*row[3];
            });

            /*for (var i = 0; i < window.myPie.segments.length; i++) {
                window.myPie.removeData(i);
            }*/
            _.each(types, function (v, type) {
               pieData.push({
                   value: v,
                   color: colors[pieData.length][0],
                   highlight: colors[pieData.length][1],
                   label: type
               });
               /* window.myPie.addData({
                    value: v,
                    color: colors[pieData.length][0],
                    highlight: colors[pieData.length][1],
                    label: type
                });*/
            });

            if (window.myPie) window.myPie.destroy();
            window.myPie = new Chart(ctx).Pie(pieData);
            window.myPie.update();
            ctx.canvas.width = 300;
            ctx.canvas.height = 300;

            return false;
        } );

    });
})();
