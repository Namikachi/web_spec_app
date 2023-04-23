export const compareIndex = (a, b) => {
  const indexA = a.index;
  const indexB = b.index;
  // fhp → first hyphen position
  // shp → second hyphen position
  const fhpA = indexA.indexOf('-');
  const fhpB = indexB.indexOf('-');
  const shpA = indexA.indexOf('-', fhpA + 1);
  const shpB = indexB.indexOf('-', fhpB + 1);
  const primaryA = fhpA > 0 ? indexA.slice(0, fhpA) : indexA;
  const primaryB = fhpB > 0 ? indexB.slice(0, fhpB) : indexB;

  if(primaryA !== primaryB) return Number(primaryA) - Number(primaryB); // different values of primary level

  const secondaryA = fhpA < 0 ? 0 : shpA > 0 ? indexA.slice(fhpA + 1, shpA) : indexA.slice(fhpA + 1);
  const secondaryB = fhpB < 0 ? 0 : shpB > 0 ? indexB.slice(fhpB + 1, shpB) : indexB.slice(fhpB + 1);

  if(secondaryA !== secondaryB) return Number(secondaryA) - Number(secondaryB); // different values of secondary level

  const tertiaryA = shpA < 0 ? 0 : indexA.slice(shpA + 1);
  const tertiaryB = shpB < 0 ? 0 : indexB.slice(shpB + 1);

  if(tertiaryA !== tertiaryB) return Number(tertiaryA) - Number(tertiaryB); // different values of tertiary level

  return 0;
}