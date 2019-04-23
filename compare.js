var data = null;

// populate all dropdowns
function populate_dropdown() {
    criteria = get_comparison_criteria(data);
    //criteria = ["A", "B", "C", "D", "E",];
    for (var i = 0; i < criteria.length; i++) {

        criteria[i] = criteria[i].charAt(0).toUpperCase() + criteria[i].slice(1);

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
d3.json("alfred_data_camera_newkeywords.json", function (err, json) {
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

    var selectedText = $("#select-top").find("option:selected").text().toLowerCase();
    console.log("this one", selectedText)

    for (var i in compare_comments) {
        divComment = document.createElement("div")
        divComment.className = "compareCommentDiv"
        divComment.id = dropbar == "left" ? "compareCommentLeftDivId-" + i : "compareCommentRightDivId-" + i

        var sent = "";

        if (compare_comments[i].sentiment == "negative")
            sent = "\"fas fa-arrow-alt-circle-down fa-lg\"";
        else if (compare_comments[i].sentiment == "positive")
            sent = "\"fas fa-arrow-alt-circle-up fa-lg\"";
        else
            sent = "\"fas fa-arrow-alt-circle-right fa-lg\"";
        if (selectedText == "" || selectedText == "all" || compare_comments[i].keywords.includes(selectedText)) {

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
                '<span class="vulgarity_icon" id="span_id_vul_' + divComment.id + '" >';

            if (compare_comments[i].vulgarity > 0 && compare_comments[i].vulgarity <= 0.25)
                divCommentHTML += "<i class=\"fas fa-circle fa-lg\"" + "style=\"color:#8CC9CD\"" + "></i>" + "\xa0\xa0" + '</span>';
            else if (compare_comments[i].vulgarity > 0.25 && compare_comments[i].vulgarity <= 0.50)
                divCommentHTML += "<i class=\"fas fa-circle fa-lg\"" + "style=\"color:#5FB0C0\"" + "></i>" + "\xa0\xa0" + '</span>';
            else if (compare_comments[i].vulgarity > 0.5 && compare_comments[i].vulgarity <= 0.75)
                divCommentHTML += "<i class=\"fas fa-circle fa-lg\"" + "style=\"color:#3993B0\"" + "></i>" + "\xa0\xa0" + '</span>';
            else if (compare_comments[i].vulgarity > 0.75 && compare_comments[i].vulgarity <= 1.0)
                divCommentHTML += "<i class=\"fas fa-circle fa-lg\"" + "style=\"color:#32759B\"" + "></i>" + "\xa0\xa0" + '</span>';

            divCommentHTML += '<span class="star_icon" id="span_id_star_' + divComment.id + '" >';

            for (var j = 0; j < compare_comments[i].star_rating; j++) {
                divCommentHTML += "<i class=\"fas fa-star fa-lg\"" + "style=\"color:#FFC107\"" + "></i>" + "\xa0\xa0" + '</span>';
            }

            for (var j = 0; j < 5 - compare_comments[i].star_rating; j++) {
                divCommentHTML += "<i class=\"far fa-star fa-lg\"" + "></i>" + "\xa0\xa0" + '</span>';
            }

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