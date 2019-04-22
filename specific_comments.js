var data_comments = null;
// var card_clicked = null
// make cards

function which_comments(str,count){

    var all_div = document.getElementById("product_comment_dd_div");
    var newHTML;

    //if pie
    if(str == "positive" || str == "negative" || str == "neutral"){
        console.log("inside which comments");

        if(str == "positive"){
            newHTML = "<h2><span>"+count+" "+"<span style='color:#54a24b'>" + str +"</span>"+ " reviews" + "</span></h2>";
        }

        else if(str == "negative"){
            newHTML = "<h2><span>"+count+" "+"<span style='color:#e45756'>" + str +"</span>"+ " reviews" + "</span></h2>";
        }

        else{
            newHTML = "<h2><span>"+count+" "+"<span style='color:#eeca3b'>" + str +"</span>"+ " reviews" + "</span></h2>";
        }
        
    }

    else if(str == "0-25" || str == "25-50" || str == "50-75" || str == "75-100"){
        newHTML = "Product reviews with "+str+" % vulgarity";


        if(str == "0-25"){
            newHTML = "<h3><span>"+count+" " +"reviews with "+"<span style='color:#8cc9cd'>" + str +"%</span>"+" vulgarity"+ "</span></h3>";
        }
        else if(str == "25-50"){
            newHTML = "<h3><span>"+count+" " +"reviews with "+"<span style='color:#5fb0c0'>"+ str +"%</span>"+" vulgarity"+ "</span></h3>";
        }
        else if(str == "50-75"){
            newHTML = "<h3><span>"+count+" " +"reviews with "+"<span style='color:#3993b0'>"+ str +"%</span>"+" vulgarity"+ "</span></h3>";
        }
        else if(str == "75-100"){
            newHTML = "<h3><span>"+count+" " +"reviews with "+"<span style='color:#32759b'>"+ str +"%</span>"+" vulgarity"+ "</span></h3>";
        }


    }

    all_div.innerHTML = newHTML;

}

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

function populate_comments_pie(str,prod) {
    var myNode = document.getElementById("product_comment_body_div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    console.log("in comments pie");
    console.log(prod);

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
            "<input type=\"checkbox\"" + "\">" +
            "<i class=" + "card-text" + "></i>" + "\xa0\xa0" + uniqueProducts[i] + 
            '</span>' + "</div>";

        divCard.innerHTML = divCardHTML;
        var element = document.getElementById("product_comment_body_div");
        element.appendChild(divCard);
    }
}

function populate_comments_bar(str,prod) {
    var myNode = document.getElementById("product_comment_body_div");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var arr = str.split("-");
    reviews = []
    for (var i in data_comments) {

        var percent_vulgar = data_comments[i].vulgarity*100;

        if(percent_vulgar >= arr[0] && percent_vulgar <= arr[1]){
            console.log(data_comments[i].vulgarity);
            reviews.push(data_comments[i].review_body);
        }
        
    }

    console.log("in bar pie");
    console.log(prod);

    var uniqueProducts = Array.from(new Set(reviews))

    for (var i in uniqueProducts) {
        var divCard = document.createElement("div")
        divCard.className = "cardDiv"
        divCard.id = "cardDiv_" + i

        var divCardHTML =

           "<div class=\"card-body\"" + "\">" +
            '<div class="comment_card" style="float: left;margin-bottom: 15px; padding-left:2px"><span id="card_id_' + i + '">' +
            "<input type=\"checkbox\"" + "\">" +
            "<i class=" + "card-text" + "></i>" + "\xa0\xa0" + uniqueProducts[i] + 
            '</span>' + "</div>";

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