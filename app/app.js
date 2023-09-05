const baseurl = `https://api.weatherapi.com/v1/forecast.json?key=`
const apikey = `a961547e3e7244c7a48204815232808`

function getData() {
    $.getJSON(`./data/data.json`, (data) => {
        console.log("data ", data.STUDENTS)
        let students = data.STUDENTS
        $.each(students, (idx, student) => {
            console.log(`index: ${idx} student: ${student.firstName}`)
            $(".students").append(`
                <div class="student">
                    <p>${student.firstName} ${student.lastName}</p>
                    <p>${student.address}</p>
                    <p>${student.phone}</p>
                    <p>${student.email}</p>
                    <div class="courses"></div>
                </div>
            `)
            $.each(student.classes, (idx, course) => {
                $(".courses").append(`
                    <p>${course.classNumber}</p>
                `)
            })
        })
    }).fail(function(e) {
        console.log( "error", e );
    })
}

function initListeners() {
    $("#submit").on("click", (e) => {
        $(".results").html("")
        e.preventDefault()
        let city = $("#city").val()
        let zip = $("#zip").val()
        let forecast = $("#forecast").val()

        if(forecast < 0 || forecast > 10) {
            $(".error").html("Please input a forecast day from 1 to 10")
            console.log("Must input a forecast day from 1 to 10")
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
                        $(".forecast").append(`
                            <div class="forecastDay">
                                <p><b>Date:</b> ${day.date}</p>
                                <p><b>Max Temps:</b> ${day.day.maxtemp_f}&deg;F & ${day.day.maxtemp_c}&deg;C</p>
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
            // console.log(zipURL)
        }
    })
}
 
$(document).ready(function () {
    initListeners();
});