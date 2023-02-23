const app = Vue.createApp({
    data() {
        return {
            message: '',
            g: '',
            sign: "",
            exponent: [],
            mantissa: [],
            x: [1, 2, 4, 8, 16, 32, 64, 128],
            s: '',
            e: '',
            m: '',

        }
    },
    methods: {
        created() {
            const apiKey = '7db9385a6f8942349c4ee7896211c51d';
            const url = `https://newsapi.org/v2/everything?q=Apple&from=2023-02-10&sortBy=popularity&apiKey=${apiKey}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.message = data.articles[0].title;
                    // console.log(this.items.articles[0].source.name);
                    this.g = data.articles[0].source.name
                });
        },
        convert() {

            //get -or+ from sign bit
            if (this.sign === 1) {
                this.s = "-"
            } else {
                this.s = "+"
            }

            //get exponent bais
            let arr1 = []
            for (let j = 0; j <= 8; j++) {

                if (this.exponent.length == j && this.exponent.length != 8) {

                    for (let i = 0; i < (8 - j); i++) {


                        arr1.push(0)

                    }

                }
            }
            let a1 = this.exponent.toString().split("").map(Number)
            let mergedArr1 = a1.concat(arr1)


            let c = 0
            let v = 7
            for (let i = 0; i < 8; i++) {
                if (mergedArr1[i] == 1) {
                    c += this.x[v]
                }
                v--
            }
            console.log(c)
            c = c - 127

            // convert mantisaa to decimal

            let arr2 = []
            for (let j = 0; j <= 23; j++) {

                if (this.mantissa.length == j && this.mantissa.length != 23) {

                    for (let i = 0; i < (23 - j); i++) {


                        arr2.push(0)

                    }

                }
                
            }
            let a2 = this.mantissa.toString().split("").map(Number)
            let mergedArr2 = a2.concat(arr2)
            console.log(mergedArr2)
            let s=1,ss=0
            for(let i=0;i<23;i++){
               ss+= mergedArr2[i]/(2**s)
               s++
            }
           console.log(ss)
        },




    }
})

app.mount("#app")