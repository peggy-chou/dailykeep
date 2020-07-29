<template>
  <div>
    <h1 class="title">Pomodoro Clock</h1>
    <div class="ctrl">
      <div class="ctrl-block">
        <p class="text">BREAK TIME</p>
        <div class="break">
          <div class="less" @click="changeTime('break', -1)">-</div>
          <div class="num">{{ breakLength }}</div>
          <div class="add" @click="changeTime('break', +1)">+</div>
        </div>
      </div>
      <div class="ctrl-block">
        <p class="text">WORK TIME</p>
        <div class="session">
          <div class="less" @click="changeTime('session', -1)">-</div>
          <div class="num">{{ sessionLength }}</div>
          <div class="add" @click="changeTime('session', 1)">+</div>
        </div>
      </div>
    </div>
    <div class="timer" @click="setTime" :class="{ break: sessionTime === 0 }">
      <div class="status">{{ status }}</div>
      <div class="time">{{ clock }}</div>
      <span class="fill" :style="{ height: fill }"></span>
      <span v-show="!timerStart" class="pause-bg">
        <div class="play-button"></div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      breakLength: 5,
      sessionLength: 25,
      breakTime: 300,
      sessionTime: 1500,
      timerStart: false,
      time: null   
    }
  },
  computed: {
    clock() {
      if (this.sessionTime > 0) {
        let min = ('0' + parseInt(this.sessionTime / 60, 10)).slice(-2);
        let sec = ('0' + this.sessionTime % 60).slice(-2);
        return `${min}:${sec}`;
      } else
      {
        let min = ('0' + parseInt(this.breakTime / 60, 10)).slice(-2);
        let sec = ('0' + this.breakTime % 60).slice(-2);
        return `${min}:${sec}`;
      }
    },
    status() {
      if (this.sessionTime > 0) {
        return 'Session';
      } else
      {
        return 'Break';
      }
    },
    fill() {
      if (this.sessionTime > 0) {
        let max = this.sessionLength * 60;

        return `${(1 - this.sessionTime / max) * 100}%`;
      } else
      {
        let max = this.breakLength * 60;

        return `${this.breakTime / max * 100}%`;
      }
    } 
  },
  methods: {
    changeTime(item, sec) {
      if (!this.timerStart) {
        if (item === 'break') {
          if (this.breakLength + sec > 0) {
            this.breakLength += sec;
          }
        } else
        if (item === 'session') {
          if (this.sessionLength + sec > 0) {
            this.sessionLength += sec;
          }
        }
        this.breakTime = this.breakLength * 60;
        this.sessionTime = this.sessionLength * 60;
      }
    },
    timer() {
      this.time = setInterval(() => {
        if (this.sessionTime > 0) {
          this.sessionTime--;
        } else
        {
          this.breakTime--;
        }
        if (this.sessionTime === 0 && this.breakTime === 0) {
          this.sessionTime = this.sessionLength * 60;
          this.breakTime = this.breakLength * 60;
        }
      }, 1000);
    },
    setTime() {
      if (this.timerStart) {
        clearInterval(this.time);
      } else
      {
        this.timer();
      }
      this.timerStart = !this.timerStart;
    } 
  } 
}
</script>

<style>
.title {
  font-size: 3em;
  margin: 0px auto 10px;
}

.ctrl {
  display: flex;
  margin: 0px 50px;
}
.ctrl .break, .ctrl .session {
  display: flex;
}
.ctrl .ctrl-block {
  margin: 0px 20px;
}
.ctrl .text {
  font-size: 1em;
  margin: 0;
}
.ctrl .break, .ctrl .session {
  display: flex;
  justify-content: center;
}
.ctrl .less, .ctrl .add, .ctrl .num {
  font-size: 2em;
  padding: 0px 5px;
}
.ctrl .less, .ctrl .add {
  cursor: pointer;
}
.ctrl .less:hover, .ctrl .add:hover {
  color: #FF6347;
}

.timer {
  width: 300px;
  height: 300px;
  margin: 20px 30px;
  position: relative;
  box-sizing: border-box;
  border-radius: 50%;
  border: 10px solid #FF6347;
  overflow: hidden;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.timer.break {
  border: 10px solid #9ACD32;
}
.timer.break span.fill {
  background-color: #9ACD32;
}
.timer:before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border: 7px solid #393E46;
}
.timer .status, .timer .time {
  font-size: 2.4em;
}
.timer span.fill {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
  height: 10%;
  background-color: #FF6347;
}
.timer span.pause-bg {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  height: 10%;
  background-color: #777777;
  opacity: 0.5;
  height: 100%;
}

.play-button{
  position: relative;
  left: 115px;
  top: 115px;
  margin: auto;
  box-sizing: border-box;
  z-index: 2;
  height: 74px;
  border-style: solid;
  border-width: 37px 0 37px 60px;
  border-color: transparent transparent transparent black;
}
</style>