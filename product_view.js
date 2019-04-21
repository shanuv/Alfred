var data_main = null;
product_select = null;


function find_product_id(product_name){
    for(var i in data_main){
        console.log(data_main[i]);
        if(data_main[i].product_name !== null && data_main[i].product_name.localeCompare(product_name) === 0){
            product_id_selected = data_main[i].product_id
            console.log(product_id_selected);
            break;
        }
    }

    //make bar graph again
    make_bar(product_id_selected);
}

// make cards
function populate_product_cards() {
    var myNode = document.getElementById("product_left_body_div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    product_names = []
    for (var i in data_main) {
        product_names.push(data_main[i].product_name)
    }

    var uniqueProducts = Array.from(new Set(product_names))

    for (var i in uniqueProducts) {
        var divCard = document.createElement("div")
        divCard.className = "cardDiv"
        divCard.id = "cardDiv_" + i

        var divCardHTML =

            "<div class=\"card-body\"" + "\">" +
            '<div class="product_card" style="float: left;margin-bottom: 15px; padding-left:2px"><span id="card_id_' + i + '">' +
            "<i class=" + "card-text" + "></i>" + uniqueProducts[i] + '</span>' + "</div>";

        divCard.innerHTML = divCardHTML;
        var element = document.getElementById("product_left_body_div");
        //console.log(card_clicked);

        //var pc = document.getElementById("product_left_body_div");

        divCard.onclick = function(){
            var card_clicked = null;
            card_clicked = document.getElementById(this.id);
            console.log(card_clicked.textContent);
            product_select = card_clicked.textContent;
            find_product_id(product_select);
            //card_clicked = null;
        }
        element.appendChild(divCard);
    }
}

//make star ratings

function populate_stars(product_name) {
    var rating = 0;
    var count = 0;
    for (var i in data_main) {
        if (data_main[i].product_name == product_name) {
            rating += data_main[i].star_rating
            count += 1
        }
    }

    rating = Math.round(rating / count)

    var myNode = document.getElementById("star_body");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var divStarHTML =

        "<div class=\"star-body\"" + "\">";

    for (var i = 0; i < rating; i++) {
        divStarHTML += '<span class="star_agg_icon" id="span_id_star_agg_' + i + '" >';
        divStarHTML += "<i class=\"fas fa-star fa-3x\"" + "style=\"color:#FFC107\"" + "></i>" + "\xa0\xa0" + '</span>';
    }

    for (var j = 0; j < 5 - rating; j++) {
        divStarHTML += '<span class="star_agg_icon" id="span_id_star_agg_' + i + '" >';
        divStarHTML += "<i class=\"far fa-star fa-3x\"" + "></i>" + "\xa0\xa0" + '</span>';
    }

    myNode.innerHTML = divStarHTML;
}

// read data and call initiator
d3.json("alfred_data_camera.json", function (err, json) {
    data_main = JSON.parse(JSON.stringify(json))
    //  console.log(data)
    populate_product_cards();
    product_name = "(3 Pack of Polaroid 300 Film PIF-300) 30 Prints"
    populate_stars(product_name);
})
