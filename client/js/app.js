Vue.component("card-dialog", {
      template: "#modal-dialog",
      data: function () {
        return {
            result: '',
            errors: false,
            cardNumber: '',
            exp1: '',
            exp2: '',
            cvv: ''
        }
      },
      methods: {
        creditCardValidation: function() {
          var cardCode = this.cardNumber.replace(/[^\d]/g, '').substring(0,16);
          cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
          this.cardNumber = cardCode;
        },

        expValidation: function(e) {
          e = e || window.event;
          var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
          var charStr = String.fromCharCode(charCode);
          if (/[^0-9.]/g.test(charStr)) {
             e.preventDefault();
              return false;
          }
        },

        accept: function() {
          var m_reg = "^(0?[1-9]|1[012])$";
          if(!this.exp1.match(m_reg) || this.exp2 > 21 || this.exp2 < 16) {
            this.errors = true;
            return;
          }

          if(this.cardNumber.length !== 19 || this.exp1.length !== 2 ||
            this.exp2.length !== 2 || this.cvv.length !== 3) {
              this.errors = true;  

          } else {
              this.errors = false;

              this.result = {
                cardNumber: this.cardNumber,
                exp1: this.exp1,
                exp2: this.exp2,
                cvv: this.cvv
              }
              this.$emit('close');
              this.$emit('credit-card', this.result);

          }
        }
      } 
});

