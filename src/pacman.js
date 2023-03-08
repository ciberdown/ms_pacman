const game = document.getElementById("game");
let current_direction = "right";
const animation_direction = (new_dir) => {
  switch (new_dir) {
    case "left":
      pac_man.style.transform = "scaleX(-1)";
      break;
    case "right":
      pac_man.style.transform = "scaleX(1)";
      break;
  }
};
const pac_man = document.getElementById("pac_man");
const time_rate = 2;
// const pacman_interval = setInterval(()=>{
//   x = parseInt(getComputedStyle(pac_man).left);
//   pac_man.style.left = x+20+"px";
// },time_rate * 1000);

const collision = (x, y) => {
  if (y > map.length - 1 || x > map[0].length - 1 || x < 0 || y < 0) {
    return true;
  } else if (map[y][x] === 1) {
    return true;
  } else {
    return false;
  }
};
const check_collision = (x, y, direction) => {
  switch (direction) {
    case "right":
      return collision(x + 1, y);
    case "left":
      return collision(x - 1, y);
    case "up":
      return collision(x, y - 1);
    case "down":
      return collision(x, y + 1);
  }
};

const move = (direction) => {
  let pos = pac_man.getBoundingClientRect();
  let x_pos = pos.right / box_size - 1;
  let y_pos = pos.top / box_size;
  if (x_pos === 0 && y_pos === 10 && direction === "left") {
    //left gate
    animation_direction(direction);
    current_direction = direction;
    x = parseInt(getComputedStyle(pac_man).left);
    pac_man.style.left = box_size * (map[0].length - 1) + "px";
  } else if (
    x_pos === map[0].length - 1 &&
    y_pos === 10 &&
    direction === "right"
  ) {
    //right gate
    animation_direction(direction);
    current_direction = direction;
    x = parseInt(getComputedStyle(pac_man).left);
    pac_man.style.left = 0 + "px";
  } else if (!check_collision(x_pos, y_pos, direction)) {
    animation_direction(direction);
    current_direction = direction;
    switch (direction) {
      case "right":
        x = parseInt(getComputedStyle(pac_man).left);
        pac_man.style.left = x + box_size + "px";
        break;
      case "left":
        x = parseInt(getComputedStyle(pac_man).left);
        pac_man.style.left = x - box_size + "px";
        break;
      case "up":
        y = parseInt(getComputedStyle(pac_man).top);
        pac_man.style.top = y - box_size + "px";
        break;
      case "down":
        y = parseInt(getComputedStyle(pac_man).top);
        pac_man.style.top = y + box_size + "px";
        break;
    }
  }
  pos = pac_man.getBoundingClientRect();
  x_pos = pos.right / box_size - 1;
  y_pos = pos.top / box_size;
  clear_cookie( y_pos, x_pos)//at last 
};
game.addEventListener("keydown", (e) => {
  e.key === "d" && move("right");
  e.key === "a" && move("left");
  e.key === "s" && move("down");
  e.key === "w" && move("up");
});
