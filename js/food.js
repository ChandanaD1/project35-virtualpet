class Food {
    constructor() {
        this.foodstock = 0
        this.lastFed = 0
        this.milkimg = loadImage("images/milk.png")
    }
    
    getFoodStock() {
        database.ref("foods").on("value",data => {this.foodStock = data.val()})
    }

    updateFoodStock(x) {
        database.ref("/").update({foods:x})
    }

    deductFood(y) {
        return y-1
    }

    display() {
        var x = 70, y = 100;
        for( var i = 0; i < foods; i++) {
            if(i%10 == 0) {
                x = 70
                y = y + 50
            }
            image(this.milkimg,x,y,50,50)
            x = x+30
        }
    }
}