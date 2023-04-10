window.onload = function(e) {

new Vue({
    template:`<div id="app">
    <h1>Welcome to Diwen's Idle Game!</h1>

    <h2>Day {{day}}</h2>
    <h2>{{luckLevel}}-Level Luck</h2>

    <table class="center">

    <tr class="currency">
    <td>Money🤑:</td>
    <td>{{money.toFixed(2)}}</td>
    </tr>

    <tr class="currency">
    <td>Star⭐️:</td>
    <td>{{star}}</td>
    </tr>

    <tr class="currency">
    <td>Luck🍀:</td>
    <td>{{luck}}</td>
    </tr>

    <tr class="currency">
    <td>Dirt😩:</td>
    <td>{{dirt}}</td>
    </tr>

    <tr class="currency">
    <td>Cleaner😀:</td>
    <td>{{clean}}</td>
    </tr>

    <tr class="currency">
    <td>Rose🌹:</td>
    <td>{{rose}}</td>
    </tr>

    </table>

    <div id="outer">
    <button class="inner1" @click="buyStar">Buy Stars</button>
    <button class="inner1" @click="buyLuck" :disabled="n>=1">Buy Luck</button>
    <button class="inner1" @click="buyCleaner">Buy Cleaner</button>
    <button class="inner1" @click="buyRose">Buy Rose</button>
    </div>

    <div id="outer">
    <button class="inner2" @click="tryLuckMoney" >Try Luck Money</button>
    <button class="inner2" @click="tryLuckRose" v-if="luckLevel>2">Try Luck Rose</button>
    </div>

    <div id="event-log" class="center">
        <div v-for="event in eventsToDisplay" >
        {{event}}
        </div>
    </div>

    </div>`,

    computed:{
        eventsToDisplay(){
            return this.events.slice().reverse()
        },

        luckLevel(){
            return Math.floor(Math.log2(this.luck + 1))
        }
    },

    watch:{
        luckLevel(){
            this.events.push(`Luck level changes, now level ${this.luckLevel}`)
        },

        money(){
            if (this.money < 5 && this.luck >=0.1){
                this.money += 10
                this.luck = (this.luck - 1).toFixed(2)
                this.events.push(`You get 10 dollars for free!`)
            }
        },

        dirt(){
            if(this.clean < this.dirt){
                this.money = 100
                this.luck = 0
                this.rose = 0
                this.dirt = 0
                this.star = 0
                this.n = 0
                this.events.push(`Ops, you failed to clean dirt, must reset now.`)
            }
            else if (this.clean > 0){
                this.clean -= this.dirt
                this.dirt = 0
                this.events.push(`You just cleaned a dirt!`)
            }
        }
    },

    methods:{
        getFreeRose(){
            this.rose += 1
            this.events.push(`Congrats, you get one free 🌹!!!`)
        },
        buyStar(){
            let price = 10
            let quant = 1

            if(this.money >= price){
                output = `You buy ${quant} ⭐️ for $${price}!`
                this.events.push(output)

                this.money -= price
                this.star += quant
            }
            else{
                this.events.push(`Sorry, you cannot afford it.`)
            }
        },

        buyLuck(){
            const MAX_PRICE = 10
            let priceluck = Math.floor(MAX_PRICE*Math.random()+1)

            let luckquant = (this.money/priceluck).toFixed(2)
            this.luck += luckquant
            this.events.push(`You bought ${luckquant} shares of luck for $${this.money}. You can only buy luck once!!!`)
            this.money = 0
            this.n+=1
        },

        buyCleaner(){
            let priceClean = 100
            if(this.money >= priceClean){
                this.events.push(`You buy 1 cleaner for $${priceClean}!`)
                this.clean += 1
                this.money -= 100
            }
            else{
                this.events.push(`You cannot afford it.`)
            }
        },

        buyRose(){
            let pricerose = 20
            let quantrose = 1

            if(this.money >= pricerose){
                ot = `You buy ${quantrose} 🌹 for $${pricerose}!`
                this.events.push(ot)

                this.money -= pricerose
                this.rose += quantrose
            }
            else{
                this.events.push(`Sorry, you cannot afford it.`)
            }
        },

        tryLuckMoney(){
            if(this.luck < 1){
                this.events.push(`Sorry, not enough luck to try lottery!`)
            }
            else{
            const upperbound = 20
            let number = this.luck*Math.random()
            this.luck -= 1
            if(upperbound < number) {
                this.money += 200
                this.events.push(`You tried one share of luck and got $200!!!`)
            }
            else{
                this.events.push(`You tried one share of luck but got nothing.`)
            }
        }
        },

        tryLuckRose(){
            const upper = 25
            let num = this.luck*Math.random()
            this.luck -= 2
            if(upper < num) {
                this.rose += 5
                this.events.push(`You tried 2 shares of luck and got 🌹🌹🌹🌹🌹!!!`)
            }
            else{
                this.events.push(`You tried 2 shares of luck but got nothing.`)
            }
        }
    },

    mounted(){
        setInterval(()=>{
            this.day++

            this.money = this.money + (this.star/10)

            if(this.luckLevel>0){
                if (Math.random() < this.luckLevel/100){
                    this.rose += 1
                    this.events.push(`You got one free 🌹!!!`)
                }
            }

            if(Math.random()<.1){
                this.dirt+=1
                this.events.push(`Ops, you got one dirt :(`)
            }
    },1000)
    },

    data(){
        return{
            money:100,
            day:0,
            luck:0,
            n:0,
            star:0,
            rose:0,
            clean:0,
            dirt:0,

            events:["The Idle Game Begins!!!"]
        }
    },

    el:"#app"
})
}