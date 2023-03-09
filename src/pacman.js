class Ms_pacman {
  constructor(map, clear_cookie, this_cookies) {
    this.game = document.getElementById("game");
    this.current_direction = "right";
    this.pac_man = document.getElementById("pac_man");
    this.time_rate = 2;
    this.map = my_map.get_map();
    this.box_size = 20;
    this.map = map;
    this.clear_cookie = clear_cookie;
    this.this_cookies = this_cookies;

    //run at first
    this.game.addEventListener("keydown", (e) => {
      e.key === "d" && this.move("right");
      e.key === "a" && this.move("left");
      e.key === "s" && this.move("down");
      e.key === "w" && this.move("up");
    });
  }
  animation_direction(new_dir) {
    switch (new_dir) {
      case "left":
        pac_man.style.transform = "scaleX(-1)";
        break;
      case "right":
        pac_man.style.transform = "scaleX(1)";
        break;
    }
  }
  collision(x, y) {
    if (y > this.map.length - 1 || x > this.map[0].length - 1 || x < 0 || y < 0) {
      return true;
    } else if (this.map[y][x] === 1) {
      return true;
    } else {
      return false;
    }
  }
  check_collision(x, y, direction) {
    switch (direction) {
      case "right":
        return this.collision(x + 1, y);
      case "left":
        return this.collision(x - 1, y);
      case "up":
        return this.collision(x, y - 1);
      case "down":
        return this.collision(x, y + 1);
    }
  }
  move(direction) {
    let pos = this.pac_man.getBoundingClientRect();
    let x_pos = pos.left / this.box_size;
    let y_pos = pos.top / this.box_size;
    let x, y;
    if (x_pos === 0 && y_pos === 10 && direction === "left") {
      //left gate
      this.animation_direction(direction);
      this.current_direction = direction;
      this.pac_man.style.left = this.box_size * (this.map[0].length - 1) + "px";
    } else if (
      x_pos === this.map[0].length - 1 &&
      y_pos === 10 &&
      direction === "right"
    ) {
      //right gate
      this.animation_direction(direction);
      this.current_direction = direction;
      this.pac_man.style.left = 0 + "px";
    } else if (!this.check_collision(x_pos, y_pos, direction)) {
      this.animation_direction(direction);
      this.current_direction = direction;
      switch (direction) {
        case "right":
          x = parseInt(getComputedStyle(this.pac_man).left);
          this.pac_man.style.left = x + this.box_size + "px";
          break;
        case "left":
          x = parseInt(getComputedStyle(this.pac_man).left);
          this.pac_man.style.left = x - this.box_size + "px";
          break;
        case "up":
          y = parseInt(getComputedStyle(this.pac_man).top);
          this.pac_man.style.top = y - this.box_size + "px";
          break;
        case "down":
          y = parseInt(getComputedStyle(this.pac_man).top);
          this.pac_man.style.top = y + this.box_size + "px";
          break;
      }
    }
    pos = pac_man.getBoundingClientRect();
    x_pos = pos.right / this.box_size - 1;
    y_pos = pos.top / this.box_size;
    this.clear_cookie(y_pos, x_pos, this.this_cookies); //at last
  }
}