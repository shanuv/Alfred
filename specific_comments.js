var data_comments = null;
// var card_clicked = null
// make cards
function populate_comments() {
    var myNode = document.getElementById("product_comment_body_div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    reviews = []
    for (var i in data_comments) {
        reviews.push(data_comments[i].review_body)
    }

    var uniqueProducts = Array.from(new Set(reviews))

    for (var i in uniqueProducts) {
        var divComCard = document.createElement("div")
        divComCard.className = "comcardDiv"
        divComCard.id = "comcardDiv_" + i

        var divComCardHTML =

            "<div class=\"card-body\"" + "\">" +
            '<div class="comment_card" style="float: left;margin-bottom: 15px; padding-left:2px"><span id="card_id_' + i + '">' +
            "<input type=\"checkbox\"" + "\">" +
            "<i class=" + "card-text" + "></i>" + "\xa0\xa0" + uniqueProducts[i] + 
            '</span>' + "</div>";

        //checkbox
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");

        // //append the checkbox
        // var dc = document.getElementById("comcardDiv_"+i);
        // console.log(dc);
        // dc.appendChild(x);  

        divComCard.innerHTML = divComCardHTML;

        var element = document.getElementById("product_comment_body_div");
        element.appendChild(divComCard);

        // var dc = document.getElementById("card_id_" + i);
        // console.log(dc);
        // dc.appendChild(x);  
    }
}

function populate_comments_pie(str) {
    var myNode = document.getElementById("product_comment_body_div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    console.log("in comments pie");
    console.log(str);

    reviews = []
    for (var i in data_comments) {
        if(str === data_comments[i].sentiment){
            console.log(data_comments[i].sentiment);
            reviews.push(data_comments[i].review_body);
        }
        
    }

    var uniqueProducts = Array.from(new Set(reviews))

    for (var i in uniqueProducts) {
        var divCard = document.createElement("div")
        divCard.className = "cardDiv"
        divCard.id = "cardDiv_" + i

        var divCardHTML =

            "<div class=\"card-body\"" + "\">" +
            '<div class="comment_card" style="float: left;margin-bottom: 15px; padding-left:2px"><span id="card_id_' + i + '">' +
            "<i class=" + "card-text" + "></i>" + uniqueProducts[i] + '</span>' + "</div>";

        divCard.innerHTML = divCardHTML;
        var element = document.getElementById("product_comment_body_div");
        element.appendChild(divCard);
    }
}

function populate_comments_bar(str) {
    var myNode = document.getElementById("product_comment_body_div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var arr = str.split("-");
    reviews = []
    for (var i in data_comments) {

        var percent_vulgar = data_comments[i].vulgarity;

        if(percent_vulgar >= arr[0] && percent_vulgar <= arr[1]){
            console.log(data_comments[i].vulgarity);
            reviews.push(data_comments[i].review_body);
        }
        
    }

    var uniqueProducts = Array.from(new Set(reviews))

    for (var i in uniqueProducts) {
        var divCard = document.createElement("div")
        divCard.className = "cardDiv"
        divCard.id = "cardDiv_" + i

        var divCardHTML =

            "<div class=\"card-body\"" + "\">" +
            '<div class="comment_card" style="float: left;margin-bottom: 15px; padding-left:2px"><span id="card_id_' + i + '">' +
            "<i class=" + "card-text" + "></i>" + uniqueProducts[i] + '</span>' + "</div>";

        divCard.innerHTML = divCardHTML;
        var element = document.getElementById("product_comment_body_div");
        element.appendChild(divCard);
    }
}

// read data_comments and call initiator
d3.json("alfred_data_camera.json", function (err, json) {
    data_comments = JSON.parse(JSON.stringify(json))
    populate_comments();
    //product_name = "(3 Pack of Polaroid 300 Film PIF-300) 30 Prints"
})