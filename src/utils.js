export const pipe = (...args) => args.reduce((prev, curr) => curr(prev))

export const getRelativeAngle = (angle, initialAngle) => (360 - angle + initialAngle) % 360

export const toDeg = angle => angle * (180 / Math.PI)

export const toRad = angle => angle * (Math.PI / 180)
