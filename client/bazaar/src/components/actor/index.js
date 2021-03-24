import Sprite from '../sprite/index'

function Actor({ player, sprite, data, step = 0, dir = 0, position = { x: 0, y: 0 }, updatePlayer }) {
  const { h, w } = data
  return (
    <div className="Actor">
      <Sprite player={player} image={sprite} position={position} updatePlayer={updatePlayer} data={{
        x: step * w,
        y: dir * h,
        h,
        w
      }} />
    </div>
  );
}

export default Actor;