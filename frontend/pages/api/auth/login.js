import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fs from "fs"

import UserResource from "../../../server/resources/UserResource"
import APIRequestHandler from "../../../server/services/APIRequestHandler"

class LoginHandler extends APIRequestHandler {
  async handle() {
    const { email, password } = this.request.body

    if (!email || !password) {
      return this.sendFail("Missing credentials", 400)
    }

    const db = await this.connectToDatabase("auth")
    const user = await db.collection("users").findOne({ email })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return this.sendFail("Invalid credentials", 401)
    }

    const privateKey = fs.readFileSync(
      process.env.PWD + "/server/keys/private.key"
    )

    const token = jwt.sign(UserResource.from(user), privateKey, {
      algorithm: "RS256",
      expiresIn: 3600,
    })

    this.setSecureCookie("token", token)

    return this.response.json({ token })
  }
}

export default async function handler(req, res) {
  return await new LoginHandler(req, res).handle()
}
