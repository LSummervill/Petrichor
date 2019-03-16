/*
testing area for javascript functions
*/



//Array.from({length: 20}, (x,i) => i);




function loader(idz,idzCB){
	
	var select = document.getElementById(idz); 
	var checkbox = document.getElementById(idzCB);
	
	if (checkbox.checked) {	//is checked
	
		if (document.getElementById(idz).value==false) {	//needs to populate
			for(var i = 1; i < 101; i++) {
				var el = document.createElement("option");
				var t = document.createTextNode(i);
  
				el.appendChild(t);
				select.appendChild(el);
			}
			//alert("one and done");
		}
		//alert ("The check box is checked.");
		//alert("visible");
		document.getElementById(idz).style.display = "block";
	}
	else {	//has been created
		//alert ("The check box is not checked.");
		//alert("invisible");
		document.getElementById(idz).style.display = "none"; //added
	}	
}



var OptionPrice = [
    1.00,
    30.00,
    5.00,
    5.00,
    3.00,
    1.00
];

var fltBase = 0.0;
var fltTaxRate = 0.095;

/*
function orderSummary()
purpose:		recalculate the current order information
parameters:		none
*/
function orderSummary(idz,idzCB){
	
	var fltSub = fltBase;
	var intRinse = 0;	//none selected
	var intHW = 0;
	var intRims = 0;
	var intVacuum = 0;
	var intWindows = 0;
	var intAirFresh = 0;
	var fltTax = 0;
	var fltTotal = 0;
	var intOptionCount = 0;
	var strPC = "Order Summary:<br />";
	var strSummary = "";
	var strPriceSum = "";
	var intWhichSpec = 0;
	
	loader(idz,idzCB);
	
	// check to see which size is selected
	if (document.forms[0].cbRinse.checked){
		
		intRinse = document.getElementById("NumRinse").value;
		strPC = strPC + '<br />Rinse selected for '+intRinse+' vehicles.';
		fltSub += intRinse*OptionPrice[0];	//need to multiply by cost
		//alert(intRinse+ "rinse");
	}

	// check to see which size is selected
	if (document.forms[0].cbHW.checked){
		
		intHW = document.getElementById("NumHW").value;
		strPC = strPC + '<br />Hand Wash selected for '+intHW+' vehicles.';
		fltSub += intHW*OptionPrice[1];	//need to multiply by cost
		//alert(fltSub+ "rinse");
	}
	
	if (document.forms[0].cbRims.checked){
		
		intRims = document.getElementById("NumRims").value;
		strPC = strPC + '<br />Rims Detailed selected for '+intRims+' vehicles.';
		fltSub += intRims*OptionPrice[2];	//need to multiply by cost
		//alert(fltSub+ "rinse");
}

	if (document.forms[0].cbVacuum.checked){
		
		intVacuum = document.getElementById("NumVacuum").value;
		strPC = strPC + '<br />Interior Vacuum selected for '+intVacuum+' vehicles.';
		fltSub += intVacuum*OptionPrice[3];	//need to multiply by cost
		//alert(fltSub+ "rinse");
}

	if (document.forms[0].cbWindows.checked){
		
		intWindows = document.getElementById("NumWindows").value;
		strPC = strPC + '<br />Interior Windows selected for '+intWindows+' vehicles.';
		fltSub += intWindows*OptionPrice[4];	//need to multiply by cost
		//alert(fltSub+ "rinse");
}

	if (document.forms[0].cbAirFresh.checked){
		
		intAirFresh = document.getElementById("NumAirFresh").value;
		strPC = strPC + '<br />Air Freshener selected for '+intAirFresh+' vehicles.';
		fltSub += intAirFresh*OptionPrice[5];	//need to multiply by cost
		//alert(fltSub+ "rinse");
}
	
	//alert("hi");
	// check to see which warranty is chosen
	//for (var i = 0; i < document.forms[0].rdoWarranty.length; i++){
		//if (document.forms[0].rdoWarranty[i].checked){
		//	intWarranty = i;
		//}
	//}
	
	// set the DHTML display to include the warranty
	//switch(intWarranty){
		//case 0:
		//  strPC = strPC + "1 year Warranty";
		//  break;
		//case 1:
		//  strPC = strPC + "2 years Warranty";
		// fltSub += 100;
		//  break;
	//}

	

	fltSub = fltSub.toFixed(2);
	
	fltTax = fltSub * fltTaxRate;
	
	fltTax = fltTax.toFixed(2);
	fltTotal = parseFloat(fltSub) + parseFloat(fltTax);
	
	fltTotal = parseFloat(fltTotal);
	fltTotal = fltTotal.toFixed(2);
		
	SetCookie("strPC", strPC);
	SetCookie("fltSub", fltSub);
	SetCookie("fltTax", fltTax);
	SetCookie("fltTotal", fltTotal);
	
	strSummary = strPC;
	
	strPriceSum = "<table> <tr><td>Subtotal:</td> <td align='right'>$" + fltSub + "</td></tr><tr><td>" + "Tax:</td> <td align='right' style='border-bottom-color: White; border-bottom-width: 1px; border-bottom-style: solid;'>" + fltTax + "</td></tr><tr> <td>Total:</td> <td align='right'>$" + fltTotal + "</td></tr></table>"
	
	document.getElementById("orderSum").innerHTML = strSummary;
	document.getElementById("priceSum").innerHTML = strPriceSum;
	
	return true;

}

