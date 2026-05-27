import bcrypt from "bcrypt";

const hash = await bcrypt.hash("password2026", 10);

console.log(hash);