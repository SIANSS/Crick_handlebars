var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
// console.log(getUrl.pathname);

if(getUrl.pathname == "/"){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      document.getElementById('matchlist').innerHTML = '<h4 class="text-left">latest matches</h4><div id="indom" class="container"></div>';
      document.getElementById('indom').innerHTML += '';
    };
    xhttp.open("GET", baseUrl+"matches/getlatestmatches", true);
    xhttp.send();
  }
}

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
      for(var i=0; i < selectEl.length; i++){

        if(selectEl.options[i].value == document.getElementById('name_getter').value){
          selectEl.options[i].remove();
        }else {
          // console.log('NOT Found');
        }
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

  var params = "location="+location+"&date="+date+"&time="+time+"&home="+home+"&away="+away+"&overs="+overs+"&ppt="+players;
  console.log(params);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
      document.getElementById('match_fixed').innerHTML = "<h1>Success</h1>";
    }
  }

  xhttp.open("POST", baseUrl+"/fix", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params)
}



if(getUrl.pathname == "/matches/dashboard" && (document.getElementById('name_getter') !== null || undefined)){
  getallmatchesfu();
  getallmatchesbu();
}

function getallmatchesfu() {
  var team = document.getElementById('name_getter').value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      console.log(data1);
      var data1 = JSON.parse(this.responseText);
      for(var i = 0; i < data1.length; i++){
        document.getElementById('MatchesforYou').innerHTML += "<div class=''>"+data1[i].time+"</div><div class=''>"+data1[i].date+"</div><br><br><div class=''>"+data1[i].location+"</div><br><br><div class=''>"+data1[i].teams.home+"</div><div class=''>VS</div><div class=''>"+data1[i].teams.away+"</div><br><br><br><br><p id='px"+i+"' class=''> NOT Confirmed !!</p> <br><br><br>";
        if(data1[i].status_fixed == false) {
          document.getElementById('px'+i+'').classList.remove("hidden");
        }
      }
      // <input id='statusx"+i+"' type='text' class='hidden btn-success form-control' value='"+data1[i].status_fixed+"'>
    }
  }

  xhttp.open("GET", baseUrl+"/getmatches/"+team, true);
  xhttp.send();
}


function getallmatchesbu() {
  var team = document.getElementById('name_getter').value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      var data2 = JSON.parse(this.responseText);

      document.getElementById('MatchesByYou').innerHTML = "<h3 class='mid'>Arranged by Other</h3>"
      for(var i = 0; i < data2.length; i++){
        document.getElementById('MatchesByYou').innerHTML += "<input type='text' class='hidden' id='team_id"+i+"' value='"+data2[i]._id+"'><div class='' id='time"+i+"'>"+data2[i].time+"</div><div id='date"+i+"' class=''>"+data2[i].date+"</div><br><br><div id='location"+i+"' class=''>"+data2[i].location+"</div><br><br><div id='home"+i+"' class=''>"+data2[i].teams.home+"</div><div class=''>VS</div><div id='away"+i+"' class=''>"+data2[i].teams.away+"</div><div id='conf"+i+"' class=''></div><br><br><br><br><br><br><br><br>";
        if(data2[i].status_fixed == false) {
          document.getElementById('conf'+i+'').classList.remove("hidden");
          document.getElementById('conf'+i+'').innerHTML += "<button class='' onclick='confirmit("+i+")'>Confirm it</button><br><br><br>";
        }
      }
    }
  }
  xhttp.open("GET", baseUrl+"/getmatchesv2/"+team, true);
  xhttp.send();
}


function confirmit(conf){
  var id = document.getElementById('team_id'+conf).value;
  var date = document.getElementById('date'+conf).innerHTML;
  var location = document.getElementById('location'+conf).innerHTML;
  var time = document.getElementById('time'+conf).innerHTML;
  var home = document.getElementById('home'+conf).innerHTML;
  var away = document.getElementById('away'+conf).innerHTML;

  var params = "location="+location+"&date="+date+"&time="+time+"&home="+home+"&away="+away;

  console.log(params);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      // getallmatchesfu();
      getallmatchesbu();
    }
  }


  xhttp.open("PUT", baseUrl+"/confirmmatch/"+id, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}

//
// var slideIndex = 0;
// showSlides();
//
// function showSlides() {
//     var i;
//     var slides = document.getElementsByClassName("mySlides");
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }
//     slideIndex++;
//     if (slideIndex > slides.length) {slideIndex = 1}
//     slides[slideIndex-1].style.display = "block";
//     setTimeout(showSlides, 3000); // Change image every 2 seconds
// }

function add(){
  var title = document.getElementById('datus').value;
  var body  = document.getElementById('locations').value;

  var params = "title="+title+"&body="+body;
  console.log(params);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
      document.getElementById('success_id').innerHTML = "<h1>Added</h1>";
    }
  }

  xhttp.open("POST", baseUrl+"/forums", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params)
}