/*
function changeOption()
purpose:		Make the options visible to user
parameters:		none
*/

function changeOption(){
	document.getElementById("options").style.visibility = "visible";
	
	// uncheck and enable
	for (var i = 0; i < document.forms[0].chkOption.length; i++){
		document.forms[0].chkOption[i].checked = false;
		document.forms[0].chkOption[i].disabled = false;
	}
	
	orderSummary();
	
	
}

/*
function hideOption()
purpose:		Make the options invisible to user
parameters:		none
*/
function hideOption(){
	document.getElementById("options").style.visibility = "hidden";
	
	// uncheck and disable
	for (var i = 0; i < document.forms[0].chkOption.length; i++){
		document.forms[0].chkOption[i].checked = false;
		document.forms[0].chkOption[i].disabled = true;
	}
	
	orderSummary();
}

/*
function ckform(formIndex)
purpose:		verify that required fields are completed
parameters:		formIndex as an integer, representing the form number within the page
				
*/

function ckform(formIndex){

	// identifed txtFName as the field 15 of the form
	var intStartCheck = 15;	
	var intNumFields = document.forms[formIndex].elements.length;
	var strCustomer = "";
	
	for (var i = intStartCheck; i < intNumFields; i++){
		if (document.forms[formIndex].elements[i].name != "txtApartment"){
			if (document.forms[formIndex].elements[i].value == ""){
				document.getElementById(document.forms[formIndex].elements[i].name).innerHTML = "<span style='color:yellow'>Required Field</span>";
				document.forms[formIndex].elements[i].focus();
				return false;
			}
			strCustomer += document.forms[formIndex].elements[i].value + " ";
			if (document.forms[formIndex].elements[i].name != "txtFName"){
				strCustomer += "<br />";
			}
		}
	}
	
	orderSummary();
	// remove the value of the submit button from the string
	strCustomer = strCustomer.slice(0, (strCustomer.length - 23));
	
	SetCookie("Customer", strCustomer);
	
	
	SetCookie("custFName", document.forms[0].txtFName.value);
	SetCookie("custLName", document.forms[0].txtLName.value);

	
	
	return true;
}

function clearThis(){
	
	var formIndex = 0;
	var intStartCheck = 0;
	var intNumFields = document.forms[formIndex].elements.length - 1;
	
	for (var i = intStartCheck; i < intNumFields; i++){
		if (document.forms[formIndex].elements[i].name != "txtApartment"){
			document.getElementById(document.forms[formIndex].elements[i].name).innerHTML = "";
		}
	}		
	
	return true;
}

/* ----------------------------------------------
function replaceString(stringValue)
purpose:		replaces special HTML characters in cookie values
parameters:		stringValue as string, the value to be encoded
notes:			can be used for more than cookies
---------------------------------------------- */
function replaceString(stringValue){

	newString = stringValue;
	
	/*newString = newString.replace('"','&quot;');
	newString = newString.replace("'", '&apos;');
	newString = newString.replace("–", '&ndash;');
	newString = newString.replace("—", '&mdash;');
	newString = newString.replace("¡", '&iexcl;');
	newString = newString.replace("¿", '&iquest;');
	newString = newString.replace("“", '&ldquo;');
	newString = newString.replace("”", '&rdquo;');
	newString = newString.replace("‘", '&lsquo;');
	newString = newString.replace("’", '&rsquo;');
	newString = newString.replace("«", '&laquo;');
	newString = newString.replace("»", '&raquo;');
	newString = newString.replace(" ", '&nbsp;');
	newString = newString.replace("&", '&amp;');
	newString = newString.replace("¢", '&cent;');
	newString = newString.replace("©", '&copy;');
	newString = newString.replace("÷", '&divide;');
	newString = newString.replace(">", '&gt;');
	newString = newString.replace("<", '&lt;');
	newString = newString.replace("<", '&lt;');*/

	return newString;
}