Vue.component("atm", {
    template: "#atm",
    props: ['card', 'creditCard'],
    data: function() {
      return {
        cardInjected: false,
        cardScanning: false,
        cardScanningError: false,
        dbConnected: false,
        pin: '',
        secret: false,
        pinCorrect: false,
        loading: false,
        screen: {
          second: false,   // greeting
          third: false,    // pin number
          fourth: false,   // pin check
          fifth: false,    // dev
          sixth: false,    // balance main
          seventh: false,  // balance screen
          eighth: false,   // balance check
        },
        person: []
      }
    },
    watch: {
      card: function() {
        if(this.card == true) {
           this.checkCard(); 
         }
      }
    },
    methods: {
        insertCardTime: function() {
            this.cardInjected = true;
            this.cardScanning = true;
        },

        removeCardTime: function() {
            this.cardInjected = this.cardScanning= this.cardScanningError = 
            this.dbConnected= this.screen.second = this.screen.third =
            this.screen.fourth = this.secret = this.screen.fifth = 
            this.screen.sixth = this.screen.seventh = this.screen.eighth = false;
            this.pin = '';
        },

        checkDBConnect : function() {
              Vue.http.options.emulateJSON = true;
              this.$http.post('http://mayst.paypress.pro/back/requests/insert_card.php', this.creditCard).then((response) => {
                this.person = JSON.parse(response.body);
                this.cardScanning = false;
                this.dbConnected = this.screen.second = true;

              }, (error) => {
                  this.cardScanning = false;
                  this.cardScanningError = true;
              });
        },

        checkCard: function() {
             setTimeout(this.insertCardTime, 2000);
             setTimeout(this.checkDBConnect, 4000);
        },

        pinTime: function(pinCorrect) {
          this.loading = false;
          this.screen.third = false;
          this.screen.fourth = true;
          this.pinCorrect = pinCorrect;
        },

        balanceOnCheck: function() {
          this.loading = false; // in ajax in future
          this.$http.post('/some').then((response) => {
                    var result = JSON.parse(response.body);
                    //result = balance
                }, (error) => {
                    console.log(error);
                    this.cardScanning = false;
                    this.cardScanningError = true;
                });
        },

        balanceOnScreen: function() {
            this.loading = false; // in ajax in future
            this.$http.post('/some').then((response) => {
                    var result = JSON.parse(response.body);
                    //result = balance
                }, (error) => {
                    console.log(error);
                    this.cardScanning = false;
                    this.cardScanningError = true;
                });
        },
        // numeric buttons right events

        removeCard: function() {
          if(this.cardInjected == true) {
            this.$emit('remove-card');
            setTimeout(this.removeCardTime, 2000);
          }
        },


        correction: function() {
            if(this.screen.third == true) {
               this.pin = this.pin.substring(0, this.pin.length - 1)
            }
        },

        enter: function() {
            if(this.screen.third == true) {
              if(this.pin.length < 4) return;
               if(this.pin == "*852") {
                  this.screen.third = false;
                  this.screen.fourth = true;
                  this.pinCorrect = false;
                  this.$emit('secrt');
                  this.secret = true;
                  return;
               }

               this.loading = true;
               Vue.http.options.emulateJSON = true;
               this.$http.post('http://mayst.paypress.pro/back/requests/pin.php', {data: this.pin}).then((response) => {
                    var result = JSON.parse(response.body);
                    setTimeout(this.pinTime, 3000, result);
                }, (error) => {
                    console.log(error);
                    this.cardScanning = false;
                    this.cardScanningError = true;
                });
            }
        },

        // screen buttons control
        leftB1: function() {
          if(this.screen.fourth == true) {
            this.screen.fourth = false;
            this.screen.fifth = true;
          }
        },

        leftB2: function() {
          if(this.screen.fourth == true) {
            this.screen.fourth = false;
            this.screen.fifth = true;
          }
        },

        leftB3: function() {
          if(this.screen.fourth == true) {

            this.screen.fourth = false;
            this.screen.fifth = true;

          } else if (this.screen.fifth == true) {
            
            this.screen.fifth = false;
            this.screen.fourth = true;

          } else if (this.screen.sixth == true) {
            this.screen.sixth = false;
            this.screen.fourth = true;
          } else if(this.screen.seventh == true) {
            this.screen.seventh = false;
            this.loading = false;
            this.screen.third = true;
            this.pin = '';
          } else if(this.screen.eighth == true) {
              this.$emit('remove-card');
              setTimeout(this.removeCardTime, 2000);
          }
        },

        leftB4: function() {

          if(this.screen.fourth == true) {
            this.screen.fourth = false;
            this.screen.fifth = true;
          }

        },

        rightB1: function() {
          if(this.screen.fourth == true) {
            this.screen.fourth = false;
            this.screen.sixth = true;
          }
        },

        rightB2: function() {
          if(this.screen.sixth == true) {
            this.screen.sixth = false;
            this.screen.seventh = true;
            this.loading = true;
            setTimeout(this.balanceOnScreen, 3000);
          }
        },
        rightB3: function() {
          if(this.screen.second == true) {
            this.screen.second = false;
            this.screen.third = true;
          }

          if(this.screen.sixth == true) {
            this.screen.sixth = false;
            this.screen.eighth = true;
            this.loading = true;
            setTimeout(this.balanceOnCheck, 3000);
          } else if(this.screen.eighth == true) {
            this.screen.eighth = false;
            this.screen.third = true;
            this.pin = '';
          }
        },

        rightB4: function() {
            if(this.screen.eighth == true) {
              this.$emit('remove-card');
              setTimeout(this.removeCardTime, 2000);
            }
        },

        // numeric buttons control
        b0: function() {
          if(this.screen.third == true) {
            this.pin.length < 4 ? this.pin += '0' : {};
          }
        },

        b1: function() {
          if(this.screen.third == true) {
            this.pin.length < 4 ? this.pin += '1' : {};
          }
        },

        b2: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '2' : {};
            }
        },
        b3: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '3' : {};
          }
        },
        b4: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '4' : {};
            }
        },
        b5: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '5' : {};
            }
        },
        b6: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '6' : {};
            }
        },
        b7: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '7' : {};
          }
        },
        b8: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '8' : {};
          }
        },
        b9: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '9' : {};
          }
        },
        b_left: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '*' : {};
          }
        },
        b_right: function() {
            if(this.screen.third == true) {
              this.pin.length < 4 ? this.pin += '#' : {};
          }
        }
    }
});

Vue.filter('mask', function (value) {
  if(value == undefined) return;
  return value = '*';
})

var container = new Vue ({
      el: ".container",
      data: {
        showModal: false,
        card: false,
        cardCounter: false,
        adm: false,
        secret: false,
        result: ''
      },
      methods: {
        handleResult: function(result) {
            this.result = result;     
        },

        insertCard: function() {
            this.card = true;
            this.cardCounter = true;
        },

        removeCard: function() {
            this.card = false;
        },
        
        adminConsole: function() {
            this.adm = true;
        },

        secrtOn: function() {
          this.secret = !this.secret;
        }
      }
});


