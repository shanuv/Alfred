var selectedText = "";
var data = null;

//populate dropdown

var newitemnum = 3;
var newitemdesc = "potato";
$("#select-top").append('<option value="'+newitemnum+'">'+newitemdesc+'</option>');



d3.json("alfred_data_camera.json", function (err, json) {
    data = JSON.parse(JSON.stringify(json))
    console.log(data)
})

$('#select-top').change(function () {
    selectedText = $(this).find("option:selected").text();
    var compare_comments = get_comments();
    console.log(compare_comments)
});



function get_comments(){
    var compare_comments = []
    for (var i in data){
        if(data.product_name == selectedText){
            compare_comments.push(i)
        }
    }
}
