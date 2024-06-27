var searchInput =document.getElementById('searchInput')
var btn =document.getElementById('searchBtn')
var day=new Date()
var d= day.toLocaleString('en',{weekday:'long'});
var days=[
    "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday", 
  "Friday",
  "Saturday",
]
getLocation('cairo')

btn.addEventListener('click',function(){
    getLocation(searchInput.value)
})

var allRecipes=[]

async function getLocation(city){
    var loading=document.querySelector('.loader-div')
    try {
        loading.classList.remove('d-none')
        var recponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=14d2c2f13eab494286433940242006&q=${city}07112&days=3`)
        var data = await recponse.json()
        
        allRecipes = data.forecast.forecastday
        displayData(data.location.name, allRecipes)
        console.log(data)
    }
    
    catch (error) {
      var recponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=14d2c2f13eab494286433940242006&q=07112&days=3`)
        var data = await recponse.json()
        allRecipes = data.forecast.forecastday
        displayData(allRecipes)
        console.log('error')
    }
    finally{
        loading.classList.add('d-none')

    }
    } 


function displayData(locationName,forecastdays){
    var cartona =``;
    for(i=0; i < forecastdays.length;i++){
      var dayData = forecastdays[i];
      var date = new Date(dayData.date);
      if(i==0){
        cartona +=`
        <div class="test col-md-4">
              <div class="titel-heder d-flex justify-content-between">
                <div class="day">${days[new Date(allRecipes[i].date).getDay()]}</div>
                <div class=" date" id="date">${new Date(allRecipes[i].date).getDate()}</div>
              </div>
              <div class="forecast-content p-4">
                <h6 class="location text-light fw-bold">${locationName}</h6>
                <div class="degree">
                  <div class="num">${allRecipes[i].day.avgtemp_c}<sup>o</sup>C</div>
                  <div class="forecast-icon">
                    <img src="https:${allRecipes[i].day.condition.icon}" alt="img-icon">
                  </div>
                  <div class="custom text-info my-3">${allRecipes[i].day.condition.text}</div>
                  <span><img src="images/icon-umberella.png" alt="icon"> ${allRecipes[i].day.daily_chance_of_rain}%</span>
                  <span><img src="images/icon-wind.png" alt="icon"> ${allRecipes[i].day.maxwind_kph} kph</span>
                  <span><img src="images/icon-compass.png" alt="icon">${allRecipes[i].day.avgvis_km} km</span>
                </div>
              </div>
            </div>
        `
      }
      else{
        cartona +=`
        <div class="test col-md-4">
              <div class="titel-heder">
                <div class="day text-center">${days[new Date(allRecipes[i].date).getDay()]}</div>
              </div>
              <div class="forecast-content p-4 text-center">
                <div class="forecast-icon py-4">
                  <img src="https:${allRecipes[i].day.condition.icon}">
                </div>
                <div class="degree">
                  <div class="num-title my-3">${allRecipes[i].day.avgtemp_c}<sup>o</sup>C</div>
                </div>
                <small class="text-light-emphasis fs-4">${allRecipes[i].day.mintemp_c}<sup>o</sup>C</small>
                <div class="custom text-info my-3">${allRecipes[i].day.condition.text}</div>
              </div>
            </div>
        
        `
      }
    }
    document.getElementById('rowData').innerHTML=cartona
}
