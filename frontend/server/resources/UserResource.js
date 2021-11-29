import { Document } from "mongodb"

/**
 * @typedef UserResourceType
 * @property {string} id User id
 * @property {string} email User email address
 */

export default class UserResource {
  /**
   * Get the user resource from the user Document
   *
   * @public
   * @param {Document} userDocument
   * @returns {UserResourceType}
   */
  static from(userDocument) {
    return {
      id: userDocument._id,
      email: userDocument.email,
    }
  }
}
