<!doctype html>
<html lang="en">
  <head>
    <title>Laravel 7 - Yajra Datatable Implementation</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
    <link rel="stylesheet" type="text/css" href="<?php echo e(asset('/css')); ?>/bootstrap.min.css">
    <link href="<?php echo e(asset('/css')); ?>/dataTables.bootstrap4.min.css" rel="stylesheet">

  </head>
  <body>

    <div class="container mt-5">
        <h3 class="text-center font-weight-bold">Yajra Datatable Server Side in Laravel 7 </h3>
        <br />
        <div class="row input-daterange">
            <div class="col-md-4">
                <input type="text" name="from_date" id="from_date" class="form-control" placeholder="From Date" readonly />
            </div>
            <div class="col-md-4">
                <input type="text" name="to_date" id="to_date" class="form-control" placeholder="To Date" readonly />
            </div>
            <div class="col-md-4">
                <button type="button" name="filter" id="filter" class="btn btn-primary">Filter</button>
                <button type="button" name="refresh" id="refresh" class="btn btn-default">Refresh</button>
            </div>
        </div>
        <br />
        <table class="table mt-4" id="usersTable">
            <thead>
                <th> #ID  </th>
                <th> Name </th>
                <th> Email </th>
                <th>Created at</th>
                <th> Action </th>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>

<!-- <script>
window.onload = function() {
 
  let scriptSrc=[
  "<?php echo e(asset('/js')); ?>/jquery-3.5.1.min.js",
  "<?php echo e(asset('/js')); ?>/jquery.dataTables.min.js",
  "<?php echo e(asset('/js')); ?>/dataTables.bootstrap4.min.js",
  "<?php echo e(asset('/js')); ?>/user-dataTables.js"
  ];
  console.log(scriptSrc);
  for(let val of scriptSrc) {
       /* iterate through array or object */
       const element = document.createElement("script");
       element.src =  val;
       document.body.appendChild(element);
  }
  
};
</script>
  -->

    <script src="<?php echo e(asset('/js')); ?>/jquery-3.5.1.min.js"></script>  
    <script src="<?php echo e(asset('/js')); ?>/jquery.dataTables.min.js"></script>
    <script src="<?php echo e(asset('/js')); ?>/dataTables.bootstrap4.min.js"></script>
    <!-- <script src="<?php echo e(asset('/js')); ?>/userDataTables.js"></script> -->
    <script type="text/javascript">
        $(document).ready(function() {
            var table = $('#usersTable').DataTable({
                searching: true,               
                ordering: true,
                paging: true,
                info: true,                 
                lengthMenu: [
                    [10, 25, 50, -1],
                    [10, 25, 50, 'All'],
                ],
                orderClasses: false,                                
                processing: true,
                serverSide: true,
                ajax: "<?php echo e(route('users.index')); ?>",
                deferRender: true,
                columns: [
                    {data: 'id', name: 'id'},
                    {data: 'name', name: 'name'},
                    {data: 'email', name: 'email'},
                    {
                        data: 'created_at',
                        name: 'created_at',
                        render:function(data) {
                            return data;
                        }
                    },
                    {data: 'action', name: 'action', orderable: false, searchable: false},
                ]
            });
        });
    </script>
</body>
</html><?php /**PATH /opt/lampp/htdocs/yogesh/local/demo project/example-app/resources/views/users/index.blade.php ENDPATH**/ ?>