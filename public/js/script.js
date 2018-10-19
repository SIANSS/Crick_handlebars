var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
// console.log(getUrl.pathname);


if(getUrl.pathname == "/matches/fix"){
  var datus = document.getElementById('datus');
  datus.min = new Date().toISOString().split("T")[0];
}


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
        document.getElementById('btn').innerHTML = "Choose";
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
  document.getElementById('btn').style.display = "none";
  // console.log("hellow");
  selectEl = document.getElementById('locations');
  selectEl.classList.remove("hidden");
  selectEl.options.add(new Option("--- Select a Ground/Area", ""));

  var geword = "grounds";
  for(var i = 0; i < geword.length; i++){
    selectEl.options.add(new Option(geword+ " " + i, geword + i));
  }

  document.getElementById('selection-section').innerHTML = "<br><div class='form-group col-lg-4'><label>Select Play Time :</label><input class='form-control' type='time' id='times'></div><div class='form-group col-lg-4'><label>Maximum Overs : </label><select id='overs' class='form-control'><option value='5'>5</option><option value='6'>6</option><option value='10'>10</option><option value='20'>20</option></select></div><div class='form-group col-lg-4'><label>Players per team:</label><select id='ppt' class='form-control'><option value='5'>5</option><option value='12'>12</option></select></div> <a style='text-decoration:none; text-align:center; margin-bottom:20px;' class='form-control' href='/matches/fix'>Go back</a> <input class='form-control btn-danger' type='button' onclick='challenge()' value='Challenge !!!'>";
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
      var reps = this.responseText;
      console.log(reps);
      // document.getElementById('match_fixed').innerHTML = "<h1>"+reps+"</h1>";
      // window.alert(reps);
      if(reps == "success"){
        document.getElementById('match_fixed').innerHTML = "<h1>"+reps+"</h1>";
        window.location.href = "http://localhost:4446/matches/dashboard";
      }
      if(reps == "This Match Exists already"){
        document.getElementById('match_fixed').innerHTML = "<h1>"+reps+"</h1>";
        setTimeout(function() {
          window.location.href = "http://localhost:4446/matches/fix";
        }, 3000);
      }

    }
  }

  xhttp.open("PUT", baseUrl+"/fix", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params)
}

if(getUrl.pathname == "/matches/fix" || getUrl.pathname == "/matches/dashboard"  && (document.getElementById('name_getter') !== null || undefined)){
  document.getElementById('tabsub1').innerHTML = "View dashboard";
  document.getElementById('tabsub1').href = "/matches/dashboard";
  document.getElementById('tabsub2').innerHTML = "Fix Match";
  document.getElementById('tabsub2').href = "/matches/fix";
  document.getElementById('tabsub3').innerHTML = "Stats & Leaderboards";
  document.getElementById('tabsub3').href = "#"; // -- > /matches/leaderboard
  document.getElementById('tabbable-navbar').innerHTML = "Team Menu";

}


if(getUrl.pathname == "/matches/dashboard" && (document.getElementById('name_getter') !== null || undefined)){
  document.getElementById('previt').classList.add("hidden");
  getallmatchesfu();
}

function changeit(){
  document.getElementById('MatchesforYou').style.display = "none";
  document.getElementById('MatchesByYou').style.display = "";
  document.getElementById('previt').classList.remove("hidden");
  document.getElementById('nextit').classList.add("hidden");
  getallmatchesbu();

}
function changeit2(){
  document.getElementById('tchange').innerHTML = 'Arranged By You';
  document.getElementById('MatchesByYou').style.display = "none";
  document.getElementById('MatchesforYou').style.display = "";
  document.getElementById('previt').classList.add("hidden");
  document.getElementById('nextit').classList.remove("hidden");
}


