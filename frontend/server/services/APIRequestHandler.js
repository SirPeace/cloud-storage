import jwt from "jsonwebtoken"
import { MongoClient, Db } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

import databaseConfig from "../../config/database"
import UserResource from "../resources/UserResource"

/** @abstract */
class APIRequestHandler {
  /**
   * Current request
   *
   * @type {NextApiRequest}
   */
  request

  /**
   * Response
   *
   * @type {NextApiResponse}
   */
  response

  /**
   * @param {NextApiRequest} req
   * @param {NextApiResponse} res
   */
  constructor(req, res) {
    this.request = req
    this.response = res
  }

  /**
   * Handle api request
   *
   * @abstract
   */
  async handle() {
    throw new Error("Not implemented...")
  }

  /**
   * Set http-only, same-site cookie for /api
   *
   * @param {string} key
   * @param {string} value
   * @param {number} maxAge Seconds in which token should expire
   */
  setSecureCookie(key, value, maxAge = null) {
    const cookie = `${key}=${value}; HttpOnly; SameSite=Lax; Path=/api`

    if (typeof maxAge === "number") {
      cookie += `; Max-Age=${maxAge}`
    }

    this.response.setHeader("Set-Cookie", [cookie])
  }

  /**
   * Send fail response
   *
   * @param {string} message Response message
   * @param {number} code Response status code
   */
  sendFail(message = "Request failed.", code = 500) {
    return this.response.status(code).json({ message })
  }

  /**
   * Connect to the database with configured connection.
   *
   * @param {string} name Database name
   * @returns {Promise<Db>} Database connection
   */
  async connectToDatabase(name) {
    const { username, password, host, port } = databaseConfig

    const client = new MongoClient(
      `mongodb://${username}:${password}@${host}:${port}`
    )

    return (await client.connect()).db(name)
  }
}

export default APIRequestHandler
