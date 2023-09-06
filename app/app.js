const baseurl = `https://api.weatherapi.com/v1/forecast.json?key=`
const apikey = `a961547e3e7244c7a48204815232808`

function initListeners() {
    $("#submit").on("click", (e) => {
        $(".results").html("")
        e.preventDefault()
        let city = $("#city").val()
        let zip = $("#zip").val()
        let forecast = $("#forecast").val()

        if(forecast < 0 || forecast > 10) {
            $(".error").html("Please input a forecast day from 0 to 10")
            return
        }

        $(".error").html("") //reset error text upon correct input

        if(city != "") {
            let cityURL = `${baseurl}${apikey}&q=${city}&days=${forecast}&aqi=no&alerts=no`
            console.log(cityURL)
        
            $.getJSON(cityURL, (data) => {
                console.log("city URL", data)
                $(".results").html(`
                    <div class="location">
                        <h2>Location Information</h2>
                        <div class="locationInfo">
                            <div class="locationLeft">
                                <p><b>Name:</b> ${data.location.name}</p>
                                <p><b>Region:</b> ${data.location.region}</p>
                                <p><b>Country:</b> ${data.location.country}</p>
                                <p><b>Local Time:</b> ${data.location.localtime}</p>
                            </div>
                            <div class="locationRight">
                                <p><b>Condition:</b> 
                                    ${data.current.condition.text} 
                                    <img src="${data.current.condition.icon}" alt="cond">
                                </p>
                                <p><b>Temperature (F&deg;):</b> 
                                    ${data.current.temp_f}&deg; but feels like ${data.current.feelslike_f}&deg;
                                </p>
                                <p><b>Temperature (C&deg;):</b> 
                                    ${data.current.temp_c}&deg; but feels like ${data.current.feelslike_c}&deg;
                                </p>
                            </div>
                        </div>
                    </div>
                `)
                if(forecast != 0) {
                    let days = data.forecast.forecastday
                    $(".results").append(`
                        <div class="forecast">
                            <h2>Forecast</h2>
                            <div class="forecastList"></div>
                        </div>
                    `)
                    $.each(days, (idx, day) => {
                        $(".forecastList").append(`
                            <div class="forecastDay">
                                <h3>${day.date} | ${day.day.condition.text}</h3>
                                <div class="forecastInfo">
                                    <div>
                                        <p>
                                            <img src="${day.day.condition.icon}" alt="condition"
                                        </p>
                                        <p><b>Max Temps:</b> ${day.day.maxtemp_f}&deg;F & ${day.day.maxtemp_c}&deg;C</p>
                                        <p><b>Min Temps:</b> ${day.day.mintemp_f}&deg;F & ${day.day.mintemp_c}&deg;C</p>
                                        <p><b>Avg Temps:</b> ${day.day.avgtemp_f}&deg;F & ${day.day.avgtemp_c}&deg;C</p>
                                        <p><b>Max Wind Speed:</b> ${day.day.maxwind_mph}MPH & ${day.day.maxwind_kph}KPH</p>
                                    </div>
                                    <div>
                                        
                                        <p><b>Chance of Rain:</b> ${day.day.daily_chance_of_rain}%</p>
                                        <p><b>Chance of Snow:</b> ${day.day.daily_chance_of_snow}%</p>
                                        <p><b>Sunrise:</b> ${day.astro.sunrise}</p>
                                        <p><b>Sunset:</b> ${day.astro.sunset}</p>
                                    </div>
                                </div>
                            </div>
                        `)
                    })
                }
            }).fail(function(e) {
                console.log( "error", e );
            })
        }

        if(zip != "") {
            let zipURL = `${baseurl}${apikey}&q=${zip}&days=${forecast}&aqi=no&alerts=no`

            $.getJSON(zipURL, (data) => {
                console.log("city URL", data)
                $(".results").html(`
                    <div class="location">
                        <h2>Location Information</h2>
                        <div class="locationInfo">
                            <div class="locationLeft">
                                <p><b>Name:</b> ${data.location.name}</p>
                                <p><b>Region:</b> ${data.location.region}</p>
                                <p><b>Country:</b> ${data.location.country}</p>
                                <p><b>Local Time:</b> ${data.location.localtime}</p>
                            </div>
                            <div class="locationRight">
                                <p><b>Condition:</b> 
                                    ${data.current.condition.text} 
                                    <img src="${data.current.condition.icon}" alt="cond">
                                </p>
                                <p><b>Temperature (F&deg;):</b> 
                                    ${data.current.temp_f}&deg; but feels like ${data.current.feelslike_f}&deg;
                                </p>
                                <p><b>Temperature (C&deg;):</b> 
                                    ${data.current.temp_c}&deg; but feels like ${data.current.feelslike_c}&deg;
                                </p>
                            </div>
                        </div>
                    </div>
                `)
                if(forecast != 0) {
                    let days = data.forecast.forecastday
                    $(".results").append(`
                        <div class="forecast">
                            <h2>Forecast</h2>
                            <div class="forecastList"></div>
                        </div>
                    `)
                    $.each(days, (idx, day) => {
                        $(".forecastList").append(`
                            <div class="forecastDay">
                                <h3>${day.date} | ${day.day.condition.text}</h3>
                                <div class="forecastInfo">
                                    <div>
                                        <p>
                                            <img src="${day.day.condition.icon}" alt="condition"
                                        </p>
                                        <p><b>Max Temps:</b> ${day.day.maxtemp_f}&deg;F & ${day.day.maxtemp_c}&deg;C</p>
                                        <p><b>Min Temps:</b> ${day.day.mintemp_f}&deg;F & ${day.day.mintemp_c}&deg;C</p>
                                        <p><b>Avg Temps:</b> ${day.day.avgtemp_f}&deg;F & ${day.day.avgtemp_c}&deg;C</p>
                                        <p><b>Max Wind Speed:</b> ${day.day.maxwind_mph}MPH & ${day.day.maxwind_kph}KPH</p>
                                    </div>
                                    <div>
                                        
                                        <p><b>Chance of Rain:</b> ${day.day.daily_chance_of_rain}%</p>
                                        <p><b>Chance of Snow:</b> ${day.day.daily_chance_of_snow}%</p>
                                        <p><b>Sunrise:</b> ${day.astro.sunrise}</p>
                                        <p><b>Sunset:</b> ${day.astro.sunset}</p>
                                    </div>
                                </div>
                            </div>
                        `)
                    })
                }
            }).fail(function(e) {
                console.log( "error", e );
            })
        }
    })
}
 
$(document).ready(function () {
    initListeners();
});