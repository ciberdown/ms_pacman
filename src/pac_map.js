class Map {
  constructor(wall_color) {
    this._wall_color = wall_color;
    this._canvas = document.getElementById("canvas").getContext("2d");
    this._lines_thickness = 1.7;
    this._box_size = 20;
    this._map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], //mid
      [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }
  get_box_size(){
    return this._box_size;
  }
  get_map() {
    return this._map;
  }
  get_canvas(){
    return this._canvas;
  }
  get_lines_thickness(){
    return this._lines_thickness;
  }
  make_map() {
    const inner_box_size = this._box_size / this._lines_thickness;
    const offset_size = this._box_size - inner_box_size;
    const createWalls = () => {
      for (let i = 0; i < this._map.length; i++) {
        for (let j = 0; j < this._map[0].length; j++) {
          if (this._map[i][j] === 1) {
            //its a wall
            displayWall(
              j * this._box_size,
              i * this._box_size,
              this._box_size,
              this._box_size,
              this._wall_color
            );
            displayWall(
              j * this._box_size + offset_size / 2,
              i * this._box_size + offset_size / 2,
              inner_box_size,
              inner_box_size,
              "black"
            );
            if (j > 0 && this._map[i][j - 1] === 1) {
              displayWall(
                j * this._box_size - offset_size,
                i * this._box_size + offset_size / 2,
                inner_box_size + offset_size * 1.3,
                inner_box_size,
                "black"
              );
            }
            if (i > 0 && this._map[i - 1][j] === 1) {
              displayWall(
                j * this._box_size + offset_size / 2,
                i * this._box_size - offset_size,
                inner_box_size,
                inner_box_size + offset_size * 1.3,
                "black"
              );
            }
          }
        }
      }
    };
    const displayWall=(x, y, width, height, color)=>{
      this._canvas.fillStyle = color;
      this._canvas.fillRect(x, y, width, height);
    };
    createWalls();
  }

}