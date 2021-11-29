import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs"

import UserResource from "../../../server/resources/UserResource"
import APIRequestHandler from "../../../server/services/APIRequestHandler"

class RegisterHandler extends APIRequestHandler {
  async handle() {
    const { email, password } = this.request.body

    if (!email || !password) {
      return this.sendFail("Missing credentials", 400)
    }

    const db = await this.connectToDatabase("auth")

    if (await db.collection("users").findOne({ email })) {
      return this.sendFail("This identifier is taken", 400)
    }

    const user = {
      email,
      password: bcrypt.hashSync(password, 10),
    }
    await db.collection("users").insertOne(user)

    const privateKey = fs.readFileSync("../../../server/keys/private.key")

    const token = jwt.sign(UserResource.from(user), privateKey, {
      algorithm: "RS256",
      expiresIn: 3600,
    })

    this.setSecureCookie("token", token)

    return this.response.json({ token })
  }
}

export default async function handler(req, res) {
  return await new RegisterHandler(req, res).handle()
}
