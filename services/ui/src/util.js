export function joinClassName(names) {
  let name = '';
  for (let i=0; i<names.length; i++) {
    let inpName = names[i];
    if (inpName) {
      if (name) {
        name = name.concat(` ${inpName}`);
      } else {
        name = inpName;
      }
    }
  }
  return name;
}
