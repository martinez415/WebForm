"use strict";

$(document).ready( () => {
    let msg="";
    let displayMsg="";
    let textArea="";
    let isValid=true;
    let totalOrder=0;
    const itemLst=[];
    $("#name").focus();

    const clearFields=( () => {
        $("#name").val("");
        $("#name").next().text("*");
        $("#email").val("");
        $("#email").next().text("*");
        $("#phone").val("");
        $("#phone").next().text("*");
        $("#delivery").val("");
        $("#delivery").next().text("*");
        $("#quantity").val("1");
        $("#orderForm").val("");
    });

    $("#clear").click( () => {
        clearFields();
    });

    $("#order").click ( () => {
        //Name data validation
        const name=$("#name").val().trim();
        if(name=="") {
            $("#name").next().text("This field is required!");
            isValid=false;
            $("#name").focus();
        } else { 
            $("#name").next().text("");
            isValid=true;
        }
        $("#name").val(name);

        //Email address data validation
        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
        const email=$("#email").val().trim();
        if(email=="") {
            $("#email").next().text("This field is required!");
            isValid=false;
        } else if(!emailPattern.test(email)){
            $("#email").next().text("Must be a valid email address!");
            isValid=false; 
        } else {
            $("#email").next().text("");
            isValid=true;
        }
        $("#email").val(email);

        //Phone number data validation
        const phonePattern=/[0-9]{3}-[0-9]{3}-[0-9]{4}/;
        const phone=$("#phone").val().trim();
        if(phone=="") {
            $("#phone").next().text("This field is required!");
            isValid=false;
        } else if(!phonePattern.test(phone)){
            $("#phone").next().text("Must be a valid phone number!");
            isValid=false;
        } else {
            $("#phone").next().text("");
            isValid=true;
        }
        $("#phone").val(phone);

        if($("#delivery").val()=="") {
            $("#delivery").next().text("Delivery date is required!");
            isValid=false;
        } else {
            $("#delivery").next().text("");
            isValid=true;
        }

        if(isValid==true) {
            $("#quantity").val("1");
            $("#buildYourPizza").removeAttr('disabled');
            $("#orderDetails").removeAttr('disabled');
            $("#custInfo").attr('disabled', 'disabled');
        }
    });

    $("#add").click( () => {
        var quantity=parseFloat($("#quantity").val());
        let price=0;
        let size="";

        if($("#large").is(":checked")) {
            size="Large";
            price=35.00*quantity;
        } 
        if($("#medium").is(":checked")) {
            size="Medium";
            price=25.00*quantity;
        }
        if($("#small").is(":checked")) {
            size="Small";
            price=15.00*quantity;
        }

        totalOrder+=price;
        itemLst[itemLst.length]=quantity+" "+size+" "+price.toFixed(2)+"\n";
        displayMsg+=quantity+" "+size+" "+price.toFixed(2)+"\n";
        textArea=$("#orderForm").val(displayMsg);

        // Local Storage
        let itemOrder=localStorage.myOrder || "";
        for(let i=0; i<itemLst.length; i++) {
            localStorage.myOrder=itemOrder.concat(itemLst[i], "\n");
        };
        textArea.val(localStorage.myOrder);
    });

    const startNewOrder=( () => {
        $("#custInfo").removeAttr('disabled');
        $("#buildYourPizza").attr('disabled', 'disabled');
        $("#quantity").val("1");
        $("#orderDetails").attr('disabled', 'disabled');
        $("#name").focus();
        msg="";
        localStorage.removeItem("myOrder");
        textArea.val("");
    });

    $("#newOrder").click ( () => {
        clearFields();
        startNewOrder();
    });

    $("#placeOrder").click( () => {
        msg+=$("#name").val()+"\n"+"Here is your order"+"\n";
        for(let i=0; i<itemLst.length; i++) 
        {
            msg+=itemLst[i];
        }
        msg+="Total Order: $"+totalOrder.toFixed(2)+"\n";
        alert(msg);
        clearFields();
        startNewOrder();
    });
});