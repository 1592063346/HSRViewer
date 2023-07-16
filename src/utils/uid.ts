export const checkUid = (uid: any) => {
  if (typeof uid === "string") {
    var reg = /^\d{9}/;
    return reg.test(uid);
  } else {
    return false;
  }
};