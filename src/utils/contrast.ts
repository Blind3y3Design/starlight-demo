function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function luminance(r: number, g: number, b: number) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrastRatio(color1: string, color2: string) {
  const color1rgb = hexToRgb(color1);
  const color2rgb = hexToRgb(color2);
  const color1luminance = luminance(color1rgb!.r, color1rgb!.g, color1rgb!.b);
  const color2luminance = luminance(color2rgb!.r, color2rgb!.g, color2rgb!.b);

  const ratio =
    color1luminance > color2luminance
      ? (color2luminance + 0.05) / (color1luminance + 0.05)
      : (color1luminance + 0.05) / (color2luminance + 0.05);

  return ratio;
}

function accessibilityLevel(color1: string, color2: string) {
  const color1rgb = hexToRgb(color1);
  const color2rgb = hexToRgb(color2);
  const color1luminance = luminance(color1rgb!.r, color1rgb!.g, color1rgb!.b);
  const color2luminance = luminance(color2rgb!.r, color2rgb!.g, color2rgb!.b);

  const ratio =
    color1luminance > color2luminance
      ? (color2luminance + 0.05) / (color1luminance + 0.05)
      : (color1luminance + 0.05) / (color2luminance + 0.05);

  let accessibilityLevel;

  if (ratio > 1 / 3) {
    accessibilityLevel = "DNP";
  }
  if (ratio < 1 / 3) {
    accessibilityLevel = "AA18";
  }
  if (ratio < 1 / 4.5) {
    accessibilityLevel = "AA";
  }
  if (ratio < 1 / 7) {
    accessibilityLevel = "AAA";
  }

  return accessibilityLevel;
}

export { contrastRatio, accessibilityLevel };
