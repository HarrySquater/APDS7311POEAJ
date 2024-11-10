const crypto = require('crypto')
require('dotenv').config()

// Define the encryption algorithm and key
const algorithm = 'aes-256-cbc'
const encryptionKey = process.env.ENCRYPTION_KEY.padEnd(32, '0').slice(0, 32)
const ivLength = 16 // AES block size

function encrypt(text) {
  const iv = crypto.randomBytes(ivLength)
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(encryptionKey),
    iv
  )
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

function decrypt(text) {
  try {
    const [iv, encryptedText] = text
      .split(':')
      .map((part) => Buffer.from(part, 'hex'))
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(encryptionKey),
      iv
    )
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  } catch (error) {
    console.error('Decryption failed:', error)
    throw new Error('Decryption error')
  }
}
module.exports = { encrypt, decrypt }
