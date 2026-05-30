// // --- SNOW FALLING EFFECT
// window.onload = function () {
// 	var canvas = document.getElementById("canvas-2")
// 	var ctx = canvas.getContext("2d")

// 	var W = window.innerWidth
// 	var H = window.innerHeight
// 	canvas.width = W
// 	canvas.height = H

// 	var mp = 50 // number of particles
// 	var particles = []

// 	// Create particles and give them a random initial direction (dir)
// 	for (var i = 0; i < mp; i++) {
// 		particles.push({
// 			x: Math.random() * W, // random initial horizontal position
// 			y: Math.random() * H, // random initial vertical position
// 			r: Math.random() * 4 + 1, // random radius size
// 			d: Math.random() * mp, // random dispersion
// 			dir: (Math.random() - 0.5) * 2 // random direction, -1 or 1
// 		})
// 	}

// 	var angle = 0
// 	var mouseX = W / 2 // Default mouseX position

// 	// Listen for mouse movement to track the mouseX position
// 	document.addEventListener("mousemove", (e) => {
// 		mouseX = e.clientX
// 	})

// 	function draw() {
// 		ctx.clearRect(0, 0, W, H)
// 		ctx.fillStyle = "rgba(255, 255, 255, 1)" // Snowflake color
// 		ctx.beginPath()

// 		// Draw each snowflake (particle)
// 		for (var i = 0; i < mp; i++) {
// 			var p = particles[i]
// 			ctx.moveTo(p.x, p.y)
// 			ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true)
// 		}
// 		ctx.fill()

// 		update()
// 	}

// 	function update() {
// 		angle += 0.01 // Change angle for vertical movement
// 		for (var i = 0; i < mp; i++) {
// 			var p = particles[i]

// 			// Horizontal movement influenced by mouse position
// 			var dir = (mouseX - p.x) * 0.002 + p.dir * 0.2 // p.dir is the random direction of the snowflake
// 			p.x += dir

// 			// Vertical movement (falling effect)
// 			p.y += Math.cos(angle + p.d) + 1 + p.r / 2

// 			// Reset particles when they move off-screen
// 			if (p.x > W + 5 || p.x < -5 || p.y > H) {
// 				if (i % 3 > 0) {
// 					particles[i] = {
// 						x: Math.random() * W,
// 						y: -10,
// 						r: p.r,
// 						d: p.d,
// 						dir: (Math.random() - 0.5) * 2
// 					} // Reset with new direction
// 				} else {
// 					if (dir > 0) {
// 						particles[i] = {
// 							x: -5,
// 							y: Math.random() * H,
// 							r: p.r,
// 							d: p.d,
// 							dir: (Math.random() - 0.5) * 2
// 						} // New direction when resetting
// 					} else {
// 						particles[i] = {
// 							x: W + 5,
// 							y: Math.random() * H,
// 							r: p.r,
// 							d: p.d,
// 							dir: (Math.random() - 0.5) * 2
// 						} // New direction when resetting
// 					}
// 				}
// 			}
// 		}
// 	}

// 	// Start the animation loop
// 	setInterval(draw, snowSpeed) // Redraw every 33ms
// }
