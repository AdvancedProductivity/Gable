export const randomString = (e) => {
  e = e || 32;
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz12345678_';
  const a = t.length;
  let n = '';
  for (let i = 0; i < e; i++) {n += t.charAt(Math.floor(Math.random() * a));}
  return n;
};
