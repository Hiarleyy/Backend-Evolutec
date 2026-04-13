const fs = require("fs")
const path = require("path")
const { buildSeedStore } = require("./seed-data")

const DATA_DIR = path.join(__dirname, "data")
const STORE_FILE = path.join(DATA_DIR, "store.json")

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function deepMerge(baseValue, overrideValue) {
  if (Array.isArray(baseValue)) {
    return Array.isArray(overrideValue) ? overrideValue : baseValue
  }

  if (!isPlainObject(baseValue)) {
    return overrideValue === undefined ? baseValue : overrideValue
  }

  const merged = { ...baseValue }
  const override = isPlainObject(overrideValue) ? overrideValue : {}

  for (const key of Object.keys(baseValue)) {
    merged[key] = deepMerge(baseValue[key], override[key])
  }

  for (const key of Object.keys(override)) {
    if (!(key in merged)) {
      merged[key] = override[key]
    }
  }

  return merged
}

function ensureStoreFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  if (!fs.existsSync(STORE_FILE)) {
    fs.writeFileSync(STORE_FILE, JSON.stringify(buildSeedStore(), null, 2), "utf8")
  }
}

function readStore() {
  ensureStoreFile()

  try {
    const content = fs.readFileSync(STORE_FILE, "utf8")
    const parsedStore = JSON.parse(content)
    return deepMerge(buildSeedStore(), parsedStore)
  } catch (_error) {
    const seedStore = buildSeedStore()
    fs.writeFileSync(STORE_FILE, JSON.stringify(seedStore, null, 2), "utf8")
    return seedStore
  }
}

function writeStore(store) {
  ensureStoreFile()
  fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf8")
  return store
}

function getStoreValue(pathParts, fallbackValue) {
  const store = readStore()
  let currentValue = store

  for (const pathPart of pathParts) {
    if (currentValue == null || !(pathPart in currentValue)) {
      return fallbackValue
    }

    currentValue = currentValue[pathPart]
  }

  return currentValue === undefined ? fallbackValue : currentValue
}

function setStoreValue(pathParts, value) {
  const store = readStore()
  let currentValue = store

  for (let index = 0; index < pathParts.length - 1; index += 1) {
    const pathPart = pathParts[index]

    if (!isPlainObject(currentValue[pathPart])) {
      currentValue[pathPart] = {}
    }

    currentValue = currentValue[pathPart]
  }

  currentValue[pathParts[pathParts.length - 1]] = value

  return writeStore(store)
}

function appendToCollection(pathParts, item) {
  const store = readStore()
  let currentValue = store

  for (let index = 0; index < pathParts.length - 1; index += 1) {
    const pathPart = pathParts[index]

    if (!isPlainObject(currentValue[pathPart])) {
      currentValue[pathPart] = {}
    }

    currentValue = currentValue[pathPart]
  }

  const collectionKey = pathParts[pathParts.length - 1]
  const collection = Array.isArray(currentValue[collectionKey]) ? currentValue[collectionKey] : []
  const nextId = collection.length ? Math.max(...collection.map((entry) => Number(entry.id) || 0)) + 1 : 1
  const record = { id: nextId, ...item }

  collection.push(record)
  currentValue[collectionKey] = collection
  writeStore(store)

  return record
}

module.exports = {
  appendToCollection,
  getStoreValue,
  readStore,
  setStoreValue,
  writeStore
}