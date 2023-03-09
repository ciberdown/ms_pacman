class Cookies {
  constructor(cookies_color, my_map) {
    this._cookies_color = cookies_color;
    this.scores = 0;
    this.box_size = my_map.get_box_size();
    this._cookie_size = this.box_size / (my_map.get_lines_thickness() * 2);
    this._cookie_offset = this.box_size - this._cookie_size;
    this.map = my_map.get_map();
  }
  get_this(){
    return this;
  }
  get_cookies_color() {
    return this._cookies_color;
  }
  get_cookie_size() {
    return this._cookie_size;
  }
  add_score() {
    this.scores += 10;
    document.getElementById("score").innerHTML =
      this.scores + 0.2 * this.scores;
    this.scores % 100 === 0 && this.make_new_cookies(25);
  }
  new_cookie(i, j) {
    if (i > 0 && j > 0 && this.map[i][j] !== 1 && this.map[i][j] !== 5) {
      //if its not a wall or cookie
      this.map[i][j] = 5;
      canvas.fillStyle = this._cookies_color;
      canvas.fillRect(
        j * this.box_size + this._cookie_offset / 2,
        i * this.box_size + this._cookie_offset / 2,
        this._cookie_size,
        this._cookie_size
      );
    }
  }
  clear_cookie(i, j, that){
    if (i > 0 && j > 0 && map[i][j] === 5) {
      map[i][j] = 0;
      canvas.clearRect(
        //clear cookie
        j * that.box_size + that._cookie_offset / 2,
        i * that.box_size + that._cookie_offset / 2,
        that._cookie_size,
        that._cookie_size
      );
      that.add_score();
    }
  }
  make_new_cookies(number){
    for (let i = 0; i < number; i++) {
      const i_rnd = Math.floor(Math.random() * this.map.length);
      const j_rnd = Math.floor(Math.random() * this.map[0].length);
      this.new_cookie(i_rnd, j_rnd);
    }
  };
}