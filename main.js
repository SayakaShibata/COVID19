function get () {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	var day = new Date;
	var year = day.getFullYear();
    var mon = day.getMonth();
    var days = day.getDate();
    var dow = day.getDay();
    var month = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
    var dows =['Sun','Mon','Thu','Wed','Thu','Fry','Sat'];
    var today = days + ` (`+dows[dow]+ `) `+ month[mon] + ` ` + year;

	if (this.readyState == 4 && this.status == 200) {
		var r = JSON.parse(this.responseText);
		var j = r.Countries[84];//japan
		var g = r.Global;//Bragil
		var gAct = g.TotalConfirmed - g.TotalRecovered-g.TotalDeaths;
		var code = [84,132,30,8,76,177,23];
		var html='';
		html += `<div class="col-sm-12"><div class="card my-3"><div class="card-header">Global Cases</div><div class="card-body "><div class="date card-subtitle mb-2 text-muted text-right">update_ `
				+today+`</div><h5 class="card-title">new Case: <mark>`+g.NewConfirmed + `</mark></h5><p class="blockquote-footer">total positive: `+g.TotalConfirmed + `</p><h6>new Death: `
				+g.NewDeaths + `</h6><p class="blockquote-footer">total deaths: `+g.TotalDeaths + `</p><h6>new Recovered: `
				+g.NewRecovered+`</h6><p class="blockquote-footer">total recovered: `+g.TotalRecovered+`</p><h5>Active: <mark>`+gAct+ `</mark></h5></div></div></div><div class="row row-cols-1 row-cols-md-2">`;
			
			for(var i=0; i< code.length; i++){
				var n = code[i];
				var d = r.Countries[n];
				var dAct = d.TotalConfirmed - d.TotalRecovered - d.TotalDeaths;
				html+=`<div class="col mb-4""><div class="card my-3"><div class="card-header">`+d.Country+` cases</div><div class="card-body "><h5 class="card-title">new Case: <mark>`
				+d.NewConfirmed + `</mark></h5><p class="blockquote-footer">total positive: `+d.TotalConfirmed + `</p><h6>new Death: `
				+d.NewDeaths + `</h6><p class="blockquote-footer">total deaths: `+d.TotalDeaths + `</p><h6>new Recovered:`
				+d.NewRecovered+`</h6><p class="blockquote-footer">total recovered: `+d.TotalRecovered+`</p><h5>Active: <mark>`+dAct+ `</mark></h5></div></div></div>`;
				}
        html+=`</div>`
		document.getElementById("output").innerHTML = html;
	}
};
xhttp.open("Get", "https://cors-anywhere.herokuapp.com/https://api.covid19api.com/summary", true);
xhttp.send();
}
