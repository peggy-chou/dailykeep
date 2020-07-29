<template>
  <div id="weather" class="card">
    <div v-if="location!==''">
      <div class="temp">
        <div class="temp-now">{{ temp.current }} °C</div>
        <div class="temp-limits">
          <div>{{ temp.min }} °C - {{ temp.max }} °C</div>
        </div>
      </div>
      <div class="weather-icon">
        <svg-icon :icon-class="fillWeather(weather)"></svg-icon>
      </div>
      <div class="location text-uppercase">{{ location }}, {{ country }}</div>
      <!-- <div>{{ weather }}</div> -->
      <div>{{ currentDate.week }}</div>
      <div class="humidity"><i class="fa fa-fw fa-tint"></i>Humidity: {{ humi }} %</div>
      <div class="bar-time">
        <div class="point point-left"></div>
        <div class="point point-current" :style="{ right: currentDate.per }"></div>
        <div class="point point-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
const DAY_LIST = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

export default {
  data() {
    return{
      location: '',
      country: '',
      weather: '',
      humi: 0, 
      currentDate: {},
      temp: {}
    }
  },
  created() {
    this.getDate()
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`) // Free Code Camp Weather API Pass-through
          .then((response) => {
            return response.text()
          }).then((data) => {
            data = JSON.parse(data)
            let sun = {
              rise: data.sys.sunrise,
              set: data.sys.sunset,
              now: data.dt
            }
            this.currentDate.date = Date.now()
            this.currentDate.per = `${this.fill(sun.rise, sun.set, sun.now)*100 + 30}px`
            
            this.location = data.name
            this.country = data.sys.country
            this.weather = data.weather[0].main
            this.temp = {
              current: parseInt(data.main.temp, 10),
              max: parseInt(data.main.temp_max, 10),
              min: parseInt(data.main.temp_min, 10)
            }
            this.humi = data.main.humidity
          })
      })
    } else { 
      console.err('Geolocation is not supported by this browser.')
    }
  },
  methods: {
    getDate() {
      let today = new Date()
      this.currentDate = {
        date: today,
        week: DAY_LIST[today.getDay()],
      }
    },
    fill(start, end, now) {
      if(start>0 && end>0) {
        return (now - start) / (end - start)
      } else {
        return 0
      }
    } ,
    fillWeather(weather) {
      switch (weather) {
        case 'Clouds':
          return 'cloudy'
          break;
        default:
          return 'day'
          break;
      }
    }
  }
}
</script>

<style>
.card {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  min-width: 400px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.location {
  font-size: 1.5em;
}
.temp-now {
  font-size: 3.5em;
}
.temp-limits {
  display: inline-flex;
}
.temp-limits .temp-max {
  margin-right: 1.2em;
}
.temp-limits .temp-max,
.temp-limits .temp-min {
  font-size: 1em;
}

.bar-time {
  margin: 25px 10px;
  box-sizing: border-box;
  border: 5px solid #FF6347;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.bar-time div.point {
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 10;
  box-sizing: border-box;
  border: 4px solid;
  border-radius: 50%;
}
.bar-time div.point-left {
  left: 30px;
  border-color: #f8b862;
  background-color: #ec6800;
}
.bar-time div.point-current {
  border-color: #ffffff;
  background-color: #ea5506;
  box-shadow: 2px 2px 10px #aaaaaa;
}
.bar-time div.point-right {
  right: 30px;
  border-color: #507ea4;
  background-color: #192f60;
}
</style>