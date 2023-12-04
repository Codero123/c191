var check = true

AFRAME.registerComponent("player-movement", {
    init: function () {
      this.walk();
      setInterval(this.gameOver,60000);
    },
    walk: function () {
      var scoreVar = 0
      var ball = document.getElementById("ball");
      var pos = ball.getAttribute("position");

      window.addEventListener("keydown", (e) => {
        if (e.key == "z") {
          ball.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z-0.5});
          this.checkObstacleTouch();
          var gameOver = document.getElementById("gameOver");
          gameOver.setAttribute("visible", false)
        }
        else if (e.key == "x") {
          ball.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z+0.5});
          this.checkObstacleTouch();
        }
        else if (e.key == "c") {
          ball.setAttribute("position", {x: pos.x-0.5, y: pos.y, z: pos.z});
        }
        else if (e.key == "v") {
          ball.setAttribute("position", {x: pos.x+0.5, y: pos.y, z: pos.z});
        }
        else if (e.key == "q") {
          if (document.getElementById("obstacle")) {
            document.getElementById("obstacle").remove();
            var randNumb = Math.random()*-10;
            this.spawnObstacle(randNumb);
          }
          else {
            this.spawnObstacle(-10);
          }
        }

        if (ball.getAttribute("position").z <= -15 && ball.getAttribute("position").x >= -5.5 && ball.getAttribute("position").x <= 5.5) {
          scoreVar += 1;
          var score = document.getElementById("score");
          score.setAttribute("text", "font: mozillavr; width:10; height: 5; value: " + scoreVar)

          ball.setAttribute("position", {x: -0.3, y: 0, z: -2});
          this.spawnObstacle(-10);
        }
      });
    },
    spawnObstacle: function(zValue) {
      if (document.getElementById("obstacle")) {
        document.getElementById("obstacle").remove();
      }
      var obstacle = document.createElement("a-box");

      obstacle.setAttribute("id", "obstacle");
      obstacle.setAttribute("position", {x: 0, y: 0, z: zValue});
      obstacle.setAttribute("scale", {x: 10, y: 1.5, z: 1});
      obstacle.setAttribute("color", "#ff0000");

      var scene = document.querySelector("a-scene");
      scene.appendChild(obstacle);
    },
    checkObstacleTouch: function() {
      if (document.getElementById("obstacle")) {
        var ball = document.getElementById("ball");
        var obstacle = document.getElementById("obstacle");

        if (ball.getAttribute("position").z == obstacle.getAttribute("position").z) {
          scoreVar = 0
          var score = document.getElementById("score");
          score.setAttribute("text", "font: mozillavr; width:10; height: 5; value: " + scoreVar)

          ball.setAttribute("position", {x: -0.3, y: 0, z: -2});
          if (document.getElementById("obstacle")) {
            document.getElementById("obstacle").remove();
          }
        }
      }
    },
    gameOver: function() {
      var gameOver = document.getElementById("gameOver");
      gameOver.setAttribute("visible", "true")
      document.getElementById("ball").remove();
    },
  });
  