function getallmatchesfu() {
  document.getElementById('tchange').innerHTML = 'Arranged By you';
  var team = document.getElementById('name_getter').value;
  // console.log(team);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      var data1 = JSON.parse(this.responseText);
      console.log(data1);
      for(var i = 0; i < data1.length; i++){
        document.getElementById('MatchesforYou').innerHTML += '<div style="margin-bottom:20px;" class="col-sm-4 panel panel-primary"><div style="background-color:Darkgreen;  padding-top:10px;" class="title mid"><h5 style="color:white; font-size:1.75vw;"><b>'+data1[i].teams.home+' </b> <i>VS</i> <b>'+data1[i].teams.away+'</b> </h5><p style="color:white; font-size:1.5vw;">'+data1[i].time+' || '+data1[i].date+'</p><p style="color:white; font-size:2vw;">'+data1[i].location+'</p><button id="showbut'+i+'" class="btn btn-default">Confirmed</button><button id="hidbut'+i+'" class="btn btn-danger hidden" name="button">Not Confirmed</button><br><br></div></div>';
        if(data1[i].status_fixed == false) {
          document.getElementById('hidbut'+i+'').classList.remove("hidden");
          document.getElementById('showbut'+i+'').classList.add("hidden");
        }
        if(data1[i].status_fixed == true){
          document.getElementById('hidbut'+i+'').classList.add("hidden");
          document.getElementById('showbut'+i+'').classList.remove("hidden");
        }
      }
      // <input id='statusx"+i+"' type='text' class='hidden btn-success form-control' value='"+data1[i].status_fixed+"'>
    }
  }

  xhttp.open("GET", baseUrl+"/getmatches/"+team, true);
  xhttp.send();
}


function getallmatchesbu() {
  document.getElementById('tchange').innerHTML = 'Challenges';
  document.getElementById('MatchesByYou').innerHTML = '';
  var team = document.getElementById('name_getter').value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
      var data2 = JSON.parse(this.responseText);
      console.log(data2);
      if(data2 == false ){
        document.getElementById('MatchesByYou').innerHTML = '<div class="tablet col-sm-6 mid"><h1>No Matches available for now</h1></div>';
      }
      if(data2.value !== false){
      for(var i = 0; i < data2.length; i++){
        document.getElementById('MatchesByYou').innerHTML = '<div style="margin-bottom:20px;" class="col-sm-4 panel panel-primary"><p class="hidden" id="team_id'+i+'">'+data2[i]._id+'</p><div style="background-color:Darkgreen;  padding-top:10px;" class="title mid"><h5 style="color:white; font-size:2.25vw;"><b id=home'+i+'>'
        +data2[i].teams.home+'</b> <i>VS</i> <b id="away'+i+'">'+data2[i].teams.away
        +'</b> </h5><p style="color:white; font-size:1.5vw;"><b id="time'+i+'">'+data2[i].time+' </b>|| <b id="date'+i+'">'+data2[i].date+'</b></p><p style="color:white; font-size:2vw;" id="location'+i+'">'+data2[i].location+'</p><div id="btnspace'+i+'"></div></div></div>';
        if(data2[i].status_fixed == true || data2[i].status_fixed === true) {
          document.getElementById('btnspace'+i+'').innerHTML = '<input style="margin-bottom:20px;" id="hidbut'+i+'" type="button" class="btn btn-default" value="Confirmed">';
          // <input id="hidbut'+i+'" onclick="confirmit('+i+')" type="button" class="btn btn-danger" value="Not Confirmed">
          // document.getElementById('hidbut'+i).classList.remove("btn-danger");
          // document.getElementById(`hidbut${i}`).classList.add("btn-success");
          // document.getElementById('hidbut'+i+'').classList.add("btn-success");
          // document.getElementById(`hidbut${i}`).value += "Confirmed";
          // document.getElementById(`hidbut${i}`).disabled = true;
          console.log(data2[i].status_fixed);
        }
        if(data2[i].status_fixed == false || data2[i].status_fixed === false){
        document.getElementById('btnspace'+i+'').innerHTML = '<input id="hidbut'+i+'" onclick="confirmit('+i+')" type="button" class="btn btn-danger" value="Not Confirmed">';

        //   console.log(data2[i].status_fixed);
        //   document.getElementById(`hidbut${i}`).value += "Not Confirmed";
        //   document.getElementById(`hidbut${i}`).classList.add("btn-danger");
        //   document.getElementById(`hidbut${i}`).disabled = false;
        }
      }
    }
    }
  }
  xhttp.open("GET", baseUrl+"/getmatchesv2/"+team, true);
  xhttp.send();
}


function confirmit(conf){
  var id = document.getElementById('team_id'+conf).innerHTML;
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


    if(getUrl.location == "matches/test"){
      document.getElementById('tabbable-navbar').innerHTML = '';
    }
