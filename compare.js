var data = null;

// populate all dropdowns
function populate_dropdown() {
    criteria = get_comparison_criteria(data);
    //criteria = ["A", "B", "C", "D", "E",];
    for (var i = 0; i < criteria.length; i++) {
        $("#select-top").append('<option value="' + i + '">' + criteria[i] + '</option>');
    }
    $("#select-top").append('<option value="' + i + '">' + "All" + '</option>');

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


// top dropdown mechanisms
$('#select-top').change(function () {
    var selectedText = $("#select-left").find("option:selected").text();
    var compare_comments = get_comments(selectedText);
    draw_comments("left", compare_comments)

    var selectedText = $("#select-right").find("option:selected").text();
    var compare_comments = get_comments(selectedText);
    draw_comments("right", compare_comments)
});

// left dropdown mechanisms
$('#select-left').change(function () {
    var selectedText = $(this).find("option:selected").text();
    var compare_comments = get_comments(selectedText);
    draw_comments("left", compare_comments)
});

// right dropdown mechanisms
$('#select-right').change(function () {
    var selectedText = $(this).find("option:selected").text();
    var compare_comments = get_comments(selectedText);
    draw_comments("right", compare_comments)
});

// draw comments 
function draw_comments(dropbar, compare_comments) {

    var myNode = dropbar == "left" ? document.getElementById("compare_left_body_div") : document.getElementById("compare_right_body_div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var selectedText = $("#select-top").find("option:selected").text();

    for (var i in compare_comments) {
        divComment = document.createElement("div")
        divComment.className = "compareCommentDiv"
        divComment.id = dropbar == "left" ? "compareCommentLeftDivId-" + i : "compareCommentRightDivId-" + i

        var sent = "";

        if (compare_comments[i].sentiment == "negative")
            sent = "\"fas fa-arrow-down\"";
        else if (compare_comments[i].sentiment == "positive")
            sent = "\"fas fa-arrow-up\"";
        else
            sent = "\"fas fa-arrow-right\"";
        if (selectedText == "" || selectedText == "All" || compare_comments[i].keywords.includes(selectedText)) {

            // var divCommentHTML =

            //     "<div class=\"comment-body\"" + "\">" +
            //     '<div style="float: left;padding-left: 2px;"><span class="sentiment_icon" id="span_id_senti_' + divComment.id + '">' +
            //     "<i class=" + sent + "></i>" + "\xa0\xa0" + '</span>' +
            //     '<span class="vulgarity_icon" id="span_id_vul_' + divComment.id + '" >' +
            //     "<i class=" + "></i>" + compare_comments[i].vulgarity + "\xa0\xa0" + '</span>' +
            //     '<span class="star_icon" id="span_id_star_' + divComment.id + '" >' +
            //     "<i class=" + "></i>" + compare_comments[i].star_rating + "\xa0\xa0" + '</span>' +
            //     '</span></div>' + "\xa0\xa0" +
            //     '<div style="float:left; padding-left: 5px"><p class="search_enable">' + compare_comments[i].review_body + "\xa0" +
            //     "</p></div>"; 

                var divCommentHTML =

                "<div class=\"comment-body\"" + "\">" +
                '<div style="float: left;padding-left: 2px;"><span class="sentiment_icon" id="span_id_senti_' + divComment.id + '">' +
                "<i class=" + sent + "></i>" + "\xa0\xa0" + '</span>' +
                '<span class="vulgarity_icon" id="span_id_vul_' + divComment.id + '" >' +
                "<i class=" + "></i>" + compare_comments[i].vulgarity + "\xa0\xa0" + '</span>' +
                '<span class="star_icon" id="span_id_star_' + divComment.id + '" >'; 

                for(var j = 0; j < compare_comments[i].star_rating; j++){
                    divCommentHTML += "<i class=\"fas fa-star\"" + "style=\"color:#FFC107\"" + "></i>" + "\xa0\xa0" + '</span>'; 
                }

                for(var j = 0; j < 5 - compare_comments[i].star_rating; j++){
                    divCommentHTML += "<i class=\"far fa-star\"" + "></i>" + "\xa0\xa0" + '</span>'; 
                }
                
                //"<i class=" + "\"fas fa-plus-circle fa-lg\"" + "></i>" +
                divCommentHTML += '</span></div>' + "\xa0\xa0" +
                '<div style="float:left; padding-left: 5px"><p class="search_enable">' + compare_comments[i].review_body + "\xa0" +
                "</p></div>"; 

            divComment.innerHTML = divCommentHTML;
            var element = dropbar == "left" ? document.getElementById("compare_left_body_div") : document.getElementById("compare_right_body_div");
            element.appendChild(divComment);
        }
    }
}

// get comments based on dropdown filter
function get_comments(selectedText) {
    var compare_comments = []
    for (var i in data) {
        if (data[i].product_name == selectedText) {
            console.log("here")
            compare_comments.push(data[i])
        }
    }
    return compare_comments;
}

// get criteria for comparisons
function get_comparison_criteria() {
    all_keywords = []
    for (var i in data) {
        for (var j in data[i].keywords) {
            all_keywords.push(data[i].keywords[j])
        }
    }

    return (getFrequency(all_keywords, 5));
}

function getFrequency(all_keywords, cutOff) {
    var frequencies = {}
    for (i = 0; i < all_keywords.length; i++) {
        keyword = all_keywords[i];
        frequencies[keyword] = frequencies[keyword] || 0;
        frequencies[keyword]++;
    }

    var keywords = Object.keys(frequencies);
    x = keywords.sort(function (a, b) { return frequencies[b] - frequencies[a]; }).slice(0, cutOff).toString();
    return x.split(",")
}