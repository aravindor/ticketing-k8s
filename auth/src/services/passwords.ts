import bcrypt from "bcryptjs";
export class Password {
  static async toHash(password: string): Promise<string> {
    // console.log("Starting to hash...");
    const hashedPw = await bcrypt.hash(password, 12);
    // console.log("Finished hashing:", hashedPw);
    return hashedPw;
  }

  static async comparePass(
    storedPass: string,
    givenPass: string
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(givenPass, storedPass);
    return isMatch;
  }
}
