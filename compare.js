var selectedText = "";
var data = null;

// populate all dropdowns
function populate_dropdown() {
    //criteria = get_comparison_criteria(data);
    criteria = ["A", "B", "C", "D", "E",];
    for (var i = 0; i < criteria.length; i++) {
        $("#select-top").append('<option value="' + i + '">' + criteria[i] + '</option>');
    }

    product_names = []
    for (var i in data) {
        product_names.push(data[i].product_name)
    }

    var uniqueProducts = Array.from(new Set(product_names))

    for (var i in uniqueProducts) {
        $("#select-left").append('<option value="' + i + '">' + uniqueProducts[i] + '</option>');
        $("#select-right").append('<option value="' + i + '">' + uniqueProducts[i] + '</option>');
    }
}


// read data and call initiator
d3.json("alfred_data_camera.json", function (err, json) {
    data = JSON.parse(JSON.stringify(json))
    console.log(data)
    populate_dropdown();
})

$('#select-left').change(function () {
    selectedText = $(this).find("option:selected").text();
    var compare_comments = get_comments();
    draw_comments("left", compare_comments)
});

$('#select-right').change(function () {
    selectedText = $(this).find("option:selected").text();
    var compare_comments = get_comments();
    draw_comments("right", compare_comments)
});

function draw_comments(dropbar, compare_comments) {

    for (var i in compare_comments) {
        divComment = document.createElement("div")
        divComment.className = "compareCommentDiv"
        divComment.id = dropbar == "left" ?  "compareCommentLeftDivId-" + i : "compareCommentRightDivId-" + i
        
        var divCommentHTML =

            "<div class=\"comment-body\"" + "\">" +
            '<div style="float: left;padding-left: 2px;"><span class="sentiment_icon" id="span_id_senti_' + divComment.id + '">' +
            "<i class=" + "></i>" + compare_comments[i].sentiment + '</span>' +
            '<span class="vulgarity_icon" id="span_id_vul_' + divComment.id + '" >' +
            "<i class=" + "></i>" + compare_comments[i].sentiment + '</span>' +
            '<span class="star_icon" id="span_id_star_' + divComment.id + '" >' +
            "<i class=" + "></i>" + compare_comments[i].star_rating + '</span>' +
            //"<i class=" + "\"fas fa-plus-circle fa-lg\"" + "></i>" +
            '</span></div>' + "\xa0\xa0" +
            '<div style="float:left; padding-left: 5px"><p class="search_enable">' + compare_comments[i].review_body + "\xa0" +
            "</p></div>";

        divComment.innerHTML = divCommentHTML;
        var element = dropbar == "left" ? document.getElementById("compare_left_body_div") : document.getElementById("compare_right_body_div");
        element.appendChild(divComment);
    }
}

function get_comments() {
    var compare_comments = []
    for (var i in data) {
        if (data[i].product_name == selectedText) {
            console.log("here")
            compare_comments.push(data[i])
        }
    }
    return compare_comments;
}
