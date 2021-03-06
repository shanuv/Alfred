var data_main = null;
product_select = null;


function find_product_id(product_name){
    for(var i in data_main){
        //console.log(data_main[i]);
        if(data_main[i].product_name !== null && data_main[i].product_name.localeCompare(product_name) === 0){
            product_id_selected = data_main[i].product_id
            localStorage.setItem("ps", product_id_selected); 

            p_selected = localStorage.getItem("ps");

            console.log("prod from product view: "+p_selected);
            console.log(product_id_selected);
            break;
        }
    }

    //make bar graph again
    make_bar(product_id_selected);

    make_pie(product_id_selected);
}

function show_names(product_name){
    var arr = product_name.split(" ");
    var s = ""
    for(var i in arr){
        s += arr[i]
        s += " "

        if(i > 5) break;
    }

    var name = document.getElementById("product_right_dd_div");
    var newHTML = "<h9s><span>"+s+" " + "</span></h9>";
    name.innerHTML = newHTML;
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
            document.getElementById("product_comment_body_div").innerHTML = "";
            document.getElementById("product_comment_dd_div").innerHTML = "";
            var card_clicked = null;
            card_clicked = document.getElementById(this.id);
            console.log(card_clicked.textContent);
            product_select = card_clicked.textContent;
            find_product_id(product_select);
            //card_clicked = null;

            //fill stars
            populate_stars(product_id_selected);
            show_names(product_select);
        }
        element.appendChild(divCard);
    }
}

//make star ratings

function populate_stars(prod_id) {
    var rating = 0;
    var count = 0;
    var cstars = 0;
    for (var i in data_main) {
        if (data_main[i].product_id == prod_id) {
            rating += data_main[i].star_rating
            count += 1
        }
    }

    rating = Math.round(rating / count)

    for (var i in data_main) {
        if (data_main[i].product_id == prod_id) {
            if(data_main[i].star_rating == rating){
                cstars += 1;
            }
        }
    }

    var myNode = document.getElementById("star_body");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var divStarHTML =

        "<div class=\"star-body\"" + "\">";

    for (var i = 0; i < rating; i++) {
        x = i + 1
        divStarHTML += '<span class="star_agg_icon" id="span_id_star_agg_' + i + '" >';
        divStarHTML += "<i class=\"fas fa-star fa-3x\"" + "style=\"color:#FFC107\"" + "data-toggle=\"tooltip\"" + "title=" + x + "></i>" + "\xa0\xa0" + '</span>';
    }

    for (var j = 0; j < 5 - rating; j++) {
        x = i + 1
        divStarHTML += '<span class="star_agg_icon" id="span_id_star_agg_' + i + '" >';
        divStarHTML += "<i class=\"far fa-star fa-3x\"" + "data-toggle=\"tooltip\"" + "title=" + x + "></i>" + "\xa0\xa0" + '</span>';
    }

    myNode.innerHTML = divStarHTML;

    //on clicking the stars
    myNode.onclick = function(){
            console.log("star ratings clicked");
            populate_comments_star(rating,prod_id);
            which_comments(rating,cstars);
        }
}

// read data and call initiator
d3.json("alfred_data_camera.json", function (err, json) {
    data_main = JSON.parse(JSON.stringify(json))
    //  console.log(data)
    populate_product_cards();
    product_name = "(3 Pack of Polaroid 300 Film PIF-300) 30 Prints"
    populate_stars(product_id_selected);
})
