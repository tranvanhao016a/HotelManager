
function deleteRow(r) {
 var i = r.parentNode.parentNode.rowIndex;
 document.getElementById("myTable").deleteRow(i);
}
function myFunction() {
jQuery(function () {
 jQuery(".trash").click(function () {
   swal({
     title: "Cảnh báo",

     text: "Bạn có chắc chắn là muốn xóa nhân viên này?",
     buttons: ["Hủy bỏ", "Đồng ý"],
   })
     .then((willDelete) => {
       if (willDelete) {
         swal("Đã xóa thành công.!", {

         });
       }
     });
 });
});
}
// oTable = $('#sampleTable').dataTable();
function checkbox() {
$('#all').click(function (e) {
 $('#sampleTable tbody :checkbox').prop('checked', $(this).is(':checked'));
 e.stopImmediatePropagation();
});

}

$("#show-emp").on("click", function () {
$("#ModalUP").modal({ backdrop: false, keyboard: false })
});

    function myFunction() {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
            x.type = "text"
        } else {
            x.type = "password";
        }
    }
    function mypass(){
    $(".click-eye").click(function () {
      $(this).toggleClass("bx-show bx-hide");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
          input.attr("type", "text");
      } else {
          input.attr("type", "password");
      }
  });
}



function readURL(input, thumbimage) {
  if (input.files && input.files[0]) { //Sử dụng  cho Firefox - chrome
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#thumbimage").attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
  else { // Sử dụng cho IE
    $("#thumbimage").attr('src', input.value);

  }
  $("#thumbimage").show();
  $('.filename').text($("#uploadfile").val());
  $('.Choicefile').css('background', '#14142B');
  $('.Choicefile').css('cursor', 'default');
  $(".removeimg").show();
  $(".Choicefile").unbind('click');
}

function anh(){
$(document).ready(function () {
  $(".Choicefile").bind('click', function () {
    $("#uploadfile").click();

  });
  $(".removeimg").click(function () {
    $("#thumbimage").attr('src', '').hide();
    // $("#myfileupload").html('<input type="file" id="uploadfile"  onchange="readURL(this);" />');
    $(".removeimg").hide();
    $(".Choicefile").bind('click', function () {
      $("#uploadfile").click();
    });
    $('.Choicefile').css('background', '#14142B');
    $('.Choicefile').css('cursor', 'pointer');
    $(".filename").text("");
  });
})
}
var data = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  datasets: [{
    label: "Dữ liệu đầu tiên",
    fillColor: "rgba(255, 213, 59, 0.767), 212, 59)",
    strokeColor: "rgb(255, 212, 59)",
    pointColor: "rgb(255, 212, 59)",
    pointStrokeColor: "rgb(255, 212, 59)",
    pointHighlightFill: "rgb(255, 212, 59)",
    pointHighlightStroke: "rgb(255, 212, 59)",
    data: [20, 59, 90, 51, 56, 100]
  },
  {
    label: "Dữ liệu kế tiếp",
    fillColor: "rgba(9, 109, 239, 0.651)  ",
    pointColor: "rgb(9, 109, 239)",
    strokeColor: "rgb(9, 109, 239)",
    pointStrokeColor: "rgb(9, 109, 239)",
    pointHighlightFill: "rgb(9, 109, 239)",
    pointHighlightStroke: "rgb(9, 109, 239)",
    data: [48, 48, 49, 39, 86, 10]
  }
  ]
}
function lineChartDemo(){
  // var ctxl = document.getElementById("#lineChartDemo").get(0).getContext("2d");
  // var lineChart = new Chart(ctxl).Line(this.data);

}
function barChartDemo(){
var ctxb = $("#barChartDemo").get(0).getContext("2d");
var barChart = new Chart(ctxb).Bar(this.data);
}
