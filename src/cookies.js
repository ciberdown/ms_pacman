var cookies_color = "green";
var scores = 0;
const add_score = () => {
  scores += 10;
  document.getElementById("score").innerHTML = scores + 0.2 * scores;
  scores%100 === 0 && make_new_cookies(25);
};
const cookie_size = box_size / (lines_thickness * 2);
const cookie_offset = box_size - cookie_size;
const new_cookie = (i, j) => {
  if (i > 0 && j > 0 && map[i][j] !== 1 && map[i][j] !== 5) {
    //if its not a wall or cookie
    map[i][j] = 5;
    canvas.fillStyle = cookies_color;
    canvas.fillRect(
      j * box_size + cookie_offset / 2,
      i * box_size + cookie_offset / 2,
      cookie_size,
      cookie_size
    );
  }
};

const clear_cookie = (i, j) => {
  if (i > 0 && j > 0 && map[i][j] === 5) {
    map[i][j] = 0;
    canvas.clearRect(
      //clear cookie
      j * box_size + cookie_offset / 2,
      i * box_size + cookie_offset / 2,
      cookie_size,
      cookie_size
    );
    add_score();
  }
};

const make_new_cookies = (number) => {
  for (let i = 0; i < number; i++) {
    const i_rnd = Math.floor(Math.random() * map.length);
    const j_rnd = Math.floor(Math.random() * map[0].length);
    new_cookie(i_rnd, j_rnd);
  }
};
