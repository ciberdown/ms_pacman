class Ghost {
  constructor(ghost_id) {
    this.ghost_id = ghost_id;
    this.my_ghost = document.getElementById(ghost_id);
    this.directions = ["right", "left", "top", "down"];
    this.map = map;
    this.game_failed = false;
  }
  get_top() {
    return this.my_ghost.getBoundingClientRect().top;
  }
  get_left() {
    return this.my_ghost.getBoundingClientRect().left;
  }
  move(dir) {
    if (this.collision(dir)) {
      return "wall";
    } else {
      switch (dir) {
        case "top":
          this.my_ghost.style.top = this.get_top() - 20 + "px";
          break;
        case "down":
          this.my_ghost.style.top = this.get_top() + 20 + "px";
          break;
        case "right":
          this.my_ghost.style.left = this.get_left() + 20 + "px";
          break;
        case "left":
          this.my_ghost.style.left = this.get_left() - 20 + "px";
          break;
      }
    }
  }
  get_ghost_pos() {
    const x_pos = this.get_left() / 20;
    const y_pos = this.get_top() / 20;
    return [x_pos, y_pos];
  }
  get_pacman_pos() {
    const pac_man = document.getElementById("pac_man");
    const x_pos = pac_man.getBoundingClientRect().left / 20;
    const y_pos = pac_man.getBoundingClientRect().top / 20;
    return [x_pos, y_pos];
  }
  collision(dir) {
    const x_pos = this.get_left() / 20;
    const y_pos = this.get_top() / 20;
    if (dir === undefined) {
      return true;
    }
    let num = -1;
    switch (dir) {
      case "top":
        num = map[y_pos - 1][x_pos];
        break;
      case "down":
        num = map[y_pos + 1][x_pos];
        break;
      case "left":
        num = map[y_pos][x_pos - 1];
        break;
      case "right":
        num = map[y_pos][x_pos + 1];
        break;
    }
    if (
      num === 1 ||
      x_pos < 0 ||
      y_pos < 0 ||
      x_pos > map[0].length - 1 ||
      y_pos > map.length
    ) {
      return true;
    } else {
      return false;
    }
  }
  move_rnd_ghost() {
    let rnd = Math.floor(Math.random() * this.directions.length);
    const check_game_failer = setInterval(() => {
      if (
        this.get_pacman_pos()[0] === this.get_ghost_pos()[0] &&
        this.get_pacman_pos()[1] === this.get_ghost_pos()[1]
      ) {
        clearInterval(ghosts_move_interval);
        clearInterval(check_game_failer);
        this.game_failed = true;
        document.getElementById("fail_alert").style.visibility = "visible";
      }
    }, 100);
    const ghosts_move_interval = setInterval(() => {
      if (this.move(this.directions[rnd]) === "wall") {
        rnd = Math.floor(Math.random() * this.directions.length);
      }
    }, 500);
  }
}
