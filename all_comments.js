var data = null;

// populate all dropdowns
function populate_dropdown() {

    product_names = []
    for (var i in data) {
        product_names.push(data[i].product_name)
    }

    var uniqueProducts = Array.from(new Set(product_names))
    
    for (var i = 0; i < uniqueProducts.length; i++) {
        $("#select-top-all").append('<option value="' + i + '">' + uniqueProducts[i] + '</option>');
    }
}

// read data and call initiator
d3.json("alfred_data_camera_newkeywords.json", function (err, json) {
    data = JSON.parse(JSON.stringify(json))
    //console.log(data)
    populate_dropdown();
    var selectedText = "B00XHRW9TI"; //product_id_selected
    var all_comments = get_all_comments(selectedText);
    console.log(all_comments)
    draw_all_comments(all_comments)
})


// top dropdown mechanisms
$('#select-top-all').change(function () {
    var selectedText = "B00XHRW9TI"; //product_id_selected
    var all_comments = get_all_comments(selectedText);
    draw_all_comments(all_comments)
});

// draw comments 
function draw_all_comments(all_comments) {

    var myNode = document.getElementById("all_left_body_div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var selectedText = $("#select-top-all").find("option:selected").text();
    console.log(selectedText)

    for (var i in all_comments) {
        divComment = document.createElement("div")
        divComment.className = "allCommentDiv"
        divComment.id = "allCommentLeftDivId-" + i 

        var sent = "";

        if (all_comments[i].sentiment == "negative")
            sent = "\"fas fa-arrow-alt-circle-down fa-lg\"";
        else if (all_comments[i].sentiment == "positive")
            sent = "\"fas fa-arrow-alt-circle-up fa-lg\"";
        else
            sent = "\"fas fa-arrow-alt-circle-right fa-lg\"";
        if (true) {

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

            if (all_comments[i].vulgarity > 0 && all_comments[i].vulgarity <= 0.25)
                divCommentHTML += "<i class=\"fas fa-circle fa-lg\"" + "style=\"color:#8CC9CD\"" + "></i>" + "\xa0\xa0" + '</span>';
            else if (all_comments[i].vulgarity > 0.25 && all_comments[i].vulgarity <= 0.50)
                divCommentHTML += "<i class=\"fas fa-circle fa-lg\"" + "style=\"color:#5FB0C0\"" + "></i>" + "\xa0\xa0" + '</span>';
            else if (all_comments[i].vulgarity > 0.5 && all_comments[i].vulgarity <= 0.75)
                divCommentHTML += "<i class=\"fas fa-circle fa-lg\"" + "style=\"color:#3993B0\"" + "></i>" + "\xa0\xa0" + '</span>';
            else if (all_comments[i].vulgarity > 0.75 && all_comments[i].vulgarity <= 1.0)
                divCommentHTML += "<i class=\"fas fa-circle fa-lg\"" + "style=\"color:#32759B\"" + "></i>" + "\xa0\xa0" + '</span>';

            divCommentHTML += '<span class="star_icon" id="span_id_star_' + divComment.id + '" >';

            for (var j = 0; j < all_comments[i].star_rating; j++) {
                divCommentHTML += "<i class=\"fas fa-star fa-lg\"" + "style=\"color:#FFC107\"" + "></i>" + "\xa0\xa0" + '</span>';
            }

            for (var j = 0; j < 5 - all_comments[i].star_rating; j++) {
                divCommentHTML += "<i class=\"far fa-star fa-lg\"" + "></i>" + "\xa0\xa0" + '</span>';
            }

            divCommentHTML += '</span></div>' + "\xa0\xa0" +
                '<div style="float:left; padding-left: 5px"><p class="search_enable">' + all_comments[i].review_body + "\xa0" +
                "</p></div>";

            divComment.innerHTML = divCommentHTML;
            var element = document.getElementById("all_left_body_div");
            element.appendChild(divComment);
        }
    }
}

// get comments based on dropdown filter
function get_all_comments(selectedText) {
    var all_comments = []
    for (var i in data) {
        if (data[i].product_id == selectedText) {
            console.log("here")
            all_comments.push(data[i])
        }
    }
    return all_comments;
}
