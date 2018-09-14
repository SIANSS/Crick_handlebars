var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
console.log(baseUrl);

var datus = document.getElementById('datus');
datus.min = new Date().toISOString().split("T")[0];

function getallteams(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data.length);
      selectEl = document.getElementById('teams');
      selectEl.classList.remove("hidden");
      selectEl.options.add(new Option("--- Select a TEAM", ""));

      for(var i = 0; i < data.length; i++){
        selectEl.options.add(new Option(data[i].team_name, data[i].team_name));
      }

      selectEl.onchange = function(){
        document.getElementById('btn').classList.remove("hidden");
        document.getElementById('btn').innerHTML = "Select";
      }



      document.addEventListener('click',function(e){
        if(e.target && e.target.id== 'btn'){
          selected();
        }
      })
    }
  };
  xhttp.open("GET", baseUrl+"/getallteam", true);
  xhttp.send();
}

function selected(){
  // console.log("hellow");
  selectEl = document.getElementById('locations');
  selectEl.classList.remove("hidden");
  selectEl.options.add(new Option("--- Select a Ground/Area", ""));

  var geword = "grounds";
  for(var i = 0; i < geword.length; i++){
    selectEl.options.add(new Option(geword+ " " + i, geword + i));
  }

  document.getElementById('selection-section').innerHTML = "<br><div class='form-group'><label>Select Play Time :</label><input class='form-control' type='time' id='times'></div><div class='form-group'><label>Maximum Overs : </label><select id='overs' class='form-control'><option value='5'>5</option><option value='6'>6</option><option value='10'>10</option><option value='20'>20</option></select></div><div class='form-group'><label>Players per team:</label><select id='ppt' class='form-control'><option value='5'>5</option><option value='12'>12</option></select></div> <a style='text-decoration:none; text-align:center;' class='form-control' href='/matches/fix'>Go back</a> <br><input class='form-control btn-danger' type='button' onclick='challenge()' value='Challenge !!!'>";
}

function challenge(){
  var date = document.getElementById('datus').value;
  var location = document.getElementById('locations').value;
  var time = document.getElementById('times').value.toString();
  var home = document.getElementById('homet').value;
  var away = document.getElementById('teams').value;
  var overs = document.getElementById('overs').value;
  var players = document.getElementById('ppt').value;
  var params = "location="location+"&date="+date+"&time="+time+"&home="+home+"&away="+away+"&overs"+overs+"&ppt="+players;
  console.log(location + " " + date + " " + time + " " + home + " " + away + "  " + overs + " " + players);



  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){

    }
  }

  xhttp.open("POST", baseUrl+"/fix", true);
  xhttp.send(params)
}
