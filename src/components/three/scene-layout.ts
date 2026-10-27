export function cameraDistance(width: number, height: number, aspect: number, fov = 34) {
  const halfAngle = (fov * Math.PI) / 360;
  return (Math.max(height, width / Math.max(aspect, 0.1)) * 1.12) / (2 * Math.tan(halfAngle));
}

export function heroProgress(top: number, height: number) {
  return Math.max(0, Math.min(1, -top / Math.max(height * 0.9, 1)));
}

export function introRocketTransform(
  target: { left: number; top: number; width: number; height: number },
  viewportWidth: number,
  viewportHeight: number,
) {
  const landscape = viewportHeight <= 540 && viewportWidth > viewportHeight;
  const scale = Math.min(
    Math.min(viewportWidth * 0.84, 420) / Math.max(target.width, 1),
    Math.min(viewportHeight * (landscape ? 0.62 : 0.36), 340) / Math.max(target.height, 1),
  );
  const x = viewportWidth * (landscape ? 0.35 : 0.5) - (target.left + target.width / 2);
  const y = viewportHeight * (landscape ? 0.48 : 0.3) - (target.top + target.height / 2);
  return `translate3d(${x}px, ${y}px, 0) rotate(-22deg) scale(${scale})`;
}
