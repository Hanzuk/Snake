class Snake {
   constructor() {
      this.posX = 300
      this.posY = 300
      this.xDir = 0
      this.yDir = 0
      this.snakeSize = 1
      this.body = []
   }

   direction(x, y) {
      let lastX = this.xDir
      let lastY = this.yDir
      this.xDir = x
      this.yDir = y
      //Moviéndose hacia arriba y queriendo ir hacia abajo.
      if(lastY == -1 && y == 1) {
         this.yDir = -1
      }
      //Moviéndose hacia la derecha y queriendo ir hacia la izquierda.
      if(lastX == 1 && x == -1) {
         this.xDir = 1
      }
      //Moviéndose hacia abajo y queriendo ir hacia arriba.
      if(lastY == 1 && y == -1) {
         this.yDir = 1
      }
      //Moviéndose hacia la izquierda y queriendo ir hacia la derecha.
      if(lastX == -1 && x == 1) {
         this.xDir = -1
      }
   }

   move() {
      if(this.body.length > 1) {
         //Mueve las coordenadas de derecha a izquierda.
         for(let i = 0; i < this.body.length - 1; i++) {
            this.body[i] = this.body[i + 1]
         }
      }
      //Agrega nueva posición al array. Ejm: Se agrega una coordenada 0,0 y abajo de actualiza a 0,20.
      //En otra vuelta toma la coordenada 0,20 si this.snakeSize no aumentó o la agrega si this.snakeSize
      //aumentó y luego se vuelve a actualizar.
      this.body[this.snakeSize - 1] = createVector(this.posX, this.posY)
      //Se actualiza la posición.
      this.posX += this.xDir * 20
      this.posY += this.yDir * 20
      //Restringe un valor entre un valor mínimo y máximo.
      this.posX = constrain(this.posX, 0, (width - 20))
      this.posY = constrain(this.posY, 0, (height - 20))
   }

   show() {
      fill(255)
      //Recorre y dibuja los cuadros (Cuerpo).
      for(let i = 0; i < this.body.length; i++) {
         if(i == this.body.length - 1) {
            fill('#ef233c')
         }
         rect(this.body[i].x, this.body[i].y, 20, 20)
      }
   }

   eatFood(pos) {
      //Calcula la distancia entre dos puntos. (La posición que viene o un cuadro más adelante con
      //la posición de la comida).
      let d = dist(this.posX, this.posY, pos.x, pos.y)
      if(d < 1) {
         this.snakeSize++
         return true
      } else {
         return false
      }
   }

   selfFood() {
      for(let i = 0; i < this.body.length - 1; i++) {
         let d = dist(this.posX, this.posY, this.body[i].x, this.body[i].y)
         if(d < 1) {
            noLoop()
            swal({
               title: "¡Has perdido!",
               text: "¿Quieres jugar de nuevo?",
               buttons: {
						cancel: {
							text: "No",
							value: null,
							visible: true,
							closeModal: true
						},
						confirm: {
							text: "Si",
							value: true,
							visible: true,
							closeModal: true
						}
					}
				}).then((ok) => {
					if(ok) {
						this.reset()
					}
				})
         }
      }
	}
	
	reset() {
		this.posX = 300
      this.posY = 300
      this.xDir = 0
      this.yDir = 0
      this.snakeSize = 1
		this.body = []
		loop()
	}
}