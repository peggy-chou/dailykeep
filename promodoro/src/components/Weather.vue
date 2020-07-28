<template>
  <div id="weather">
    <div class="card">
      <div class="location">{{ location }}, {{ country }}</div>
      <div class="temp">
        <div class="temp-now">{{ temp }} °C</div>
        <div class="temp-limits">
          <div class="temp-max"><i class="fa fa-fw fa-arrow-up"></i>{{ tempMax }} °C</div>
          <div class="temp-min"><i class="fa fa-fw fa-arrow-down"></i>{{ tempMin }} °C</div>
        </div>
      </div>
      <div class="humidity"><i class="fa fa-fw fa-tint"></i>{{ humi }} %</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      location: 'Taichung',
      country: 'TW',
      temp: 26,
      tempMax: 26,
      tempMin: 26,
      humi: 20, 
    }
  },
   mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var my = this

        fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
          .then((response) => {
            return response.text()
          }).then((data) => {
            data = JSON.parse(data)
            my.location = data.name
            my.country = data.sys.country
            my.temp = data.main.temp
            my.humi = data.main.humidity
          })
      })
    } else { 
      console.err('Geolocation is not supported by this browser.')
    }
  },
  methods: {
    plus() {
      this.a++
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
  width: 400px;
  height: 300px;
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
  margin: 0.5em auto;
}
.temp-limits {
  display: flex;
}
.temp-limits .temp-max {
  margin-right: 1.2em;
}
.temp-limits .temp-max,
.temp-limits .temp-min {
  font-size: 1em;
}
</style>