/* ----------------------------------------------
function writePCCookies(){
purpose:	writes the PC information cookies 
author:	
parameters:		none
---------------------------------------------- */
function writePCCookies(){

	SetCookie("PCDesc", document.getElementById("orderSum").innerHTML);
	SetCookie("PriceSum", document.getElementById("priceSum").innerHTML);
	window.location.href = "custInfo.html";
	
	return true;
}

/* ----------------------------------------------
function chForm(){
purpose:	checks the customer information form for complete and correct information
author:	
parameters:		none
---------------------------------------------- */
function chForm(){
	var intNumFields = document.forms[0].elements.length;
	var phoneExp = /\d\d\d-\d\d\d-\d\d\d\d/;
	var zipExp = /\d{5}/;
	var emailExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	
	// check that values have been entered into required fields
	for (var i = 0; i < intNumFields; i++){
		if (document.forms[0].elements[i].name != "txtApartment"){
			if (document.forms[0].elements[i].value.length == 0){
				document.getElementById(document.forms[0].elements[i].name).innerHTML = "Required Field";
				document.forms[0].elements[i].focus();
				document.forms[0].elements[i].select();
				return false;
			}
		}
	}
	

	
	if (!emailExp.test(document.forms[0].txtEmail.value)){
		document.getElementById("txtEmail").innerHTML = "Please enter a valid email address";
		document.forms[0].txtEmail.focus();
		document.forms[0].txtEmail.select();
		return false
	}
	
	// customer order information is correct write cookie for customer information
	writeCustCookie();
	
	return true;
	//return false;
}

/* ----------------------------------------------
function writeCustCookie(){
purpose:	Writes the customer informstion cookies
author:	
parameters:		none
---------------------------------------------- */
function writeCustCookie(){
	var strCustName = document.forms[0].txtFName.value + " " + document.forms[0].txtLName.value;	
	
	SetCookie("custName", document.forms[0].txtFName.value + " " + document.forms[0].txtLName.value);
	SetCookie("custAddress", document.forms[0].txtAddress.value + " " + document.forms[0].txtApartment.value);
	SetCookie("custCity", document.forms[0].txtCity.value + ", " + document.forms[0].txtState.value + " " + document.forms[0].txtZip.value);
	SetCookie("custEmail", document.forms[0].txtEmail.value);
	SetCookie("custPhone", document.forms[0].txtPhone.value);
	return true;
}


var milisec=0;
var seconds=60;
var minutes=29;

/* ----------------------------------------------
function secondPassed(){
purpose:	Count down clock for delivery
author:	
parameters:		none
---------------------------------------------- */ 
// 1800 seconds in 30 minutes
var seconds = 30*24*3600;
// seconds set at 20 for testing
//var seconds = 20;


function secondPassed() {
// Calculate the number of days left
    var days=Math.floor(seconds / 86400); 
// After deducting the days calculate the number of hours left
    var hours = Math.floor((seconds - (days * 86400 ))/3600)
// After days and hours , how many minutes are left 
    var minutes = Math.floor((seconds - (days * 86400 ) - (hours *3600 ))/60)
// Finally how many seconds left after removing days, hours and minutes. 
   var secs = Math.floor((seconds - (days * 86400 ) - (hours *3600 ) - (minutes*60)))

   var x = hours + " Hours " + minutes + " Minutes and " + secs + " Seconds ";
   document.getElementById('countdown').innerHTML = x;

   
	// create an alternate display if PC has not arrived
	if (seconds == 0) {
   	clearInterval(countdownTimer);
      document.getElementById('countdown').innerHTML = "A representative will be calling.";
   }
	else {
   	seconds--;
   }
	
	return true;
	
}
 
var countdownTimer = setInterval('secondPassed()', 1000); 
